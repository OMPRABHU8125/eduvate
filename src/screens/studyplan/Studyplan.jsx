import React, { useState, useRef } from "react";
import './style.css';
import Generatebutton from "../../../components/Generatebutton";


const StudyPlan = () => {
  const [subject, setSubject] = useState("");
  const [plan, setPlan] = useState(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const generatePlan = async () => {
    if (!subject) {
      setFileError("Please provide both subject and PDF file");
      return;
    }
  
    setFileError(""); // Clear previous errors
  
    try {
      // Create a FormData object to send both file and subject
      const formData = new FormData();
      formData.append('file', file); // Append the PDF file
      formData.append('subject', subject); // Append the subject
  
      // Make the POST request with FormData
      const response = await fetch('http://127.0.0.1:5000/api/generate-study-plan', {
        method: 'POST',
        body: formData, // Send the FormData object directly as the body
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate study plan');
      }
  
      const data = await response.json();
      console.log(data)
      // Assuming the API sends `study_plan`, `pdf`, and `topics`
      setPlan(data); // Store the generated study plan
  
    } catch (error) {
      setFileError('Error generating study plan: ' + error.message);
    }
  };
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileError("");

    if (selectedFile) {
      // Check if it's a PDF
      if (selectedFile.type !== 'application/pdf') {
        setFileError("Please upload a PDF file");
        setFile(null);
        return;
      }

      // Check file size (1MB = 1048576 bytes)
      if (selectedFile.size > 1048576) {
        setFileError("PDF must be at least 1MB in size");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  return (
    <div className="study-plan section">
      <div className="content">
        <h2>Generate Study Plan</h2>

        <input
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="subject-input"
        />

        <div className="file-upload-section">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="upload-btn"
          >
            {file ? 'Change PDF' : 'Upload PDF'}
          </button>
          {file && <span className="file-name">{file.name}</span>}
          {fileError && <p className="error-message">{fileError}</p>}
        </div>

        <button
          onClick={generatePlan}
          className="generate-btn"
        >
          Generate Plan
        </button>
        {/* <Generatebutton onClick={generatePlan}/> */}

        {plan && (
          <div className="plan-display">
            <h3>Study Plan</h3>
            <p><strong>Subject:</strong> {plan.subject || subject}</p>
            {plan.pdf && (
              <p>
                <strong>PDF Link:</strong>{" "}
                <a href={plan.pdf} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              </p>
            )}
            {plan.topics && plan.topics.length > 0 && (
              <div>
                <h4>Topics:</h4>
                <ul className="topics-list">
                  {plan.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}
            {plan.study_plan && (
  <div>
    <h4>Detailed Plan:</h4>
    <div className="study-plan-text">{plan.study_plan}</div>
  </div>
)}

          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlan;
