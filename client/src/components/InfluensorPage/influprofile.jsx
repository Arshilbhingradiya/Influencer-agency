import { useState, useEffect } from "react";

import { useAuth } from "../../store/auth";

function Influprofile() {
  const { user } = useAuth();

  // Initialize state with data from localStorage (if available)
  const [profileData, setProfileData] = useState(() => {
    const savedProfileData = localStorage.getItem("profileData");
    return savedProfileData
      ? JSON.parse(savedProfileData)
      : {
          fullname: user?.fullname || "",
          email: user?.email || "",
          phone: "",
          aboutMe: "",
          instagramFollowers: "",
          posts: "",
          collaborations: "",
          address: "",
          pinCode: "",
        };
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Handle form submission and save profile data to localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(profileData));
    console.log("Updated profile data:", profileData);
    setIsEditing(false);
  };

  // Sync localStorage with updated profile data on each change
  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, [profileData]);

  return (
    <div className="profile-container">
      <div className="profile-cover">
        <img
          src="/path/to/cover-photo.jpg"
          alt="Cover"
          className="cover-image"
        />
      </div>

      <div className="profile-header">
        <img
          src="/path/to/profile-pic.jpg"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-details">
          <h1 className="profile-name">{user.username}</h1>
          <p className="profile-title">Influencer & Content Creator</p>
        </div>
        <button
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`profile-form ${isEditing ? "editing" : ""}`}
      >
        {/* Basic Information Section */}
        <div className="profile-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={profileData.fullname}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="user">Phone Number</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pinCode">Pin Code</label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={profileData.pinCode}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* About Me Section */}
        <div className="profile-section">
          <h2>About Me</h2>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={profileData.aboutMe}
            onChange={handleChange}
            rows="4"
            disabled={!isEditing}
          ></textarea>
        </div>

        {/* Social Media & Contact Section */}
        <div className="profile-section">
          <h2>Social Media & Contact</h2>
          <div className="form-group">
            <label htmlFor="instagramFollowers">Instagram Followers</label>
            <input
              type="text"
              id="instagramFollowers"
              name="instagramFollowers"
              value={profileData.instagramFollowers}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="posts">Posts</label>
            <input
              type="text"
              id="posts"
              name="posts"
              value={profileData.posts}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="collaborations">Collaborations</label>
            <input
              type="text"
              id="collaborations"
              name="collaborations"
              value={profileData.collaborations}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Influprofile;
