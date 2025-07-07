import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./css/admin.css";
import { Link } from "react-router-dom";

const Adminusers = () => {
  const { authorizationtoken } = useAuth();
  const [users, setusers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
        },
      });
      const data = await response.json();
      setusers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getdeleteuser = async (_id) => {
    try {
      await fetch(
        `http://localhost:3000/api/admin/users/delete/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationtoken,
          },
        }
      );
      setusers(users.filter((u) => u._id !== _id));
    } catch (error) {}
  };

  // Placeholder for suspend/activate (UI only)
  const handleSuspendActivate = (_id, currentStatus) => {
    setusers(users.map(u => u._id === _id ? { ...u, status: currentStatus === "active" ? "suspended" : "active" } : u));
  };

  // Placeholder for reset password (UI only)
  const handleResetPassword = (user) => {
    alert(`Reset password link sent to ${user.email} (UI only)`);
  };

  // Placeholder for assign/revoke admin (UI only)
  const handleToggleAdmin = (user) => {
    setusers(users.map(u => u._id === user._id ? { ...u, role: user.role === 'admin' ? 'user' : 'admin' } : u));
    alert(`${user.role === 'admin' ? 'Revoked' : 'Granted'} admin privileges for ${user.email} (UI only)`);
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  // Filtered users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesStatus = filterStatus ? user.status === filterStatus : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Mock audit log data (UI only)
  const auditLog = [
    { action: 'Suspended user', user: 'john@example.com', time: '2024-06-01 10:15' },
    { action: 'Granted admin', user: 'jane@company.com', time: '2024-06-01 09:50' },
    { action: 'Deleted user', user: 'bob@influencer.com', time: '2024-05-31 18:22' },
  ];

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin User Management</h1>
        <div className="admin-filters mb-4 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="admin-search-input"
          />
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="admin-filter-select">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="company">Company</option>
            <option value="influencer">Influencer</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="admin-filter-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th>Update</th>
              <th>Suspend/Activate</th>
              <th>Reset Password</th>
              <th>Admin Privileges</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((curUser, index) => (
              <tr key={index}>
                <td>{curUser.username}</td>
                <td>{curUser.email}</td>
                <td>{curUser.phone}</td>
                <td>{curUser.role || "-"}</td>
                <td>{curUser.status || "active"}</td>
                <td>
                  <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                </td>
                <td>
                  <button
                    style={{ backgroundColor: curUser.status === "active" ? "#f59e42" : "#22c55e" }}
                    onClick={() => handleSuspendActivate(curUser._id, curUser.status || "active")}
                  >
                    {curUser.status === "active" ? "Suspend" : "Activate"}
                  </button>
                </td>
                <td>
                  <button style={{ backgroundColor: '#6366f1' }} onClick={() => handleResetPassword(curUser)}>
                    Reset Password
                  </button>
                </td>
                <td>
                  <button style={{ backgroundColor: curUser.role === 'admin' ? '#f87171' : '#22c55e' }} onClick={() => handleToggleAdmin(curUser)}>
                    {curUser.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                  </button>
                </td>
                <td>
                  <button onClick={() => getdeleteuser(curUser._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Audit Log Section (UI only) */}
      <div className="container mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Admin Actions (Audit Log)</h2>
        <table className="admin-audit-log-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>User</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {auditLog.map((log, idx) => (
              <tr key={idx}>
                <td>{log.action}</td>
                <td>{log.user}</td>
                <td>{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Adminusers;
