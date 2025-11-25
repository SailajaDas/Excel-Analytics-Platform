import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Bar,
  Line,
  Pie,
  Doughnut,
  PolarArea,
  Radar,
  Bubble,
  Scatter,
} from "react-chartjs-2";
import { Download, Image, FileDown, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const Charts = ({ uploadedFiles = [], addNotification }) => {
  const [chartType, setChartType] = useState("");
  const [selectedFileId, setSelectedFileId] = useState("");
  const [selectedColumns, setSelectedColumns] = useState({ x: "", y: "" });
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const selectedFile = uploadedFiles.find((f) => f._id === selectedFileId);

  useEffect(() => {
    if (uploadedFiles.length > 0 && !selectedFileId)
      setSelectedFileId(uploadedFiles[0]._id);
  }, [uploadedFiles, selectedFileId]);

  useEffect(() => {
    if (!selectedFile?.data || selectedFile.data.length === 0) return;

    const headers = Object.keys(selectedFile.data[0]);
    let textCol =
      headers.find((col) => isNaN(Number(selectedFile.data[0][col]))) ||
      headers[0];
    let numCol =
      headers.find((col) => !isNaN(Number(selectedFile.data[0][col]))) ||
      headers[1] ||
      headers[0];

    setSelectedColumns({ x: textCol, y: numCol });
  }, [selectedFile]);

  useEffect(() => {
    if (!selectedFile || !selectedColumns.x || !selectedColumns.y || !chartType)
      return;

    const labels = selectedFile.data.map((row) => row[selectedColumns.x]);
    const dataValues = selectedFile.data.map(
      (row) => Number(row[selectedColumns.y]) || 0
    );

    setChartData({
      labels,
      datasets: [
        {
          label: selectedColumns.y,
          data: dataValues,
          backgroundColor: labels.map(
            (_, i) => `hsl(${(i * 40) % 360}, 70%, 50%)`
          ),
          borderColor: "#8884d8",
          borderWidth: 2,
          fill: chartType === "area",
        },
      ],
    });
  }, [selectedFile, selectedColumns, chartType]);

  // Log only when chartType changes
  useEffect(() => {
    if (!selectedFile) return;
    if (addNotification) {
      addNotification(
        `Generated ${chartType} chart for ${selectedFile.name}`,
        "success",
        "Chart Generated",
        selectedFile.name
      );
    }
  }, [chartType]);

  const renderChart = () => {
    if (!chartData.labels?.length)
      return (
        <div className="text-gray-500 text-center py-8">No data to display</div>
      );

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "top" } },
    };

    switch (chartType) {
      case "bar":
        return (
          <Bar
            ref={chartRef}
            data={chartData}
            options={commonOptions}
            height={300}
            width={600}
          />
        );
      case "line":
        return (
          <Line
            ref={chartRef}
            data={chartData}
            options={commonOptions}
            height={300}
            width={600}
          />
        );
      case "area":
        return (
          <Line
            ref={chartRef}
            data={chartData}
            options={{
              ...commonOptions,
              elements: { line: { tension: 0.4 }, point: { radius: 4 } },
            }}
            height={300}
            width={600}
          />
        );
      case "pie":
        return <Pie ref={chartRef} data={chartData} options={commonOptions} />;
      case "doughnut":
        return (
          <Doughnut ref={chartRef} data={chartData} options={commonOptions} />
        );
      case "polarArea":
        return (
          <PolarArea ref={chartRef} data={chartData} options={commonOptions} />
        );
      case "radar":
        return (
          <Radar ref={chartRef} data={chartData} options={commonOptions} />
        );
      case "bubble":
        const bubbleData = {
          datasets: chartData.labels.map((label, i) => ({
            label,
            data: [{ x: i + 1, y: chartData.datasets[0].data[i], r: 5 }],
            backgroundColor: `hsl(${(i * 40) % 360}, 70%, 50%)`,
          })),
        };
        return (
          <Bubble ref={chartRef} data={bubbleData} options={commonOptions} />
        );
      case "scatter":
        const scatterData = {
          datasets: [
            {
              label: selectedColumns.y,
              data: chartData.labels.map((_, i) => ({
                x: i + 1,
                y: chartData.datasets[0].data[i],
              })),
              backgroundColor: "#8884d8",
            },
          ],
        };
        return (
          <Scatter ref={chartRef} data={scatterData} options={commonOptions} />
        );
      case "mixed":
        const mixedData = {
          labels: chartData.labels,
          datasets: [
            {
              type: "bar",
              label: selectedColumns.y,
              data: chartData.datasets[0].data,
              backgroundColor: "rgba(75,192,192,0.4)",
            },
            {
              type: "line",
              label: selectedColumns.y + " Line",
              data: chartData.datasets[0].data,
              borderColor: "#ff6384",
              borderWidth: 2,
              fill: false,
            },
          ],
        };
        return (
          <Bar
            ref={chartRef}
            data={mixedData}
            options={commonOptions}
            height={300}
            width={600}
          />
        );
      default:
        return (
          <div className="text-gray-500 text-center py-8">
            Chart type not supported
          </div>
        );
    }
  };

  const downloadChartAsPNG = () => {
    if (!chartRef.current) return;
    const canvas = chartRef.current.canvas; // get the actual canvas
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "chart.png";
    link.click();
  };

  const downloadChartAsPDF = () => {
    if (!chartRef.current) return;
    const canvas = chartRef.current.canvas;
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("chart.pdf");
  };

  const downloadSummary = () => {
    const summary = {
      fileName: selectedFile?.name || "",
      chartType,
      selectedColumns,
      dataPoints: chartData.labels?.length || 0,
    };
    const blob = new Blob([JSON.stringify(summary, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedFile?.name || "chart"}_summary.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Chart Generation</h2>

      {uploadedFiles.length === 0 ? (
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <p className="text-yellow-800">Please upload a file first</p>
        </div>
      ) : (
        <>
          {/* File Selector */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6">Select File</h3>
            <select
              value={selectedFileId}
              onChange={(e) => setSelectedFileId(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {uploadedFiles.map((file) => (
                <option key={file._id} value={file._id}>
                  {file.name} ({file.rowCount} rows)
                </option>
              ))}
            </select>
          </div>

          {/* Chart Configuration */}
          {selectedFile && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-6">
                Chart Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Chart Type
                  </label>
                  <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select Chart Type --</option>
                    <option value="bar">📊 Bar</option>
                    <option value="line">📈 Line</option>
                    <option value="area">🌊 Area</option>
                    <option value="pie">🥧 Pie</option>
                    <option value="doughnut">🍩 Doughnut</option>
                    <option value="polarArea">📡 Polar Area</option>
                    <option value="radar">📡 Radar</option>
                    <option value="bubble">🔵 Bubble</option>
                    <option value="scatter">⚪ Scatter</option>
                    <option value="mixed">🔀 Mixed (Bar + Line)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    X-Axis
                  </label>
                  <select
                    value={selectedColumns.x}
                    onChange={(e) =>
                      setSelectedColumns((prev) => ({
                        ...prev,
                        x: e.target.value,
                      }))
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {selectedFile.columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Y-Axis
                  </label>
                  <select
                    value={selectedColumns.y}
                    onChange={(e) =>
                      setSelectedColumns((prev) => ({
                        ...prev,
                        y: e.target.value,
                      }))
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {selectedFile.columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Chart Display */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Generated Chart</h3>
              <button
                onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Download className="h-4 w-4" />
                Download Options
              </button>
            </div>

            {showDownloadOptions && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg flex gap-3">
                <button
                  onClick={downloadChartAsPNG}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <Image className="h-4 w-4" /> PNG
                </button>
                <button
                  onClick={downloadChartAsPDF}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  <FileDown className="h-4 w-4" /> PDF
                </button>
                <button
                  onClick={downloadSummary}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  <FileText className="h-4 w-4" /> Summary
                </button>
              </div>
            )}

            <div ref={canvasRef} style={{ height: 350, width: "100%" }}>
              {renderChart()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Charts;




