import React from "react";
import "./viewModel.css";
import { IoIosClose } from "react-icons/io";

const ViewModel = ({ isOpen, onClose, contentUrl }) => {
  if (!isOpen) return null; // Render nothing if the modal is closed

  return (
    <div className="ViewModel">
      <div className="ViewModelContent">
        <div className="CloseButton" onClick={onClose}>
        <IoIosClose />
        </div>
        <iframe
          src={contentUrl}
          title="File Viewer"
          className="ViewModelIframe"
        ></iframe>
      </div>
    </div>
  );
};

export default ViewModel;
