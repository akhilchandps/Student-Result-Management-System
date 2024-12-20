
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import CreateClass from './Pages/CreateClass';
import ManageClass from './Pages/ManageClass';
import UpdateClass from './Pages/UpdateClass';
import ManageStudent from './Pages/ManageStudent';
import UpdateStudent from './Pages/UpdateStudent';
import AddStudent from './Pages/AddStudent';
import CreateSubject from './Pages/CreateSubject';
import UpdateSubject from './Pages/UpdateSubject';
import ManageSubject from './Pages/ManageSubject';
import MainDashboard from './Pages/MainDashboard';
import AddSubjectCombination from './Pages/AddSubjectCombination';
import ManageSubCombo from './Pages/ManageSubCombo';
import AddResult from './Pages/AddResult';
import ManageResult from './Pages/ManageResult';
import UserDashBoard from './Pages/UserDashBoard';
import Result from './Pages/Result';
import UpdateSubComb from './Pages/UpdateSubComb';
import AuthLayout from './layout/AuthLayout';




function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Auth register />} />
          <Route path='/login' element={<Auth />} />



          <Route path='/userDashboard' element={<UserDashBoard />} />
          <Route path='/updateSubCombo/:id' element={<UpdateSubComb />} />


          <Route element={<AuthLayout />} >
            <Route path='/dashboard' element={<MainDashboard />} />
            <Route path='/CreateClass' element={<CreateClass />} />
            <Route path='/ManageClass' element={<ManageClass />} />
            <Route path='/UpdateClass/:id' element={<UpdateClass />} />
            <Route path='/AddStudent' element={<AddStudent />} />
            <Route path='/ManageStudent' element={<ManageStudent />} />
            <Route path='/UpdateStudent/:id' element={<UpdateStudent />} />
            <Route path='/CreateSubject' element={<CreateSubject />} />
            <Route path='/ManageSubject' element={<ManageSubject />} />
            <Route path='/UpdateSubject/:id' element={<UpdateSubject />} />
            <Route path='/SubjectCombo' element={<AddSubjectCombination />} />
            <Route path='/ManageSubCombo' element={<ManageSubCombo />} />
            <Route path='/AddResult' element={<AddResult />} />
            <Route path='/ManageResult' element={<ManageResult />} />
            <Route path='/result/:id' element={<Result />} />

          </Route>










        </Routes>
      </Router>
    </>
  )
}

export default App
