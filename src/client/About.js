import React, { useState } from 'react';
import './About.css'; // Import CSS file

export default function About() {
  const [expandedRow, setExpandedRow] = useState(null);

  const data = [
    { id: 1, question: 'What is Samaa?', answer: 'Samaa is a platform for music streaming.' },
    { id: 2, question: 'What is tech stack used for developing Samaa?', answer: 'Samaa is MERN STACK PROJECT developed under our SDP 2' },
    { id: 3, question: 'What features are there for Samaa Users?', answer: 'Users can search for new songs, play song, create, update and deleted playlist. They can fetch their spotify playlist. They have facility to listen trending songs fetched from saavn. ' },
    { id: 4, question: 'Thank you for exploring Samaa!', answer: 'We are constantly striving to enhance your experience and bring you the best in music streaming. In the near future, we plan to implement exciting features and this project is will be updated regularly. Stay tuned for more updates!'},
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
