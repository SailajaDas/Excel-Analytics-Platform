import React, { useState, useEffect } from "react";
import { Upload, Trash2, FileText } from "lucide-react";
import * as XLSX from "xlsx";

const API_BASE = "http://localhost:8000/api/files";

const FileUpload = ({
  uploadedFiles,
  setUploadedFiles,
  selectedFile,
  setSelectedFile,
  setAvailableColumns,
  addNotification,
  deleteFile, 
}) => {
  const [tableData, setTableData] = useState(null);

  // Fetch files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(API_BASE, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch files");
        const data = await res.json();
        setUploadedFiles(data);
      } catch (err) {
        console.error("Error fetching files:", err);
        addNotification("Failed to load files from server", "error");
      }
    };
    fetchFiles();
  }, [setUploadedFiles, addNotification]);

  // Upload file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws);

      const columns = jsonData[0] ? Object.keys(jsonData[0]) : [];

      const newFile = {
        name: file.name,
        rowCount: jsonData.length,
        columns,
        data: jsonData,
      };

      try {
        const res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFile),
          credentials: "include",
        });

        if (!res.ok) throw new Error("Upload failed");

        const savedFile = await res.json();
        setUploadedFiles((prev) => [...prev, savedFile]);
        addNotification(`${file.name} uploaded successfully!`, "success");
      } catch (err) {
        console.error("Upload error:", err);
        addNotification("Error uploading file to server", "error");
      }
    };

    reader.readAsBinaryString(file);
  };

  // View table
  const handleViewTable = (file) => {
    if (!file.data || file.data.length === 0) {
      addNotification("No data available to display", "warning");
      return;
    }
    setTableData(file);
    setSelectedFile(file);
    setAvailableColumns(file.columns || []);
    addNotification(`Viewing table for: ${file.name}`, "info");
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors">
          <Upload className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-2xl font-medium text-gray-900 mb-4">
            Upload Excel/CSV File
          </h3>
          <p className="text-gray-600 mb-6">
            Select an Excel file (.xlsx, .xls) or CSV file to get started
          </p>

          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            Choose File
          </label>
        </div>
      </div>

      {/* Uploaded Files List */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Uploaded Files</h3>
        {uploadedFiles.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No files uploaded yet
          </p>
        ) : (
          uploadedFiles.map((file) => (
            <div
              key={file._id}
              className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-shadow"
            >
              <div>
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-gray-600">{file.rowCount} rows</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleViewTable(file)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" /> View Table
                </button>
                <button
                  onClick={() => deleteFile(file._id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Table Preview */}
      {tableData && (
        <div className="bg-white p-6 rounded-xl shadow-lg overflow-auto">
          <h3 className="text-xl font-semibold mb-4">
            Table Preview: {tableData.name}
          </h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {tableData.columns.map((col, idx) => (
                  <th key={idx} className="border px-4 py-2 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {tableData.columns.map((col, i) => (
                    <td key={i} className="border px-4 py-2">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
