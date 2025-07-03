import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/auth";

export default function CampaigninfluDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [note, setNote] = useState("");
  const [applying, setApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const { user } = useAuth();
  const influencerId = user?._id || user?.id;

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/campaigns/${id}`);
        setCampaign(res.data);
        
        const userApplication = res.data.applications?.find(app => 
          app.influencerId === influencerId
        );
        setApplied(!!userApplication);
        if (userApplication) {
          setApplicationStatus(userApplication.status);
        }
      } catch (err) {
        console.error("Failed to fetch campaign", err);
      } finally {
        setLoading(false);
      }
    };

    if (influencerId) {
      fetchCampaign();
    }
  }, [id, influencerId]);

  const handleApply = async () => {
    if (!influencerId) {
      alert("Please log in to apply for campaigns");
      return;
    }

    if (!note.trim()) {
      alert("Please add a note to your application");
      return;
    }

    setApplying(true);
    try {
      await axios.post(`http://localhost:3000/api/campaigns/${id}/apply`, {
        influencerId: influencerId,
        note: note.trim()
      });
      setApplied(true);
      setApplicationStatus("pending");
      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Failed to apply", err);
      alert("Could not apply. Try again.");
    } finally {
      setApplying(false);
    }
  };

  const getStatusDisplay = () => {
    switch (applicationStatus) {
      case "approved":
        return (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium text-lg">🎉 Application Approved!</p>
            <p className="text-green-600 mt-1">Congratulations! The company has approved your application.</p>
            <p className="text-green-600 text-sm mt-2">They will contact you soon with further details.</p>
          </div>
        );
      case "rejected":
        return (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium text-lg">Application Status: Rejected</p>
            <p className="text-red-600 mt-1">Unfortunately, your application was not selected for this campaign.</p>
            <p className="text-red-600 text-sm mt-2">Don't worry, there are many other opportunities available!</p>
          </div>
        );
      case "pending":
        return (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700 font-medium text-lg">⏳ Application Under Review</p>
            <p className="text-yellow-600 mt-1">Your application has been submitted and is being reviewed by the company.</p>
            <p className="text-yellow-600 text-sm mt-2">You'll receive an update soon!</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!campaign) return <div className="p-4">Campaign not found.</div>;
  if (!influencerId) return <div className="p-4">Please log in to view campaign details.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
          <p className="text-blue-100 text-lg">{campaign.description}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">💰 Budget</h3>
                <p className="text-2xl font-bold text-green-600">${campaign.budget}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">📅 Deadline</h3>
                <p className="text-lg text-gray-700">{new Date(campaign.deadline).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🎯 Target Audience</h3>
                <p className="text-gray-700">{campaign.targetAudience}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">📱 Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {campaign.platforms?.map((platform, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {!applied ? (
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Apply for this Campaign</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Note *
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Tell us why you'd be perfect for this campaign... Include your experience, audience demographics, and creative ideas..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  rows="5"
                />
              </div>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 transition-colors"
                onClick={handleApply}
                disabled={applying}
              >
                {applying ? "Submitting Application..." : "Apply to Campaign"}
              </button>
            </div>
          ) : (
            getStatusDisplay()
          )}
        </div>
      </div>
    </div>
  );
}
