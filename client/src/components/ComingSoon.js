import "./ComingSoon.css";
import { useState } from "react";
import axios from "axios";

import lettermark from "../assets/Lettermark.png";
import logo from "../assets/logo-icon.png";
import background from "../assets/background.png";
import {
  BsLinkedin,
  BsTwitter,
  BsGithub,
  BsInstagram,
  BsGit,
} from "react-icons/bs";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null); // New state for error handling

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/", { email })
      .then((response) => {
        console.log(response.data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred. Please try again."); // Set error message
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
      <body>
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
              {error && <p className="error-message">Something went wrong!</p>}
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
      </body>
      <footer>
        <div className="socials">
          <div className="socials-wrapper">
            <BsTwitter size={24} />
            <BsInstagram size={24} />
            <BsLinkedin size={24} />
            <BsGithub size={24} />
          </div>
          <p>© Copyrights WIREFLOW | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;