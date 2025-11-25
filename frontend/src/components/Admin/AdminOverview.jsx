// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import {
//   Search,
//   Lock,
//   Unlock,
//   RotateCcw,
//   Eye,
//   Calendar,
//   Mail,
//   User,
//   Shield,
// } from "lucide-react";

// const AdminOverview = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("All");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUserDetails, setShowUserDetails] = useState(false);
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         "http://localhost:8000/api/user/all-users",
//         { withCredentials: true }
//       );
//       const transformedUsers = data.map((user) => ({
//         ...user,
//         id: user._id,
//         name: user.fullName,
//         registrationDate: user.createdAt
//           ? new Date(user.createdAt).toISOString().split("T")[0]
//           : "-",
//         lastActivity: user.lastLogin
//           ? new Date(user.lastLogin).toISOString().split("T")[0]
//           : "-",
//         uploadedFiles: user.uploadedFiles || 0,
//         avatar:
//           user.avatar ||
//           `https://api.dicebear.com/7.x/avataaars/svg?seed=${
//             user.fullName || "default"
//           }`,
//         status: user.status.charAt(0).toUpperCase() + user.status.slice(1),
//       }));
//       setUsers(transformedUsers);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch users.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filter users
//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const matchesSearch =
//         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesRole =
//         roleFilter === "All" ||
//         user.role.toLowerCase() === roleFilter.toLowerCase();
//       const matchesStatus =
//         statusFilter === "All" ||
//         user.status.toLowerCase() === statusFilter.toLowerCase();
//       return matchesSearch && matchesRole && matchesStatus;
//     });
//   }, [users, searchTerm, roleFilter, statusFilter]);

//   // Block/Unblock
//   const handleBlockUnblock = async (userId) => {
//     const user = users.find((u) => u.id === userId);
//     if (!user) return;

//     const newStatus =
//       user.status.toLowerCase() === "active" ? "blocked" : "active";
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === userId
//           ? {
//               ...u,
//               status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
//             }
//           : u
//       )
//     );

//     try {
//       await axios.patch(
//         `http://localhost:8000/api/user/${userId}/status`,
//         { status: newStatus },
//         { withCredentials: true }
//       );
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update status.");
//       setUsers((prev) =>
//         prev.map((u) => (u.id === userId ? { ...u, status: user.status } : u))
//       );
//     }
//   };

//   // View user details
//   const handleViewDetails = (user) => {
//     setSelectedUser(user);
//     setShowUserDetails(true);
//   };

//   // Open reset password modal
//   const handleResetPassword = (user) => {
//     setSelectedUser(user);
//     setShowResetModal(true);
//   };

//   // Confirm reset password
//   const confirmResetPassword = async () => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8000/api/user/admin-reset-password",
//         { email: selectedUser.email },
//         { withCredentials: true }
//       );

//       alert(
//         `Password reset successfully.\nTemporary password: ${data.tempPassword}`
//       );
//       fetchUsers(); // Refresh user list
//     } catch (err) {
//       console.error(err);
//       alert("Failed to reset password.");
//     } finally {
//       setShowResetModal(false);
//       setSelectedUser(null);
//     }
//   };

//   // Badge colors
//   const getRoleBadgeColor = (role) =>
//     role.toLowerCase() === "admin"
//       ? "bg-red-100 text-red-800"
//       : "bg-gray-100 text-gray-800";
//   const getStatusBadgeColor = (status) =>
//     status.toLowerCase() === "active"
//       ? "bg-green-100 text-green-800"
//       : "bg-red-100 text-red-800";

//   if (loading) return <div className="p-6 text-center">Loading...</div>;
//   if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-2">Admin Overview</h1>
//         <br />
      
