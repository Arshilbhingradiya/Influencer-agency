import { useState } from "react";

function Application() {
  // State to hold all product details
  const [products, setProducts] = useState([]);
  const [user, setuser] = useState({
    name: "",
    age: "",
    bio: "",
    gender: "",
    followers: "",
    image_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/influencer/influencerdata`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const res_data = await response.json();
      console.log("influ data", res_data);

      // Add the new details to the products state
      setProducts([...products, user]);

      // Reset the formf
      setuser({
        name: "",
        age: "",
        followers: "",
        gender: "",
        bio: "",
        image_url: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //  removing a product
  const handleProductDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="container">
      <div className="product-form-container">
        <h2>Add Influencer Details</h2>
        <form onSubmit={handleProductSubmit}>
          <div className="form-group">
            <label>Influencer Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={user.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Bio:</label>
            <input
              type="text"
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Followers:</label>
            <input
              type="text"
              name="followers"
              value={user.followers}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="image_url"
              value={user.image_url}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="add-button">
            Add Details
          </button>
        </form>
      </div>

      {/* Product List Section */}
      <div className="product-list-container">
        <h2>Personal Info</h2>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={product.imageUrl || "/path/to/default-image.jpg"}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>
                  <strong>Age:</strong> {product.age}
                </p>
                <p>
                  <strong>Gender:</strong> {product.gender}
                </p>
                <p>
                  <strong>Bio:</strong> {product.bio}
                </p>
                <p>
                  <strong>Followers:</strong> {product.followers}
                </p>

                <button
                  onClick={() => handleProductDelete(index)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No details added yet. Add some details to get started!</p>
        )}
      </div>
    </div>
  );
}

export default Application;
