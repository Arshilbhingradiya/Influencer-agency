import { useState, useEffect } from "react";
import "./st.css";
import { useAuth } from "../../store/auth";

function Companyprofile() {
  const { user } = useAuth();
  const defaultProfilePic = "https://ui-avatars.com/api/?name=" + (user?.fullname || "User");
  const defaultCoverPic = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(profileData));
    setIsEditing(false);
  };

  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, [profileData]);

  return (
    <div className="profile-container pro-modern">
      <div className="profile-cover pro-cover">
        <img
          src={defaultCoverPic}
          alt="Cover"
          className="cover-image pro-cover-img"
        />
        <label className="cover-edit-icon" title="Change cover photo">
          <span role="img" aria-label="edit">🖼️</span>
        </label>
      </div>
      <div className="profile-header pro-header">
        <div className="pro-profile-pic-wrapper">
          <img
            src={defaultProfilePic}
            alt="Profile"
            className="profile-image pro-profile-img"
          />
          <label className="profile-edit-icon" title="Change profile photo">
            <span role="img" aria-label="edit">📷</span>
          </label>
        </div>
        <div className="profile-details pro-details">
          <h1 className="profile-name pro-name">{profileData.fullname || user.username}</h1>
          <p className="profile-title pro-title">Company Data</p>
        </div>
        <button
          className="edit-button pro-edit-btn"
          onClick={() => setIsEditing(!isEditing)}
          type="button"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`profile-form pro-form ${isEditing ? "editing" : ""}`}
        autoComplete="off"
      >
        <div className="profile-section pro-section">
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
              autoComplete="off"
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
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
            />
          </div>
        </div>
        <div className="profile-section pro-section">
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
        <div className="profile-section pro-section">
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
          <div className="form-actions pro-actions">
            <button type="submit" className="save-button pro-save-btn">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Companyprofile;
