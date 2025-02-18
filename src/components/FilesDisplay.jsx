import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "./AdminContext";
import "./homePage.css";
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
    const [isUploading, setIsUploading] = useState(false);

    const Type = {
        "Notes": "Notes",
        "Question Papers": "QP",
        "Question Bank": "QB",
        "PPTs": "PPTs"
    };

    useEffect(() => {
        if (!category || !fileName) {
            console.error("Missing parameters: category or fileName is undefined.");
            return;
        }

        console.log("Fetching files with:", { category, fileName });

        axios.post("https://back-c-seven.vercel.app/api/fetchdata", { category, fileName })
            .then((response) => {
                console.log("Fetched Files:", response.data);
                setFiles(response.data || []);
                setShowContent(true);
            })
            .catch((error) => {
                console.error("Error fetching files:", error.response ? error.response.data : error.message);
            });
    }, [Regulation, Semester, fileName, category, reload]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleView = (fileId) => {
        console.log("Viewing file:", fileId);
        setModalContentUrl(`https://drive.google.com/file/d/${fileId}/preview`);
        setIsModalOpen(true);
    };

    const handleDeleteFile = async (fileId) => {
        if (!isAdmin) return;
        try {
            console.log("Deleting file with ID:", fileId);
            const response = await axios.delete(`https://back-c-seven.vercel.app/api/delete/${fileId}`);
            console.log("Delete Response:", response.data.message);
            setFiles(files.filter(file => file.id !== fileId));
        } catch (error) {
            console.error("Error deleting file:", error.response ? error.response.data : error.message);
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

        setIsUploading(true);

        try {
            const response = await axios.post("https://back-c-seven.vercel.app/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("Upload Response:", response.data);

            if (response.data.fileId) {
                const newFile = { id: response.data.fileId, name: uploadFile.name };
                setFiles(prevFiles => [...(Array.isArray(prevFiles) ? prevFiles : []), newFile]);
            } else {
                console.error("Invalid response from upload API: Missing fileId", response.data);
            }
        } catch (error) {
            console.error("Error while uploading file:", error.response ? error.response.data : error.message);
        } finally {
            setIsUploading(false);
            setUploadFile(null);
        }
    };

    return (
        <>
            <div className="Navigations" style={{ height: "fit-content", minHeight: "70%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="FilesDisplay" style={{ width: "100%", maxWidth: "900px" }}>
                    <div className="Path">
                        <div className="Regulation">{Regulation}</div>
                        <div className="Semester">{Semester}</div>
                        <div className="FileName">{fileName?.split('_')[2]}</div>
                        <div className="Category">{Type[category]}</div>
                    </div>

                    {showContent ? (
                        files.length > 0 ? (
                            <>
                                {/* Desktop View */}
                                <div className="FilesTableWrapper" style={{ display: windowWidth >= 500 ? "block" : "none" }}>
                                    <table className="FilesTable" style={{ width: "100%" }}>
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

                                {/* Mobile View */}
                                <div className="FilesListWrapper" style={{ display: windowWidth < 500 ? "block" : "none" }}>
                                    {files.map((file, index) => (
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
                            <p>No files available for this semester.</p>
                        )
                    ) : (
                        <p>Loading...</p>
                    )}

                    {isAdmin && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                            <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} className="input-container" />
                            <button onClick={handleUploadFile}>Upload</button>
                            {isUploading && <p>Uploading...</p>}
                        </div>
                    )}
                </div>
            </div>

            <ViewModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} contentUrl={modalContentUrl} />
        </>
    );
};

export default FilesDisplay;
