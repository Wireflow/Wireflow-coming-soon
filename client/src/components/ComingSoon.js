import React, { useState } from "react";
import "./ComingSoon.css";
import axios from "axios";

import lettermark from "../assets/Lettermark.png";
import logo from "../assets/logo-icon.png";
import { BsLinkedin, BsTwitter, BsGithub, BsInstagram } from "react-icons/bs";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/", {
        email,
      })
      .then((response) => {
        console.log("Response:", response.data);
        setIsSubmitted(true);
        setError(null);
      })
      .catch((error) => {
        setError("Invalid email, please try again");
      });
    setEmail("");
  };

  return (
    <div className="container">
      <header>
        <div className="logos">
          <img src={lettermark} alt="" />
          <img src={logo} alt="" />
        </div>
      </header>

      <div className="content-container">
        <div className="titles">
          <p>COMING SOON</p>
          <h1>DISCOVER A WORLD OF POSSIBILITIES</h1>
        </div>
        <div className="description">
          <p>
            Exciting updates coming soon! Be the first to know when we launch by
            signing up for our newsletter.
          </p>
        </div>
        <div className="newletter">
          {isSubmitted ? (
            <p className="success-message">Thank you for subscribing!</p>
          ) : (
            <>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                />
                <button type="submit">SUBSCRIBE</button>
              </form>
            </>
          )}
        </div>
      </div>
      <footer>
        <div className="socials">
          <div className="socials-wrapper">
            <a href="https://twitter.com/wireflowtech">
              <BsTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/wireflowtech/">
              <BsInstagram size={24} />
            </a>
            <a href="https://www.instagram.com/wireflowtech/">
              <BsLinkedin size={24} />
            </a>
          </div>
          <p>© Copyrights WIREFLOW | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
