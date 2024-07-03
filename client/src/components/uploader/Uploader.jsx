import React, { useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import "./Uploader.css";

const DEFAULT_FILE_STATE = "No selected file";

const Uploader = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(DEFAULT_FILE_STATE);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setFileName(DEFAULT_FILE_STATE);
    setImage(null);
  };

  const handleSubmit = () => {
    // Logic for submitting the image
    setSubmitted(true);
  };

  return (
    <main>
      <label htmlFor="fileInput" className="file-input-label">
        <div className="file-drop-zone">
          {image ? (
            <img src={image} alt={fileName} className="image" />
          ) : (
            <>
              <MdCloudUpload className="upload-icon" />
              <p>Browse Files to upload</p>
            </>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="input-field"
            onChange={handleFileChange}
            hidden
          />
        </div>
      </label>
      
      {fileName !== DEFAULT_FILE_STATE && (
        <section className="uploaded-row">
          <AiFillFileImage />
          <span className="upload-content">
            {fileName} -
            <MdDelete onClick={handleDelete} />
          </span>
        </section>
      )}
      
      <div className="button-container">
      <button 
        className="image-submit-button" 
        onClick={handleSubmit} 
        // disabled={!image || submitted}
      >
        Submit
      </button>
      </div>
    </main>
  );
};

export default Uploader;

