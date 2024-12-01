import "./css/Home.css";

export default function Home() {
  return (
    <>
      <div className="homepage">
        <header className="hero-section">
          <div className="overlay"></div>
          <div className="hero-content">
            <h1>Connect with Top Influencers</h1>
            <p>
              Grow your brand with the right influencers. We help you find the
              perfect fit for your marketing campaigns.
            </p>
            <button className="cta-btn">Get Started</button>
          </div>
        </header>

        <section className="about-us">
          <h2>About Us</h2>
          <p>
            We are a leading influencer marketing platform that connects brands
            with top influencers around the world. Our goal is to help brands
            grow by leveraging the power of influencer marketing to create
            lasting impact and engagement.
          </p>
        </section>

        <section className="features">
          <h2>Why Choose Us?</h2>
          <div className="feature-grid">
            <div className="feature">
              <img src="https://via.placeholder.com/100" alt="Feature 1" />
              <h3>Engage with Influencers</h3>
              <p>
                Collaborate with influencers who resonate with your brand’s
                values and reach your target audience.
              </p>
            </div>
            <div className="feature">
              <img src="https://via.placeholder.com/100" alt="Feature 2" />
              <h3>Data-Driven Insights</h3>
              <p>
                Track real-time campaign performance with in-depth data insights
                and analytics.
              </p>
            </div>
            <div className="feature">
              <img src="https://via.placeholder.com/100" alt="Feature 3" />
              <h3>Diverse Influencers</h3>
              <p>
                Access a wide range of influencers from various niches and
                regions to fit your campaign goals.
              </p>
            </div>
            <div className="feature">
              <img src="https://via.placeholder.com/100" alt="Feature 4" />
              <h3>Trusted Partnerships</h3>
              <p>
                Build long-term relationships with influencers and ensure
                successful collaborations.
              </p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <p>
                Influencer Hub transformed our marketing approach. We saw a 40%
                increase in sales within the first quarter of partnering with
                their influencers.
              </p>
              <h4>- Sara, Marketing Director at XYZ Corp</h4>
            </div>
            <div className="testimonial">
              <p>
                Their platform makes it easy to find influencers that match our
                brands aesthetic. The results speak for themselves!
              </p>
              <h4>- John, CEO at FashionNova</h4>
            </div>
            <div className="testimonial">
              <p>
                Their data-driven insights helped us fine-tune our campaign,
                resulting in higher engagement and ROI.
              </p>
              <h4>- Emily, Brand Manager at TechWear</h4>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Elevate Your Brand?</h2>
          <p>
            Join hundreds of other brands that have experienced unparalleled
            growth with Influencer Hub.
          </p>
          <button className="cta-btn">Start Your Campaign</button>
        </section>

        <footer className="footer">
          <p>&copy; 2024 Influencer Hub. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
}
