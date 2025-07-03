import { useEffect, useState } from "react";
import axios from "axios";
import "./css/service.css";

export default function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log("Attempting to fetch services..."); // Debug log
        const response = await axios.get("http://localhost:5000/api/data");
        console.log("Response received:", response.data); // Debug log
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError("Failed to fetch services. Please check if the server is running.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handlemore = () => {
    window.location.href = "/moreinfo";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <h1>Service Page</h1>
      <div>
        {services.length === 0 ? (
          <div>No services available</div>
        ) : (
          services.map((service, index) => (
            <div className="card a1" key={index}>
              <div className="card-body">
                <h5 className="card-title">Name: {service.name}</h5>
                <p className="card-text">Age: {service.age}</p>
                <p className="card-text">Gender: {service.gender}</p>
                <p className="card-text">Followers: {service.followers}</p>
                <p className="card-text">Bio: {service.bio}</p>
                <p className="card-text">Image: {service.image_url}</p>
                <button onClick={handlemore}>More Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
