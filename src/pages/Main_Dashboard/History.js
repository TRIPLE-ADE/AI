import React from 'react'
import "./history.scss";
import { useState } from 'react';

const History = () => {
    const [faces, setFaces] = useState([
        { id: 1, name: "John Smith", date: "2022-03-15",time: "18:00", role:'Lecturer' },
        { id: 2, name: "Jane Doe", date: "2022-03-14",time: "15:00", role:'Lecturer' },
        { id: 3, name: "Bob Johnson", date: "2022-03-13", time: "14:00", role:'Lecturer' },
      ]);
  return (
    <div className='table-wrapper'>
        <p className='pb-3 text-lg font-bold'>History of entrance access</p>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Date</th>
                <th>Time</th>
            </tr>
            </thead>
            <tbody>
                {faces.map((face) => (
                    <tr key={face.id}>
                    {/* <tr key={face.id} onClick={() => handleFaceClick(face.id)}> */}
                        <td>{face.id}</td>
                        <td>{face.name}</td>
                        <td>{face.role}</td>
                        <td>{face.date}</td>
                        <td>{face.time}WAT</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default History