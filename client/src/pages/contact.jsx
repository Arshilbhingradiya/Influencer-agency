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
    e.preventDefault();
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
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-100 to-purple-200">
      <div
        className="contact-card-pro h-screen w-full md:w-2/5 max-w-lg bg-white rounded-3xl shadow-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-400 to-blue-400 opacity-20 rounded-full z-0 animate-pulse"></div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center tracking-tight relative z-10">
          Contact Us
        </h1>
        <form className="space-y-4 relative z-10" autoComplete="off">
          <div>
            <label htmlFor="username" className="block text-base md:text-lg font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={contact.username}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base md:text-lg font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={contact.email}
              onChange={handleInput}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-base md:text-lg font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Write your message"
              value={contact.message}
              onChange={handleInput}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-teal-500 transition text-base md:text-lg mt-1"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
