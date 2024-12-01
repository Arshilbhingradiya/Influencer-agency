import { useState, useEffect } from "react";

function Infludashboard() {
  // State to hold influencer data
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Fetch data from the backend API
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/influencers"); // Replace with your API URL
        const data = await response.json();
        setInfluencers(data);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching influencer data:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchInfluencers();
  }, []); // Empty dependency array ensures this runs only once

  // Display the dashboard
  return (
    <div className="container">
      <h2>Influencer Dashboard</h2>

      {/* Loading state */}
      {loading ? <p>Loading...</p> : null}

      {/* Display the list of influencers */}
      <div className="influencer-list-container">
        {influencers.length > 0 ? (
          influencers.map((influencer, index) => (
            <div key={index} className="influencer-card">
              <img
                src={influencer.imageUrl || "/path/to/default-image.jpg"}
                alt={influencer.name}
                className="influencer-image"
              />
              <div className="influencer-details">
                <h3>{influencer.name}</h3>
                <p>
                  <strong>Age:</strong> {influencer.age}
                </p>
                <p>
                  <strong>Gender:</strong> {influencer.gender}
                </p>
                <p>
                  <strong>Bio:</strong> {influencer.bio}
                </p>
                <p>
                  <strong>Followers:</strong> {influencer.followers}
                </p>
                <p>
                  <strong>Location:</strong> {influencer.location}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No influencers found.</p>
        )}
      </div>
    </div>
  );
}

export default Infludashboard;
