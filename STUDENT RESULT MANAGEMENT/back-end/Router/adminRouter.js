import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { authMiddileware } from "../MiddileWare/auth.js";

dotenv.config();

const secretKey=process.env.JWTKEY;

const adminRouter = Router();

//schema 

const userSchema = new mongoose.Schema({
   FirstName: String,
   LastName: String,
   Username: {
      type: String,
      unique: true
   },
   Email: String,
   Password: String,
   Role: String
})

const User = mongoose.model("userDetails", userSchema)


const classSchema = new mongoose.Schema({

   className: {
      required:true,
      type: String,
      unique: true
   },
   classNumeric: {
      required:true,
      type:String
   },
   Date: {
      required:true,
      type:String
   }


})


const Class = mongoose.model("classDetails", classSchema)



const StudentSchema = new mongoose.Schema({

   FullName: {
      required:true,
      type:String
   },
   RollId: {
      required:true,
      type: String,
      unique: true
   },
   Gender:{
      required:true,
       type: String,
   } ,
   Class:{
      required:true,
      type: String,
   },
   DOB:{
     required:true,
      type: String,
   } 


})


const Student = mongoose.model("studentDetails", StudentSchema)

const SubjectSchema = new mongoose.Schema({

   SubjectName: {
      type: String,
      unique: true
   },
   SubjectCode: String,
   Date: String

})
const Subject = mongoose.model("Subjects", SubjectSchema)


const subjectCombinationSchema = new mongoose.Schema({
   class: {
      required:true,
      type:String
   },
   subject:{
      required:true,
      type:String
   }
});

const SubjectCombination = mongoose.model("SubjectCombinations", subjectCombinationSchema);

// const resultSchema = new mongoose.Schema({

//    Class: String,
//    StudentName: String,
//    Mark1: String,
//    Mark2: String,
//    Mark3: String
// });

// const Result = mongoose.model("resultDetails", resultSchema)

const resultSchema = new mongoose.Schema({
   RollId: { type: String, required: true,unique:true },
   Class: { type: String, required: true },
   FullName: { type: String, required: true },
   Marks: [
     {
       subject: { type: String, required: true },
       score: { type: Number, required: true, min: 0, max: 100 },
     },
   ],
 });
 
 const Result= mongoose.model('Result', resultSchema);

mongoose.connect("mongodb://mongodb:27017/Student-Result-Management")


//signup

adminRouter.post('/signup', async (req, res) => {

   const { FirstName, LastName, Username, Email, Password} = req.body
   try {
      const existingUser = await User.findOne({ Username: Username })

      if (existingUser) {

         res.status(400).json({ message: "Username Already exist" })
      } else {
         let Role = ''

         const result = await User.find();

         if(result.length >0){
               Role = 'User'
         }else{
            Role = 'Admin'
         }

         const newP = await bcrypt.hash(Password, 10)
         console.log(newP);

         const newUser = new User({

            FirstName: FirstName,
            LastName: LastName,
            Username: Username,
            Email: Email,
            Password: newP,
            Role: Role

         })

         await newUser.save()
         res.status(200).json({ message: "Register Successfull" })

      }
   } catch (error) {
      res.status(500).json(error)
   }
})

//login


adminRouter.post('/login', async (req, res) => {

   const { Email, Password } = req.body

   const result = await User.findOne({ Email: Email });

   try {

      if (!result) {

         res.status(400).json({ message: "Invalid Email" })
      } else {

         const isvalid = await bcrypt.compare(Password, result.Password)
         console.log(isvalid);

         if (isvalid) {

            const token = jwt.sign({ Username: result.Username, Role: result.Role }, secretKey, { expiresIn: '1d' })
            console.log(token);

            res.cookie("AuthToken", token,{
               httpOnly: true, 
               secure: true, 
               sameSite: 'None',
               maxAge: 3600000  
            });

            res.status(200).json({ message: "Login Successfull" })

         } else {
            res.status(401).json({ message: "Password is Incorrect" })
         }

      }
   } catch (error) {
      res.status(500).json(error)
      console.log(error);

   }

})


