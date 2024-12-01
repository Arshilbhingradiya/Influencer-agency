import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./css/signup.css";

export default function Signup() {
  const [user, setuser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    // console.log(e);

    const name = e.target.name;
    const value = e.target.value;

    setuser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault;
    console.log(user);
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("res from server", res_data);

      if (response.ok) {
        storeTokenInLS(res_data.token);

        navigate("/");

        setuser({
          username: "",
          email: "",
          phone: "",
          password: "",
          role: "",
        });
      } else {
        alert("invlaid dta");
      }
      console.log("myname", response);
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />

                <form>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      id="username"
                      value={user.username}
                      onChange={handleInput}
                      required
                      autoComplete="off"
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="username">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      id="email"
                      value={user.email}
                      onChange={handleInput}
                      required
                      autoComplete="off"
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="username">phone no.</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="phone"
                      id="phone"
                      value={user.phone}
                      onChange={handleInput}
                      required
                      autoComplete="off"
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="username">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      value={user.password}
                      onChange={handleInput}
                      required
                      autoComplete="off"
                    ></input>
                  </div>

                  <div>
                    <label>Role</label>
                    <select
                      name="role"
                      value={user.role}
                      onChange={handleInput}
                    >
                      <option value="influencer">Influencer</option>
                      <option value="company">Company</option>
                    </select>
                  </div>
                  <div>
                    <button type="button" onClick={handleSubmit}>
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
