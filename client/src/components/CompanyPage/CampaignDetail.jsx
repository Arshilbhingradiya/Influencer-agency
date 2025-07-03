import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/campaigns/${id}`);
        setCampaign(res.data);
      } catch (err) {
        console.error("Error fetching campaign:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/api/campaigns/${id}`);
      alert("Campaign deleted successfully.");
      navigate("/campaigns");
    } catch (error) {
      alert("Failed to delete campaign.");
    }
  };

  const handleApplicationStatus = async (applicationId, newStatus) => {
    console.log("Updating application status:", { applicationId, newStatus });
    
    if (!applicationId) {
      alert("Error: Application ID not found. Please refresh the page and try again.");
      return;
    }

    setUpdating({ ...updating, [applicationId]: true });
    try {
      const response = await axios.put(`http://localhost:3000/api/campaigns/${id}/applications/${applicationId}`, {
        status: newStatus
      });
      
      console.log("Status update response:", response.data);
      
      // Update local state
      setCampaign(prev => ({
        ...prev,
        applications: prev.applications.map(app => 
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      }));
      
      alert(`Application ${newStatus} successfully!`);
    } catch (error) {
      console.error("Error updating application status:", error);
      console.error("Error response:", error.response?.data);
      alert(`Failed to update application status: ${error.response?.data?.message || error.message}`);
    } finally {
      setUpdating({ ...updating, [applicationId]: false });
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!campaign) return <div className="text-center mt-10">Campaign not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-2">{campaign.title}</h1>
      <p className="text-gray-600 mb-4">{campaign.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 text-sm">
          <p><strong>Budget:</strong> ${campaign.budget}</p>
          <p><strong>Status:</strong> {campaign.status}</p>
          <p><strong>Target Audience:</strong> {campaign.targetAudience}</p>
          <p><strong>Platforms:</strong> {campaign.platforms.join(", ")}</p>
          <p><strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>
        </div>

        {campaign.brandFiles?.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Uploaded Files:</h3>
            <ul className="list-disc list-inside text-sm">
              {campaign.brandFiles.map((file, index) => (
                <li key={index}>
                  <a
                    href={`http://localhost:3000${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {file.split("/").pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Applications Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Applications ({campaign.applications?.length || 0})</h2>
        
        {!campaign.applications || campaign.applications.length === 0 ? (
          <p className="text-gray-500">No applications yet.</p>
        ) : (
          <div className="space-y-4">
            {campaign.applications.map((application, index) => {
              console.log("Rendering application:", { 
                index, 
                id: application._id, 
                status: application.status,
                influencerId: application.influencerId 
              });
              
              return (
                <div key={application._id || index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">Application #{index + 1}</h3>
                      <p className="text-sm text-gray-600">Influencer ID: {application.influencerId}</p>
                      <p className="text-sm text-gray-600">Application ID: {application._id || 'No ID'}</p>
                      <p className="text-sm text-gray-600">Applied: {new Date(application.createdAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        application.status === "approved" ? "bg-green-100 text-green-800" :
                        application.status === "rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {application.status || "pending"}
                      </span>
                    </div>
                  </div>
                  
                  {application.note && (
                    <div className="mb-3">
                      <p className="text-sm font-medium">Note:</p>
                      <p className="text-sm text-gray-700 bg-white p-2 rounded border">{application.note}</p>
                    </div>
                  )}
                  
                  {(application.status === "pending" || !application.status) && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApplicationStatus(application._id, "approved")}
                        disabled={updating[application._id] || !application._id}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                      >
                        {updating[application._id] ? "Updating..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleApplicationStatus(application._id, "rejected")}
                        disabled={updating[application._id] || !application._id}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                      >
                        {updating[application._id] ? "Updating..." : "Reject"}
                      </button>
                    </div>
                  )}
                  
                  {!application._id && (
                    <p className="text-xs text-red-600 mt-2">
                      ⚠️ Application ID missing - buttons may not work properly
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate(`/campaigns/edit/${campaign._id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