adminRouter.get("/getAllUsers",authMiddileware, async(req,res)=>{
   const result = await User.find();
   try {
      if(result){
         res.status(200).json(result)
      }else{
         res.status(400).json({message:"No users"})
   
      } 
   } catch (error) {
      res.status(500).json({message:error.message})
   }

})




//create class



adminRouter.post("/createClass", authMiddileware, async (req, res) => {

   const body = req.body
   const { className, classNumeric, Date } = body
   console.log(className, classNumeric, Date);

   const role = req.UserRole
   console.log(role);

   const existingClass = await Class.findOne({ className: className})
   const existingClass2 = await Class.findOne({ classNumeric: classNumeric})


   try {

      if (existingClass || existingClass2) {
         return res.status(403).json({ message: "Class Already Exist" })
      }
      if (role !== "Admin") {
         res.status(401).json({ message: "Unauthorized user" })
      } else {
         const newClass = new Class({
            className: className,
            classNumeric: classNumeric,
            Date: Date
         })

         await newClass.save();

         res.status(201).json({ message: "Class Added", newClass })
      }
   } catch (error) {
      res.status(500).json(error)
   }


})

// get all  classes
adminRouter.get("/getClasses", authMiddileware, async (req, res) => {
   try {
      const classes = await Class.find();
      if (classes) {
         res.status(200).json(classes);

      } else {
         res.status(404).json({ message: "There is no classes exist" });

      }
   } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching subjects", error });
   }
});


//get class

adminRouter.get("/getClass/:id", authMiddileware, async (req, res) => {

   const _id=req.params.id

   const getClass = await Class.findOne({_id:_id })
   try {

      if (!getClass) {
         return res.status(400).json("Classname is not found")
      }
      if (req.UserRole == "Admin") {
         res.status(200).json(getClass)
      } else {
         res.status(401).json("User is not an admin")
      }
   } catch (error) {
      res.status(500).json(error)
   }

})

adminRouter.put('/updateClass/:id',authMiddileware,async(req,res)=>{
   const { id } = req.params;
const { className, classNumeric, Date } = req.body

    const result = await Class.findById(id)
     
    try {
    
      if (!result) {
         return res.status(404).json({ message: 'Subject not found' });
       }
      if(req.UserRole =="Admin"){
         result.className = className || result.className
         result.classNumeric = classNumeric ||   result.classNumeric
         result.Date = Date || result.Date 
  
        await result.save();
        res.status(201).json({message:"updated the Class"})
  
     }else{
        res.status(403).json({message:"Unauthorized User"})
     }
    } catch (error) {
      res.status(500).json({message:error.message})
    }

})







//delete classname


adminRouter.delete('/deleteClass/:classname', authMiddileware, async (req, res) => {
   const className = req.params.classname
   try {
      const result = await Class.findOneAndDelete({ className: className })
      if (result) {
         res.status(200).json("Class Deleted")
      }
      else {
         res.status(400).json("class is not found")
      }
   }
   catch (error) {
      res.status(500).json({ message: "An error occurred. Please check the user details.", error });
   }
})

// Addstudent


adminRouter.post("/addStudent", authMiddileware, async (req, res) => {

   const { FullName, RollId, Gender,Class, DOB } = req.body
   
   const getClass = await SubjectCombination.findOne({class:Class})
   const existingStudentId = await Student.findOne({ RollId: RollId })

   try {
       
      if(!getClass){
         return res.status(404).json({message:"class name is not added"})
      }
      if (existingStudentId) {
         return res.status(409).json({message:"Student ID Already Exist"})
      }
      if (req.UserRole == "Admin") {


         const newStudent = new Student({
            FullName: FullName,
            RollId: RollId,
            Gender: Gender,
            Class:Class,
            DOB: DOB
         })

         newStudent.save();

         res.status(200).json({ message: "Student Added", newStudent })
      } else {
         res.status(401).json("User not an Admin")
      }
   } catch (error) {
      res.status(500).json(error)
   }


})

