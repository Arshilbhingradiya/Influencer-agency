import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/campaigns");
        setCampaigns(res.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleStatusChange = async (campaignId, newStatus) => {
    setUpdating({ ...updating, [campaignId]: true });
    try {
      await axios.put(`http://localhost:3000/api/campaigns/${campaignId}`, {
        status: newStatus
      });
      
      // Update the local state
      setCampaigns(campaigns.map(campaign => 
        campaign._id === campaignId 
          ? { ...campaign, status: newStatus }
          : campaign
      ));
      
      alert(`Campaign status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating campaign status:", err);
      alert("Failed to update campaign status");
    } finally {
      setUpdating({ ...updating, [campaignId]: false });
    }
  };

  if (loading) return <div className="text-center mt-10">Loading campaigns...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Campaign List</h1>
      {campaigns.length === 0 ? (
        <div>No campaigns found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white shadow rounded-lg p-4 border hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{campaign.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{campaign.description?.slice(0, 100)}...</p>
              <p className="text-sm"><strong>Budget:</strong> ${campaign.budget}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <strong>Status:</strong>
                <select
                  value={campaign.status}
                  onChange={(e) => handleStatusChange(campaign._id, e.target.value)}
                  disabled={updating[campaign._id]}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
                {updating[campaign._id] && <span className="text-xs text-gray-500">Updating...</span>}
              </div>
              
              <p className="text-sm"><strong>Platforms:</strong> {campaign.platforms.join(", ")}</p>
              <p className="text-xs text-gray-500">Deadline: {new Date(campaign.deadline).toLocaleDateString()}</p>
              <Link
                to={`/campaigns/${campaign._id}`}
                className="inline-block mt-3 text-blue-600 hover:underline text-sm"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
