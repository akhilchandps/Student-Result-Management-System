import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import img from "../assets/image/ass.jpg";
import jsPDF from "jspdf"; // Library for PDF generation
import "jspdf-autotable";
import img1 from "../assets/image/result.jpg"

const Result = () => {
    const [name, setName] = useState("");
    const [rollid, setRollId] = useState("");
    const [classes, setClass] = useState("");
    const [marks, setMark] = useState([]);

    const { id } = useParams();

    const getResult = async () => {
        const res = await fetch(`/api/getResultStudent/${id}`, {
            method: "GET",
        });
        
        const data = await res.json();
        setName(data.FullName);
        setRollId(data.RollId);
        setClass(data.Class);
        setMark(data.Marks);
    };

    useEffect(() => {
        getResult();
    }, [id]);

    if (!marks) {
        return (
            <div
                className="main flex justify-center"
                style={{ height: "120vh", backgroundImage: `url(${img1})`, backgroundSize: "cover" }}
            >
                <div className="mt-24 bg-[rgba(0,0,0,0.8)] h-52 px-5 py-5 backdrop-blur-sm md:px-20 md:py-8">
                    <h2 className="text-white text-3xl text-center font-bold">Result Not Declared</h2>
                </div>
            </div>
        );
    }




    // Calculate total, percentage, and status
    const totalMarks = marks.reduce((acc, item) => acc + item.score, 0);
    const maxMarks = marks.length * 100; // Assuming each subject is out of 100
    const percentage = ((totalMarks / maxMarks) * 100).toFixed(2);
    const status = percentage >= 50 ? "Pass" : "Fail";

    // Download PDF function
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Student Result", 20, 10);
        doc.text(`Name: ${name}`, 20, 20);
        doc.text(`Roll ID: ${rollid}`, 20, 30);
        doc.text(`Class: ${classes}`, 20, 40);

        // Set text color for status
        if (status === "Pass") {
            doc.setTextColor(0, 128, 0); // Green for pass
        } else {
            doc.setTextColor(255, 0, 0); // Red for fail
        }
        doc.text(`Status: ${status}`, 20, 50);
        doc.setTextColor(0, 0, 0); // Reset color to black for other text

        // Add table
        const tableColumn = ["Sl No", "Subjects", "Marks"];
        const tableRows = marks.map((item, index) => [index + 1, item.subject, item.score]);

        // Add total, percentage, and status row
        tableRows.push(["", "Total", totalMarks]);
        tableRows.push(["", "Percentage", `${percentage}%`]);
        tableRows.push(["", "Status", status]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 60,
        });

        doc.save(`${name}_result.pdf`);
    };

    return (
        <>
            <div
                className="main flex justify-center"
                style={{ height: "120vh", backgroundImage: `url(${img})`, backgroundSize: "cover" }}
            >
                <div className="mt-5 bg-[rgba(0,0,0,0.8)] px-5 py-5 backdrop-blur-sm md:px-20 md:py-8">
                    <ul className="gap-5 list-style-none md:text-xl text-md text-white">
                        <li className="my-2 flex gap-5">
                            <b>Student Name:</b> <p>{name}</p>
                        </li>
                        <li className="my-2 flex gap-5">
                            <b>Student Roll ID:</b> {rollid}
                        </li>
                        <li className="my-2 flex gap-5">
                            <b>Class:</b> {classes}
                        </li>
                    </ul>

                    <div className="mt-12">
                        <table className="bg-[rgba(255,255,255,0.8)] w-[350px] md:w-[650px] border">
                            <thead>
                                <tr>
                                    <th className="p-5 border">Sl No</th>
                                    <th className="p-5 border">Subjects</th>
                                    <th className="p-5 border">Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marks.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center p-3 border">{index + 1}</td>
                                        <td className="text-center p-3 border">{item.subject}</td>
                                        <td className="text-center p-3 border">{item.score}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="text-center p-3 border">Total</td>
                                    <td></td>
                                    <td className="text-center p-3 border">
                                        <b>{totalMarks}</b> out of <b>{maxMarks}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center p-3 border">Percentage</td>
                                    <td></td>
                                    <td className="text-center p-3 border">
                                        <b>{percentage}%</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center p-3 border">Status</td>
                                    <td></td>
                                    <td
                                        className="text-center p-3 border"
                                        style={{ color: status === "Pass" ? "green" : "red" }}
                                    >
                                        <b>{status}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center p-3 border">Download Result</td>
                                    <td></td>
                                    <td className="text-center p-3 border">
                                        <button onClick={downloadPDF} className="bg-blue-500 text-white px-3 py-1 rounded">
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Result;
