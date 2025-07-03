import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/auth";

export default function InfluProfile() {
  const { user, authorizationtoken } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    platforms: "",
    niche: "",
    followers: "",
    profilePicture: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Use actual logged-in user ID
  const influencerId = user?._id;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!influencerId) {
        setLoading(false);
        setError("Please log in to view your profile.");
        return;
      }

      try {
        setError("");
        const res = await axios.get(`http://localhost:3000/api/influencer/profile/${influencerId}`, {
          headers: {
            Authorization: authorizationtoken
          }
        });
        
        if (res.status === 200) {
          // Convert platforms array to string for form input
          const profileData = {
            ...res.data,
            platforms: Array.isArray(res.data.platforms) ? res.data.platforms.join(', ') : res.data.platforms || ""
          };
          setProfile(profileData);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          console.log("No profile found. Ready to create.");
          setIsEditing(true);
        } else {
          console.error("Error fetching profile", err);
          setError("Failed to load profile. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [influencerId, authorizationtoken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!influencerId) {
      setError("Please log in to save your profile.");
      return;
    }

    // Validate required fields
    if (!profile.name.trim()) {
      setError("Name is required.");
      return;
    }

    // Validate followers is a number
    if (profile.followers && isNaN(parseInt(profile.followers))) {
      setError("Followers must be a valid number.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      // Prepare data for server
      const profileData = {
        userId: influencerId,
        name: profile.name.trim(),
        bio: profile.bio.trim(),
        platforms: profile.platforms.trim(),
        niche: profile.niche.trim(),
        followers: profile.followers ? parseInt(profile.followers) : 0,
        profilePicture: profile.profilePicture.trim(),
      };

      if (isEditing) {
        // Create new profile
        const res = await axios.post(`http://localhost:3000/api/influencer/profile`, profileData, {
          headers: {
            Authorization: authorizationtoken
          }
        });
        console.log("Profile created:", res.data);
        setSuccess("Profile created successfully!");
        setProfile({
          ...profile,
          ...res.data,
          platforms: Array.isArray(res.data.platforms) ? res.data.platforms.join(', ') : res.data.platforms || ""
        });
      } else {
        // Update existing profile
        const res = await axios.put(`http://localhost:3000/api/influencer/profile/${influencerId}`, profileData, {
          headers: {
            Authorization: authorizationtoken
          }
        });
        console.log("Profile updated:", res.data);
        setSuccess("Profile updated successfully!");
        setProfile({
          ...profile,
          ...res.data,
          platforms: Array.isArray(res.data.platforms) ? res.data.platforms.join(', ') : res.data.platforms || ""
        });
      }
      setIsEditing(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error saving profile", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Failed to save profile. Please try again.";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!influencerId) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
        <div className="text-center text-red-600">
          <p>{error || "Please log in to view your profile."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Influencer Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {!isEditing && profile.name && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Name</h3>
              <p className="text-gray-900">{profile.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Niche</h3>
              <p className="text-gray-900">{profile.niche || "Not specified"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Followers</h3>
              <p className="text-gray-900">{profile.followers ? profile.followers.toLocaleString() : "Not specified"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Platforms</h3>
              <p className="text-gray-900">{profile.platforms || "Not specified"}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-700">Bio</h3>
              <p className="text-gray-900">{profile.bio || "No bio provided"}</p>
            </div>
            {profile.profilePicture && (
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-700">Profile Picture</h3>
                <img 
                  src={profile.profilePicture} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover mt-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span style={{display: 'none'}} className="text-sm text-gray-500">Image not available</span>
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input 
            type="text" 
            name="name" 
            value={profile.name} 
            onChange={handleChange} 
            placeholder="Your name" 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            required
            disabled={!isEditing}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea 
            name="bio" 
            value={profile.bio} 
            onChange={handleChange} 
            placeholder="Tell us about yourself..." 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            disabled={!isEditing}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Platforms</label>
          <input 
            type="text" 
            name="platforms" 
            value={profile.platforms} 
            onChange={handleChange} 
            placeholder="Instagram, TikTok, YouTube (comma-separated)" 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            disabled={!isEditing}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
          <input 
            type="text" 
            name="niche" 
            value={profile.niche} 
            onChange={handleChange} 
            placeholder="Fashion, Tech, Fitness, etc." 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            disabled={!isEditing}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
          <input 
            type="number" 
            name="followers" 
            value={profile.followers} 
            onChange={handleChange} 
            placeholder="Total followers across platforms" 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            min="0"
            disabled={!isEditing}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
          <input 
            type="url" 
            name="profilePicture" 
            value={profile.profilePicture} 
            onChange={handleChange} 
            placeholder="https://example.com/your-photo.jpg" 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            disabled={!isEditing}
          />
        </div>
        
        {isEditing && (
          <div className="flex gap-3">
            <button 
              type="submit" 
              disabled={saving}
              className={`flex-1 px-4 py-2 rounded font-medium ${
                saving 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              {saving ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </span>
              ) : (
                profile.name ? "Update Profile" : "Create Profile"
              )}
            </button>
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
} 