//         {/* Filters */}
//         <div className="bg-white p-4 rounded-lg mb-6 flex flex-wrap gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name or email"
//               className="w-full pl-10 py-2 border rounded-lg"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <select
//             value={roleFilter}
//             onChange={(e) => setRoleFilter(e.target.value)}
//             className="pl-2 py-2 border rounded-lg"
//           >
//             <option>All</option>
//             <option>Admin</option>
//             <option>User</option>
//           </select>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="pl-2 py-2 border rounded-lg"
//           >
//             <option>All</option>
//             <option>Active</option>
//             <option>Blocked</option>
//           </select>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white rounded-lg shadow overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   User
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Role
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Registration Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Last Activity
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 flex items-center">
//                       <img
//                         className="h-10 w-10 rounded-full"
//                         src={user.avatar}
//                         alt={user.name}
//                       />
//                       <div className="ml-4">
//                         <div className="text-sm font-medium">{user.name}</div>
//                         <div className="text-sm text-gray-500">
//                           {user.email}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
//                           user.role
//                         )}`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
//                           user.status
//                         )}`}
//                       >
//                         {user.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">{user.registrationDate}</td>
//                     <td className="px-6 py-4">{user.lastActivity}</td>
//                     <td className="px-6 py-4 flex space-x-2">
//                       <button
//                         onClick={() => handleViewDetails(user)}
//                         title="View Details"
//                       >
//                         <Eye className="w-4 h-4 text-blue-600" />
//                       </button>
//                       <button
//                         onClick={() => handleBlockUnblock(user.id)}
//                         title={user.status === "Active" ? "Block" : "Unblock"}
//                       >
//                         {user.status === "Active" ? (
//                           <Lock className="w-4 h-4 text-red-600" />
//                         ) : (
//                           <Unlock className="w-4 h-4 text-green-600" />
//                         )}
//                       </button>
//                       <button
//                         onClick={() => handleResetPassword(user)}
//                         title="Reset Password"
//                       >
//                         <RotateCcw className="w-4 h-4 text-gray-600" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-6 text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* User Details Modal */}
//         {showUserDetails && selectedUser && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">User Details</h2>
//                 <button
//                   onClick={() => setShowUserDetails(false)}
//                   className="text-gray-400 hover:text-gray-600 text-2xl"
//                 >
//                   &times;
//                 </button>
//               </div>
//               <div className="flex items-center space-x-4 mb-6">
//                 <img
//                   className="h-20 w-20 rounded-full"
//                   src={selectedUser.avatar}
//                   alt={selectedUser.name}
//                 />
//                 <div>
//                   <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
//                   <p className="text-gray-600">{selectedUser.email}</p>
//                   <div className="flex space-x-2 mt-2">
//                     <span
//                       className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
//                         selectedUser.role
//                       )}`}
//                     >
//                       {selectedUser.role}
//                     </span>
//                     <span
//                       className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
//                         selectedUser.status
//                       )}`}
//                     >
//                       {selectedUser.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <Calendar className="w-5 h-5 text-gray-400" />
//                     <span>Registered: {selectedUser.registrationDate}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <User className="w-5 h-5 text-gray-400" />
//                     <span>Last Activity: {selectedUser.lastActivity}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <Mail className="w-5 h-5 text-gray-400" />
//                     <span>Uploaded Files: {selectedUser.uploadedFiles}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Shield className="w-5 h-5 text-gray-400" />
//                     <span>Account Status: {selectedUser.status}</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-2">Recent Activity</h4>
//                 {selectedUser.recentActivity &&
//                 selectedUser.recentActivity.length > 0 ? (
//                   selectedUser.recentActivity.map((act, idx) => (
//                     <div key={idx} className="p-2 bg-gray-50 rounded mb-1">
//                       <p className="text-sm">{act.description}</p>
//                       <p className="text-xs text-gray-400">
//                         {act.date ? new Date(act.date).toLocaleString() : "-"}
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No recent activity</p>
//                 )}
//               </div>
//               <div className="flex justify-end space-x-3 mt-4">
//                 <button
//                   onClick={() => setShowUserDetails(false)}
//                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowUserDetails(false);
//                     handleResetPassword(selectedUser);
//                   }}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Reset Password
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reset Password Modal */}
//         {showResetModal && selectedUser && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg max-w-md w-full p-6">
//               <h2 className="text-xl font-bold mb-2">Reset Password</h2>
//               <p className="text-gray-600 mb-4">
//                 Reset password for <strong>{selectedUser.email}</strong> and
//                 generate a temporary password?
//               </p>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowResetModal(false)}
//                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmResetPassword}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Reset Password
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOverview;