// //getStudent


adminRouter.get("/getStudent/:id", authMiddileware, async (req, res) => {

   const RollId = req.params.id

   const getStudent = await Student.findOne({ RollId: RollId })
   try {

      if (!getStudent) {
         return res.status(404).json("not found student id")
      }
      if (req.UserRole == "Admin") {
         res.status(200).json(getStudent)
      } else {
         res.status(401).json({message:"User is not an admin"})
      }
   } catch (error) {
      res.status(500).json(error)
   }

})

// Get all students
adminRouter.get("/getStudents", authMiddileware, async (req, res) => {
   try {
      const students = await Student.find();
      res.status(200).json(students);
   } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching subjects", error });
   }
});

//update students

adminRouter.patch('/updateStudent', authMiddileware, async (req, res) => {

   const { FullName, RollId, Gender, Class, DOB } = req.body
   try {
      if (req.UserRole == "Admin") {

         const result = await Student.findOneAndUpdate(
            { RollId: RollId }, {

            $set: {
               FullName: FullName,
               RollId: RollId,
               Gender: Gender,
               Class:Class,
               DOB: DOB

            }

         }, { new: true });

         if (result.matchedCount == 0) {
            return res.status(404).json({ message: "Class not found" });
         }
         res.status(200).json({ message: "Student Deatils Updated", UpdateStudent: result })
      } else {
         res.status(401).json({ message: "Unauthorized Access" });
      }

   } catch (error) {
      res.status(500).json({ message: "An error occurred. Please check the Student details." });
   }

})



//delete Student


adminRouter.delete('/deleteStudent/:id', authMiddileware, async (req, res) => {
   const RollId = req.params.id
   try {
      const result = await Student.findOneAndDelete({ RollId: RollId })
      if (result) {
         res.status(200).json("Student Id Deleted")
      }
      else {
         res.status(400).json("Student ID is not found")
      }
   }
   catch (error) {
      res.status(500).json({ message: "An error occurred. Please check the user details.", error });
   }
})

//create subject
adminRouter.post("/createSubject", authMiddileware, async (req, res) => {

   const { SubjectName, SubjectCode, Date } = req.body

   const existingSubject = await Subject.findOne({ SubjectName: SubjectName })
   const existingSubject2 = await Subject.findOne({ SubjectCode: SubjectCode })


   try {

      if (existingSubject || existingSubject2) {
         return res.status(400).json({message:"Subject Already Exist"})
      }
      if (req.UserRole == "Admin") {


         const newSubject = new Subject({
            SubjectName: SubjectName,
            SubjectCode: SubjectCode,
            Date: Date
         })

         newSubject.save();

         res.status(200).json({ message: "Subject Created", newSubject })
      } else {
         res.status(401).json({message:"User not an Admin"})
      }
   } catch (error) {
      res.status(500).json(error)
   }


})

//getSubject

adminRouter.get("/getSubjects/:id", authMiddileware, async (req, res) => {

   const id = req.params.id

   const getSubject = await Subject.findOne({ _id:id })
   try {

      if (!getSubject) {
         return res.status(400).json({message:"no Subjects found"})
      }
      if (req.UserRole == "Admin") {
         res.status(200).json(getSubject)
      } else {
         res.status(401).json({message:"Unauthorized User"})
      }
   } catch (error) {
      res.status(500).json(error)
   }

})

// Get all subjects
adminRouter.get("/getSubjects", authMiddileware, async (req, res) => {
   try {
      const subjects = await Subject.find();
      res.status(200).json(subjects);
   } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching subjects", error });
   }
});


//update subjects


