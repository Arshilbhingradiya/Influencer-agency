import { useState, useEffect } from "react";
import "./product.css";

function ProductPage() {
  // State to hold all product details
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    companyname: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle form submission for adding new products
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/company/companydata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(products),
        }
      );
      const res_data = await response.json();
      console.log("company data", res_data);
      setProducts([...products, newProduct]);
      setNewProduct({
        companyname: "",
        title: "",
        description: "",
        imageUrl: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle removing a product
  const handleProductDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="container">
      {/* Form Section */}
      <div className="product-form-container">
        <h2>Add a New Product</h2>
        <form onSubmit={handleProductSubmit}>
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyname"
              value={newProduct.companyname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Title:</label>
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Description:</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="add-button">
            Add Product
          </button>
        </form>
      </div>

      {/* Product List Section */}
      <div className="product-list-container">
        <h2>Product List</h2>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={product.imageUrl || "/path/to/default-image.jpg"}
                alt={product.title}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>Price:</strong> ${product.price}
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
          <p>No products added yet. Add a product to get started!</p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
