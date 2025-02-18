import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AdminContext } from './AdminContext'; 
import './homePage.css';
import ViewModel from "./ViewModel";
import { FaDownload } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const FilesDisplay = () => {
    const { Regulation, Semester, fileName, category } = useParams();
    const [files, setFiles] = useState([]);
    const [showContent, setShowContent] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [reload, setReload] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContentUrl, setModalContentUrl] = useState("");
    const { isAdmin } = useContext(AdminContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isUploading, setIsUploading] = useState(false); // New state for upload status

    // const file = `${Regulation}_${fileName}`;

    const Type = {
        "Notes": "Notes",
        "Question Papers": "QP",
        "Question Bank": "QB",
        "PPTs": "PPTs"
    };

    useEffect(() => {
        // Fetch files
        
        // console.log(file);
        axios.post('https://back-c-seven.vercel.app/api/fetchdata', { category, fileName })
            .then((response) => {
                console.log(response.data);
                setFiles(response.data || []);
                setShowContent(true);
            })
            .catch((error) => {
                console.log("Error fetching files:", error);
            });
    }, [Regulation, Semester, fileName, category, reload]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleView = (file_id) => {
        console.log(file_id);
        setModalContentUrl(`https://drive.google.com/file/d/${file_id}/preview`);
        setIsModalOpen(true);
    };

    const handleDeleteFile = async (fileId) => {
        if (!isAdmin) return;
        try {
            console.log("Deleting file with ID:", fileId);
            const response = await axios.delete(`https://back-c-seven.vercel.app/api/delete/${fileId}`);
            console.log(response.data.message);
            setFiles(files.filter(file => file.id !== fileId));
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    const handleUploadFile = async () => {
        if (!uploadFile) {
            console.error("No file selected for upload.");
            return;
        }
        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("category", category);
        formData.append("fileName", fileName);
    
        setIsUploading(true); // Set uploading state to true
    
        try {
            const response = await axios.post("https://back-c-seven.vercel.app/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data.message); // Log the success message
    
            // Check if the response contains the necessary file details
            if (response.data.fileId) {
                const newFile = {
                    id: response.data.fileId, // Use the fileId from the response
                    name: uploadFile.name, // Use the name from the uploaded file
                    // Add other necessary file properties here
                };
    
                // Update the files state with the new file
                setFiles(prevFiles => {
                    const currentFiles = Array.isArray(prevFiles) ? prevFiles : [];
                    return [...currentFiles, newFile];
                });
            } else {
                console.error("Invalid response from upload API: Missing fileId", response.data);
            }
        } catch (error) {
            console.error("Error while uploading file:", error);
        } finally {
            setIsUploading(false); // Set uploading state back to false
            setUploadFile(null);
        }
    };

    return (
        <>
            <div className="Navigations" style={{ height: 'fit-content', minHeight: "70%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="FilesDisplay" style={{ width: "100%", maxWidth: '900px' }}>
                    <div className="Path">
                        <div className="Regulation">{Regulation}</div>
                        <div className="Semester">{Semester}</div>
                        <div className="FileName">{fileName.split('_')[2]}</div>
                        <div className="Category">{Type[category]}</div>
                    </div>
                    {
    showContent ? (
        files.length > 0 ? (
            <>
                {/* Desktop Table Layout */}
                <div className="FilesTableWrapper" style={{ display: windowWidth >= 500 ? 'block' : 'none' }}>
                    <table className="FilesTable" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Download</th>
                                <th>View</th>
                                {isAdmin && <th>Delete</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {files.sort((a, b) => a.name.localeCompare(b.name)).map((file, index) => (
                                <tr key={index}>
                                    <td>{file.name}</td>
                                    <td className="Operations">
                                        <a href={`https://drive.google.com/uc?id=${file.id}&export=download`} rel="noopener noreferrer">
                                            <button className="Download">Download</button>
                                        </a>
                                    </td>
                                    <td className="Operations">
                                        <button className="View" onClick={() => handleView(file.id)}>View</button>
                                    </td>
                                    {isAdmin && (
                                        <td className="Operations">
                                            <button className="Delete" onClick={() => handleDeleteFile(file.id)}>Delete</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Flex Layout */}
                <div className="FilesListWrapper" style={{ display: windowWidth < 500 ? 'block' : 'none' }}>
                    {files.sort((a, b) => a.name.localeCompare(b.name)).map((file, index) => (
                        <div key={index} className="file-container">
                            <div className="file-name">{file.name}</div>
                            <div className="buttons">
                                <a href={`https://drive.google.com/uc?id=${file.id}&export=download`} rel="noopener noreferrer">
                                    <button className="Download">Download</button>
                                </a>
                                <button className="View" onClick={() => handleView(file.id)}>View</button>
                                {isAdmin && <button className="Delete" onClick={() => handleDeleteFile(file.id)}>Delete</button>}
                            </div>
                        </div>
                    ))}
                </div>
            </>
        ) : (
            <p>No Files available for this semester.</p>
        )
    ) : (
        <p>Loading...</p>
    )
}

                    {isAdmin && (
                        <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', width: "100%"}}>
                            <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} className="input-container" />
                            <button onClick={handleUploadFile}>Upload</button>
                            {isUploading && <p>Uploading...</p>} {/* Show uploading message */}
                        </div>
                    )}
                </div>
            </div>
            <ViewModel
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                contentUrl={modalContentUrl}
            />
        </>
    );
}

export default FilesDisplay;