adminRouter.put('/updateSubject/:id',authMiddileware,async(req,res)=>{
   const { id } = req.params;
   const {SubjectName,SubjectCode,Date} = req.body

    const result = await Subject.findById(id)
     
    try {
    
      if (!result) {
         return res.status(404).json({ message: 'Subject not found' });
       }
      if(req.UserRole =="Admin"){
         result.SubjectName = SubjectName || result.SubjectName
         result.SubjectCode = SubjectCode ||   result.SubjectCode
         result.Date = Date ||   result.Date
  
        await result.save();
        res.status(201).json({message:"updated the subjects"})
  
     }else{
        res.status(403).json({message:"Unauthorized User"})
     }
    } catch (error) {
      res.status(500).json({message:error.message})
    }

})


//delete subject001
adminRouter.delete('/deleteSubject/:id', authMiddileware, async (req, res) => {
   const id = req.params.id;
   try {
      const response = await Subject.findOneAndDelete({ _id:id });
      if (response) {
         res.status(200).json("Subject Deleted");
      } else {
         res.status(404).json("Subject is not found");
      }
   } catch (error) {
      res.status(500).json({ message: "An error occurred. Please check the user details.", error });
   }
});



adminRouter.post("/addSubjectCombination", authMiddileware, async (req, res) => {
   const { className, subjectName } = req.body;

   try {
      const classResult = await Class.findOne({ className });
      if (!classResult) {
         return res.status(404).json({ message: "Class not found" });
      }
      const subjectResult = await Subject.findOne({ SubjectName: subjectName });
      if (!subjectResult) {
         return res.status(404).json({ message: "Subject not found" });
      }

      const existingCombination = await SubjectCombination.findOne({
         class: className,
         subject: subjectName,
      });
      if (existingCombination) {
         return res.status(400).json({ message: "Combination already exists" });
      }

      const newCombination = new SubjectCombination({
         class: className,
         subject: subjectName,
      });

      await newCombination.save();
      res.status(200).json({ message: "Subject combination added", newCombination });
   } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
   }
});

adminRouter.get("/getOneSubComb/:id",  authMiddileware,  async(req,res)=>{
  const {id} = req.params

  const result = await SubjectCombination.findById(id)
  try {
   if(result){
      res.status(200).json(result)
     }else{
      res.status(404).json({messgae:"Not Found"})
     }
  } catch (error) {
   res.status(500).json({ message: "An error occurred", error });

  }

})


adminRouter.get('/getSubjectClass/:id',async(req,res)=>{
   const classes= req.params.id
   const getClass = await SubjectCombination.find({class:classes})
   try {
      if(getClass){
         res.status(200).json(getClass)
       }else{
         res.status(404).json({message:"Not found classname"})
   
       }
   } catch (error) {
      res.status(500).json({ message: "An error occurred", error });

   }

})

adminRouter.get('/getSubjectCombinations',authMiddileware, async (req, res) => {
   try {
     const subjectCombinations = await SubjectCombination.find();
 
     return res.status(200).json(subjectCombinations);
   } catch (error) {
     console.error("Error fetching subject combinations:", error);
     return res.status(500).json({ message: "Internal Server Error" });
   }
 });

adminRouter.patch("/UpdateAddSubjectCombination/:id", authMiddileware, async (req, res) => {
   const id = req.params.id;
   const { className, subjectName } = req.body;

   try {
      const result = await SubjectCombination.findOneAndUpdate(
         {_id:id },
         { $set: { class: className, subject: subjectName } },
         { new: true }
      );

      if (result) {
         res.status(200).json({ message: "SubjectCombination Updated" ,result});
      } else {
         res.status(404).json({ message: "Subjectname or classname is not found" });
      }
   } catch (error) {
      res.status(500).json(error);
      console.log(error);
   }
});

 //delete sunjectcomb
adminRouter.delete('/deleteSubjectCombination/:id', async (req, res) => {
   try {
     const { id } = req.params;
 
     const deletedCombination = await SubjectCombination.findByIdAndDelete(id);
 
     if (!deletedCombination) {
       return res.status(404).json({ message: 'Subject combination not found' });
     }
 
     return res.status(200).json({ message: 'Subject combination deleted successfully' });
   } catch (error) {
     console.error("Error deleting subject combination:", error);
     return res.status(500).json({ message: 'Internal Server Error' });
   }
 });

