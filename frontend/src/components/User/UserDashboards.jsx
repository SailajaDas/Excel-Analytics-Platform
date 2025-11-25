import React, { useState, useEffect } from "react";
import axios from "axios";
import UserDashboardNavbar from "./UserDashboardNavbar";
import UserSidebar from "./UserSidebar";
import OverView from "./OverView";
import Charts from "./Charts";
import History from "./History";
import FileUpload from "./FileUpload";

const API_URL = "http://localhost:8000/api/history";
const FILES_API_URL = "http://localhost:8000/api/files";

const UserDashboards = ({ currentUser }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [activeTab, setActiveTab] = useState("fileUpload");

  // Load queued notifications from localStorage
  useEffect(() => {
    const queued = JSON.parse(
      localStorage.getItem("notificationQueue") || "[]"
    );
    if (queued.length > 0) {
      setActivityLog((prev) => [
        ...prev,
        ...queued.map((item) => ({ id: Date.now() + Math.random(), ...item })),
      ]);
    }
  }, []);

  // Flush queue when user logs in
  useEffect(() => {
    if (!currentUser?._id) return;

    const flushQueue = async () => {
      const queued = JSON.parse(
        localStorage.getItem("notificationQueue") || "[]"
      );
      for (const item of queued) {
        try {
          const res = await axios.post(API_URL, {
            userId: currentUser._id,
            ...item,
          });
          setActivityLog((prev) => [...prev, res.data]);
        } catch (err) {
          console.error("Failed to flush queued log:", err.message);
          setActivityLog((prev) => [
            ...prev,
            { id: Date.now() + Math.random(), ...item },
          ]);
        }
      }
      localStorage.removeItem("notificationQueue");
    };

    flushQueue();
  }, [currentUser]);

  // Add notification
  const addNotification = async (
    message,
    type = "info",
    action = null,
    fileName = null
  ) => {
    if (!message) return;

    const newEntry = {
      message,
      type,
      action,
      fileName,
      timestamp: new Date().toISOString(),
    };

    if (!currentUser?._id) {
      const existing = JSON.parse(
        localStorage.getItem("notificationQueue") || "[]"
      );
      const updated = [...existing, newEntry];
      localStorage.setItem("notificationQueue", JSON.stringify(updated));

      setActivityLog((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), ...newEntry },
      ]);
      return;
    }

    try {
      const res = await axios.post(API_URL, {
        userId: currentUser._id,
        ...newEntry,
        
      });
      setActivityLog((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(
        "Failed to save history:",
        err.response?.data || err.message
      );
      setActivityLog((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), ...newEntry },
      ]);
    }
  };

  // ✅ Delete file handler
  const deleteFileFromServer = async (id) => {
    const toDelete = uploadedFiles.find((f) => f._id === id);

    try {
      const res = await axios.delete(`${FILES_API_URL}/${id}`, {
        withCredentials: true,
      });

      setUploadedFiles((prev) => prev.filter((f) => f._id !== id));
      if (selectedFile?._id === id) {
        setSelectedFile(null);
        setAvailableColumns([]);
      }

      addNotification(
        res.data?.message || `Deleted ${toDelete?.name}`,
        "error",
        "File Deleted",
        toDelete?.name
      );
    } catch (err) {
      console.error(
        "Failed to delete file:",
        err.response?.data || err.message
      );
      addNotification("Failed to delete file on server", "error");
    }
  };

  // Sidebar content
  const sidebarContent = {
    overView: (
      <OverView
        uploadedFiles={uploadedFiles}
        history={activityLog}
        addNotification={addNotification}
        onSelectFile={(file) => {
          setSelectedFile(file);
          setAvailableColumns(file.columns || []);
          setActiveTab("charts");
          addNotification(`Selected file: ${file.name}`, "info");
        }}
        onNavigateToChart={() => setActiveTab("charts")}
      />
    ),

    fileUpload: (
      <FileUpload
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setAvailableColumns={setAvailableColumns}
        addNotification={addNotification}
        deleteFile={deleteFileFromServer} // ✅ pass delete handler
      />
    ),

    charts: (
      <Charts
        uploadedFiles={uploadedFiles}
        selectedFile={selectedFile}
        availableColumns={availableColumns}
        addNotification={addNotification}
      />
    ),

    history: (
      <History
        userId={currentUser?._id}
        activityLog={activityLog}
        setActivityLog={setActivityLog}
      />
    ),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <UserDashboardNavbar />
      <div className="flex flex-1">
        <UserSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8 transition-all duration-300 ease-in-out">
          {sidebarContent[activeTab]}
        </main>
      </div>
    </div>
  );
};

export default UserDashboards;
