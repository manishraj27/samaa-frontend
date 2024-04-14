import React, { useState } from 'react';
import './About.css'; // Import CSS file

export default function About() {
  const [expandedRow, setExpandedRow] = useState(null);

  const data = [
    { id: 1, question: 'What is Samaa?', answer: 'Samaa is a platform for XYZ.' },
    { id: 2, question: 'How to use Samaa?', answer: 'You can use Samaa by following these steps...' },
    { id: 3, question: 'Why choose Samaa?', answer: 'Samaa offers unique features such as...' }
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