adminRouter.get("/getclassId/:classname", authMiddileware, async (req, res) => {

   const classId = req.params.classname;

   const result = await SubjectCombination.findOne({ class: classId })
   try {
      if (result) {
         res.status(200).json(result);
      } else {
         res.status(404).json(result);
      }
   } catch (error) {
      res.status(500).json(error)
   }

})

//result

adminRouter.post("/resultStudent", authMiddileware, async (req, res) => {

   const { Class, StudentName, Mark1, Mark2, Mark3 } = req.body

   const resultStudent = await Result.findOne({ StudentName: StudentName })

   try {

      if (resultStudent) {
         return res.status(400).json("Result Alreadt Declared")
      }
      if (req.UserRole == "admin") {


         const newStudentResult = new Result({
            Class: Class,
            StudentName: StudentName,
            Mark1: Mark1,
            Mark2: Mark2,
            Mark3: Mark3
         })

         newStudentResult.save();

         res.status(200).json({ messge: "Student Added", newStudentResult })
      } else {
         res.status(401).json("User not an Admin")
      }
   } catch (error) {
      res.status(500).json(error)
   }


})


//getSubject

adminRouter.get("/getResult/:stuname", authMiddileware, async (req, res) => {

   const StudentName = req.params.stuname

   const getStudentResult = await Result.findOne({ StudentName: StudentName })
   try {


      if (getStudentResult) {
         res.status(200).json(getStudentResult)
      } else {
         res.status(401).json("Not found Student Result")
      }
   } catch (error) {
      res.status(500).json(error)
   }

})

//getAllresults

adminRouter.get("/getAllresult",authMiddileware, async(req,res)=>{
   const result = await Result.find()
   
   try {
      if(result){
         res.status(200).json(result)
      }
   } catch (error) {
      res.status(500).json(error)
   }
})





//result login

adminRouter.post("/resultLogin", async (req, res) => {

   const { RollId, className } = req.body
   const result = await Student.findOne({ RollId: RollId })

   const result2 = await SubjectCombination.findOne({ class: className })
   try {
      if (result && result2) {
         res.status(200).json({ message: "Result Login Successful", result, result2 });
      } else {
         res.status(404).json({ message: "Roll ID or Class not found" });
      }
   } catch (error) {
      res.status(500).json(error)
   }

})


//logout 
adminRouter.post('/logout', (req, res) => {
   try {
      res.clearCookie('AuthToken', { httpOnly: true });
      res.status(200).json({ message: 'Logout successful' });
   } catch (error) {
      res.status(500).json({ message: 'An error occurred during logout', error });
   }
});

adminRouter.post('/addResult', async (req, res) => {
   try {
     const { RollId, Class, FullName, Marks } = req.body;
 
     const result = await Result.findOne({RollId,RollId})

     if(result){
      res.status(409).json({message:"Result Already Declared"})
     }else{
      const newResult = new Result({
         RollId,
         Class,
         FullName,
         Marks,
       });
   
       await newResult.save();
       res.status(201).json({ message: 'Result declared successfully' });
     }  
   } catch (error) {
     res.status(500).json({ error: 'Failed to declare result' });
   }
 });

 //getResult

 adminRouter.get("/getResultStudent/:id",async(req,res)=>{

     const RollId = req.params.id  
     
     const result = await Result.findOne({RollId:RollId})
     try{
      if(result){
         res.status(200).json(result)
      }else{
         res.status(404).json({message:"No results"})
      }
     }catch(error){
      res.status
     }
 

 })
 




adminRouter.get('/viewUser',authMiddileware,(req,res)=>{
   try{
   const user= req.UserRole;
   res.json({user});}
   catch{
       res.status(404).json({message:'user not authorized'});
   }
})

adminRouter.get('/viewUsername',authMiddileware,(req,res)=>{
   try{
   const user=req.Username;
   res.status(200).json(user)
   } catch{
       res.status(404).json({message:'user not authorized'});
   }
})
export { adminRouter }