import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Search,
  Lock,
  Unlock,
  Eye,
  Calendar,
  Mail,
  User,
  Shield,
} from "lucide-react";

const AdminOverview = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:8000/api/user/all-users",
        { withCredentials: true }
      );
      const transformedUsers = data.map((user) => ({
        ...user,
        id: user._id,
        name: user.fullName,
        registrationDate: user.createdAt
          ? new Date(user.createdAt).toISOString().split("T")[0]
          : "-",
        lastActivity: user.lastLogin
          ? new Date(user.lastLogin).toISOString().split("T")[0]
          : "-",
        uploadedFiles: user.uploadedFiles || 0,
        avatar:
          user.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${
            user.fullName || "default"
          }`,
        status: user.status.charAt(0).toUpperCase() + user.status.slice(1),
      }));
      setUsers(transformedUsers);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole =
        roleFilter === "All" ||
        user.role.toLowerCase() === roleFilter.toLowerCase();
      const matchesStatus =
        statusFilter === "All" ||
        user.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Block/Unblock
  const handleBlockUnblock = async (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const newStatus =
      user.status.toLowerCase() === "active" ? "blocked" : "active";
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
            }
          : u
      )
    );

    try {
      await axios.patch(
        `http://localhost:8000/api/user/${userId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: user.status } : u))
      );
    }
  };

  // View user details
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  // Badge colors
  const getRoleBadgeColor = (role) =>
    role.toLowerCase() === "admin"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";
  const getStatusBadgeColor = (status) =>
    status.toLowerCase() === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Overview</h1>
        <br />

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg mb-6 flex flex-wrap gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email"
              className="w-full pl-10 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="pl-2 py-2 border rounded-lg"
          >
            <option>All</option>
            <option>Admin</option>
            <option>User</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-2 py-2 border rounded-lg"
          >
            <option>All</option>
            <option>Active</option>
            <option>Blocked</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{user.registrationDate}</td>
                    <td className="px-6 py-4">{user.lastActivity}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(user)}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleBlockUnblock(user.id)}
                        title={user.status === "Active" ? "Block" : "Unblock"}
                      >
                        {user.status === "Active" ? (
                          <Lock className="w-4 h-4 text-red-600" />
                        ) : (
                          <Unlock className="w-4 h-4 text-green-600" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* User Details Modal */}
        {showUserDetails && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">User Details</h2>
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &times;
                </button>
              </div>

              {/* Basic Info */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  className="h-20 w-20 rounded-full"
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                />
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <div className="flex space-x-2 mt-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                        selectedUser.role
                      )}`}
                    >
                      {selectedUser.role}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                        selectedUser.status
                      )}`}
                    >
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>Registered: {selectedUser.registrationDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span>Last Activity: {selectedUser.lastActivity}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Show Uploaded Files only if role is 'user' */}
                  {selectedUser.role.toLowerCase() === "user" && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>Uploaded Files: {selectedUser.uploadedFiles}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span>Account Status: {selectedUser.status}</span>
                  </div>
                </div>
              </div>

              {/* Show Recent Activity only for normal users */}
              {selectedUser.role.toLowerCase() === "user" && (
                <div>
                  <h4 className="font-semibold mb-2">Recent Activity</h4>
                  {selectedUser.recentActivity &&
                  selectedUser.recentActivity.length > 0 ? (
                    selectedUser.recentActivity.map((act, idx) => (
                      <div key={idx} className="p-2 bg-gray-50 rounded mb-1">
                        <p className="text-sm">{act.description}</p>
                        <p className="text-xs text-gray-400">
                          {act.date
                            ? new Date(act.date).toLocaleString()
                            : "-"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No recent activity</p>
                  )}
                </div>
              )}

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
