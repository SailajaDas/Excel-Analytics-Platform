import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {
  Trash2,
  Download,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

const API_URL = "http://localhost:8000/api/history";

const History = ({ userId, activityLog, setActivityLog }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const fetchActivities = async () => {
      try {
        const res = await axios.get(`${API_URL}/${userId}`);
        const data = res.data.map((item) => ({
          ...item,
          id: item._id || item.id,
        }));
        setActivityLog(data);
      } catch (err) {
        console.error("Failed to fetch activities", err);
      }
    };
    fetchActivities();
  }, [userId, setActivityLog]);

  // Delete all activities
  const clearHistory = async () => {
    try {
      await axios.delete(`${API_URL}/user/${userId}`);
    } catch (err) {
      console.error("Failed to clear all activities", err);
    }
    setActivityLog([]);
    localStorage.removeItem("notificationQueue");
    setShowConfirmClear(false);
  };

  // Delete activities by type
  const clearByType = async (type) => {
    try {
      await axios.delete(`${API_URL}/user/${userId}/type/${type}`);
    } catch (err) {
      console.error("Failed to clear by type", err);
    }
    setActivityLog((prev) => prev.filter((item) => item.type !== type));
  };

  // Delete single activity
  const clearItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/user/${userId}/item/${id}`);
    } catch (err) {
      console.error("Failed to delete item", err);
    }
    setActivityLog((prev) => prev.filter((item) => item.id !== id));
  };

  // Export activity log as JSON
  const exportHistory = () => {
    const dataStr = JSON.stringify(activityLog || [], null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `activity-history-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Stats
  const stats = useMemo(() => {
    const log = activityLog || [];
    return {
      total: log.length,
      success: log.filter((item) => item.type === "success").length,
      error: log.filter((item) => item.type === "error").length,
      info: log.filter((item) => item.type === "info").length,
    };
  }, [activityLog]);

  const filteredLog = useMemo(() => {
    if (!activityLog) return [];

    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const weekStart = new Date(todayStart);
    weekStart.setDate(todayStart.getDate() - 7);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return activityLog.filter((item) => {
      const itemDate = new Date(item.timestamp);

      // Search filter
      const matchesSearch = item.message
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType = filterType === "all" || item.type === filterType;

      // Date filter
      let matchesDate = true;
      if (dateFilter === "today") {
        matchesDate = itemDate >= todayStart && itemDate < todayEnd;
      } else if (dateFilter === "week") {
        matchesDate = itemDate >= weekStart && itemDate < todayEnd;
      } else if (dateFilter === "month") {
        matchesDate = itemDate >= monthStart && itemDate < todayEnd;
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [activityLog, searchTerm, filterType, dateFilter]);

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Activity History</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={exportHistory}
            disabled={stats.total === 0}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" /> Export
          </button>
          <button
            onClick={() => setShowConfirmClear(true)}
            disabled={stats.total === 0}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" /> Clear All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Items</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow border border-green-200">
          <div className="text-2xl font-bold text-green-800">
            {stats.success}
          </div>
          <div className="text-sm text-green-600">Success</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow border border-red-200">
          <div className="text-2xl font-bold text-red-800">{stats.error}</div>
          <div className="text-sm text-red-600">Errors</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow border border-blue-200">
          <div className="text-2xl font-bold text-blue-800">{stats.info}</div>
          <div className="text-sm text-blue-600">Info</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64 relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="info">Info</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          <span className="text-sm font-medium text-gray-600">
            Quick Actions:
          </span>
          <button
            onClick={() => clearByType("error")}
            disabled={stats.error === 0}
            className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Clear Errors ({stats.error})
          </button>
          <button
            onClick={() => clearByType("success")}
            disabled={stats.success === 0}
            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Clear Success ({stats.success})
          </button>
          <button
            onClick={() => clearByType("info")}
            disabled={stats.info === 0}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Clear Info ({stats.info})
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {filteredLog.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {stats.total === 0
                ? "No activity recorded yet"
                : "No items match your current filters"}
            </p>
            {stats.total > 0 &&
              (searchTerm || filterType !== "all" || dateFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                    setDateFilter("all");
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Clear filters
                </button>
              )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-gray-600 mb-4">
              Showing {filteredLog.length} of {stats.total} items
            </div>
            {filteredLog.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 border-l-4 rounded-lg ${
                  item.type === "success"
                    ? "border-green-500 bg-green-50"
                    : item.type === "error"
                    ? "border-red-500 bg-red-50"
                    : "border-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  {getTypeIcon(item.type)}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.message}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.timestamp}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => clearItem(item.id)}
                  className="ml-4 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Remove this item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Clear All History?
            </h3>
            <p className="text-gray-600 mb-6">
              This will permanently delete all {stats.total} activity records.
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;


