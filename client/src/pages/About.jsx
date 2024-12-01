import { useAuth } from "../store/auth";
import "./AboutUs.css";

const AboutUs = () => {
  const { user } = useAuth();
  return (
    <div className="about-us-container">
      <section className="hero-section text-center">
        <div className="user">
          <p>Hi , {user.username}</p>
        </div>
        <div className="container">
          <h1 className="hero-title">About Our Influencer Agency</h1>

          <p className="hero-subtitle">
            Connecting brands with top influencers for impactful marketing
            campaigns.
          </p>
        </div>
      </section>

      <section className="mission-section py-5">
        <div className="container">
          <h2 className="section-title text-center">Our Mission</h2>
          <p className="text-center">
            We aim to bridge the gap between brands and influencers to create
            unique, engaging, and effective marketing strategies. Our mission is
            to provide a platform that simplifies collaborations, maximizes
            reach, and delivers real results.
          </p>
        </div>
      </section>

      <section className="values-section py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center">Our Core Values</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="value-box">
                <h4>Authenticity</h4>
                <p>We believe in real partnerships with genuine influencers.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-box">
                <h4>Innovation</h4>
                <p>
                  We embrace creativity and new ideas in marketing strategies.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-box">
                <h4>Collaboration</h4>
                <p>
                  We foster a collaborative environment for influencers and
                  brands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section py-5">
        <div className="container">
          <h2 className="section-title text-center">Meet Our Team</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="team-member">
                <img
                  src="../../public/download.jpg"
                  alt="Team Member"
                  className="img-fluid rounded-circle"
                />
                <h4>Jane Doe</h4>
                <p>CEO & Founder</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-member">
                <img
                  src="../../public/download.jpg"
                  alt="Team Member"
                  className="img-fluid rounded-circle"
                />
                <h4>John Smith</h4>
                <p>Head of Partnerships</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-member">
                <img
                  src="../../public/download.jpg"
                  alt="Team Member"
                  className="img-fluid rounded-circle"
                />
                <h4>Susan Lee</h4>
                <p>Marketing Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center">What Our Clients Say</h2>
          <div className="row text-center">
            <div className="col-md-6">
              <blockquote className="blockquote">
                <p className="mb-0">
                  “This agency has helped us scale our brand through influencer
                  partnerships, and the results have been phenomenal.”
                </p>
                <footer className="blockquote-footer">Brand X</footer>
              </blockquote>
            </div>
            <div className="col-md-6">
              <blockquote className="blockquote">
                <p className="mb-0">
                  “A fantastic platform to collaborate with top influencers.
                  Weve seen great engagement from our campaigns.”
                </p>
                <footer className="blockquote-footer">Company Y</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 Influencer Hub. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
