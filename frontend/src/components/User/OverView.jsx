import React from "react";
import { FileText, BarChart3, Download, Upload } from "lucide-react";

const OverView = ({
  uploadedFiles = [],
  history = [],
  onSelectFile = () => {},
  onNavigateToChart = () => {},
}) => {
  const totalRows = uploadedFiles.reduce(
    (total, file) => total + (file.rowCount || 0),
    0
  );

  const chartsGenerated = history.filter(
    (h) => h.action && h.action.includes("Chart")
  ).length;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Files</p>
              <p className="text-3xl font-bold text-blue-800">
                {uploadedFiles.length}
              </p>
            </div>
            <FileText className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">
                Charts Generated
              </p>
              <p className="text-3xl font-bold text-green-800">
                {chartsGenerated}
              </p>
            </div>
            <BarChart3 className="h-10 w-10 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Rows</p>
              <p className="text-3xl font-bold text-purple-800">{totalRows}</p>
            </div>
            <Download className="h-10 w-10 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Recent Files Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Recent Files</h3>
        {uploadedFiles.length === 0 ? (
          <div className="text-center py-8">
            <Upload className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No files uploaded yet</p>
            <p className="text-gray-400">Upload an Excel file to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* {uploadedFiles.slice(-3).map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <div>
                  <p className="font-semibold text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-600">
                    {file.rowCount || 0} rows • {(file.columns || []).length}{" "}
                    columns
                  </p>
                </div>
                <button
                  onClick={() => {
                    onSelectFile(file);
                    onNavigateToChart();
                    addNotification(
                      `Chart generated for ${file.name}`,
                      "success"
                    );
                  }}
                >
                  Analyze
                </button>
              </div>
            ))} */}
            {uploadedFiles
              .slice(-3)
              .reverse()
              .map((file) => (
                <div
                  key={file._id || file.id || file.name}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-600">
                      {file.rowCount || 0} rows • {(file.columns || []).length}{" "}
                      columns
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => {
                      onSelectFile(file);
                      onNavigateToChart();
                      addNotification(
                        `Chart generated for ${file.name}`,
                        "success"
                      );
                    }}
                  >
                    Analyze
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverView;
