import { useEffect, useState } from "react";
import "./css/admin.css";
import { useAuth } from "../store/auth";

const Admincampaigns = () => {
  const { authorizationtoken } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:3000/api/admin/campaigns");
        if (!res.ok) throw new Error("Failed to fetch campaigns");
        const data = await res.json();
        setCampaigns(data);
      } catch (err) {
        setError("Could not load campaigns.");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id + "-approve");
    setActionError("");
    try {
      const res = await fetch(`http://localhost:3000/api/admin/campaigns/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationtoken,
        },
        body: JSON.stringify({ status: "approved" }),
      });
      if (!res.ok) throw new Error("Failed to approve campaign");
      const data = await res.json();
      setCampaigns(campaigns.map(c => c._id === id ? data.campaign : c));
    } catch (err) {
      setActionError("Could not approve campaign.");
    } finally {
      setActionLoading("");
    }
  };
  const handleReject = async (id) => {
    setActionLoading(id + "-reject");
    setActionError("");
    try {
      const res = await fetch(`http://localhost:3000/api/admin/campaigns/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationtoken,
        },
        body: JSON.stringify({ status: "rejected" }),
      });
      if (!res.ok) throw new Error("Failed to reject campaign");
      const data = await res.json();
      setCampaigns(campaigns.map(c => c._id === id ? data.campaign : c));
    } catch (err) {
      setActionError("Could not reject campaign.");
    } finally {
      setActionLoading("");
    }
  };
  const handleDelete = async (id) => {
    setActionLoading(id + "-delete");
    setActionError("");
    try {
      const res = await fetch(`http://localhost:3000/api/admin/campaigns/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationtoken,
        },
      });
      if (!res.ok) throw new Error("Failed to delete campaign");
      setCampaigns(campaigns.filter(c => c._id !== id));
    } catch (err) {
      setActionError("Could not delete campaign.");
    } finally {
      setActionLoading("");
    }
  };
  const handleEdit = (id) => {
    alert("Edit campaign (UI only)");
  };

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.company?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? c.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="admin-users-section flex flex-col items-center w-full min-h-screen bg-[#f9f9f9] pt-8">
      <div className="container flex flex-col items-center w-full max-w-5xl">
        <h1>Admin Campaign Management</h1>
        <div className="admin-filters mb-4 flex flex-wrap gap-4 items-center w-full justify-center">
          <input
            type="text"
            placeholder="Search by title or company"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="admin-search-input"
          />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="admin-filter-select">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div className="container admin-users w-full max-w-5xl flex flex-col items-center">
        {loading && <div className="py-8 text-lg text-gray-600">Loading campaigns...</div>}
        {error && <div className="py-8 text-red-600">{error}</div>}
        {actionError && <div className="py-2 text-red-600">{actionError}</div>}
        {!loading && !error && (
          <table className="w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Approve</th>
                <th>Reject</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.title}</td>
                  <td>{c.company?.name || c.company || '-'}</td>
                  <td>{c.status}</td>
                  <td>${c.budget}</td>
                  <td>
                    <button style={{ backgroundColor: '#22c55e' }} disabled={c.status === 'approved' || actionLoading === c._id + "-approve"} onClick={() => handleApprove(c._id)}>
                      {actionLoading === c._id + "-approve" ? "Approving..." : "Approve"}
                    </button>
                  </td>
                  <td>
                    <button style={{ backgroundColor: '#f87171' }} disabled={c.status === 'rejected' || actionLoading === c._id + "-reject"} onClick={() => handleReject(c._id)}>
                      {actionLoading === c._id + "-reject" ? "Rejecting..." : "Reject"}
                    </button>
                  </td>
                  <td>
                    <button style={{ backgroundColor: '#6366f1' }} onClick={() => handleEdit(c._id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button style={{ backgroundColor: '#dc3545' }} disabled={actionLoading === c._id + "-delete"} onClick={() => handleDelete(c._id)}>
                      {actionLoading === c._id + "-delete" ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Admincampaigns; 