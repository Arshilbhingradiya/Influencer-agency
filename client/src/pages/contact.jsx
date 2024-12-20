import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./css/cotact.css";

export default function Contact() {
  const [contact, setcontact] = useState({
    username: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();
  const [userData, setuserData] = useState(true);

  const { user } = useAuth();
  if (userData && user) {
    setcontact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setuserData(false);
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setcontact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fixed typo here
    console.log("clicked");
    try {
      const response = await fetch("http://localhost:3000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setcontact({
          username: "",
          email: "",
          message: "",
        });
        navigate("/contact");
      }
      alert("Form Submitted Successfully");
    } catch (error) {
      alert("Error in submitting the form");
      console.log("contact ", error);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-5 backdrop-sepia-0">
        <main className="container">
          <div className="section-contact row justify-content-center">
            <div className="contact-form col-md-6 col-12 p-5 rounded-lg bg-gray-800 shadow-lg">
              <h1 className="main-heading mb-5 text-3xl font-semibold text-center">
                Contact Form
              </h1>
              <form className="col-section">
                <div className="mb-4 ">
                  <label htmlFor="username" className="block mb-2 ">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    id="username"
                    value={contact.username}
                    onChange={handleInput}
                    required
                    className="form-control bg-gray-700 text-white border-0 rounded-lg p-3"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    id="email"
                    value={contact.email}
                    onChange={handleInput}
                    required
                    className="form-control bg-gray-700 text-white border-0 rounded-lg p-3"
                    autoComplete="off"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Write your message"
                    id="message"
                    value={contact.message}
                    cols="30"
                    rows="5"
                    onChange={handleInput}
                    required
                    className="form-control bg-gray-700 text-white border-0 rounded-lg p-3"
                    autoComplete="off"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary w-100 py-2 text-lg"
                  >
                    Submit Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
