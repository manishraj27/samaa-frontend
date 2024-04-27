import React, { useState } from 'react';
import './About.css'; // Import CSS file

export default function About() {
  const [expandedRow, setExpandedRow] = useState(null);

  const data = [
    { id: 1, question: 'What is Samaa?', answer: 'Samaa is a platform for music streaming.' },
    { id: 2, question: 'What is tech stack?', answer: 'Samaa is MERN STACK PROJECT under our SDP 2' },
    { id: 3, question: 'Team Members', answer: 'K Manish, Manish Raj, Mukund Maheswari' }
  ];

  const handleRowClick = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  return (
    <div className='screen-container'>
        <h1 align = "center ">FAQs about Samaa</h1>
      <div className='about-container'>
        <table className='about-table'>
          <tbody>
            {data.map(row => (
              <React.Fragment key={row.id}>
                <tr onClick={() => handleRowClick(row.id)} className={expandedRow === row.id ? 'expanded' : ''}>
                  <td>{row.id}</td>
                  <td>{row.question}</td>
                </tr>
                {expandedRow === row.id && (
                  <tr>
                    <td colSpan="2">{row.answer}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
