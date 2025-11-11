import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Navbar,
  Nav,
} from "react-bootstrap";
import logo from "../assests/logo.png";
import { motion } from "framer-motion";

// Animation Variants for feture acrds
const leftVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const rightVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const bottomVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Animation Variants for feature cards

function Home() {
  // State for FAQ section
  const [activeFAQ, setActiveFAQ] = useState(null);

  // State for billing toggle
  const [billing, setBilling] = useState("monthly");

  // State for contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle FAQ toggle
  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Thank you for your message!");
  //   setFormData({ name: "", email: "", phone: "", message: "" });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message); // Shows: \"Thank you for your message! We will get back to you soon.\"
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not connect to server. Please try again later.");
    }
  };
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const response = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Successfully subscribed to newsletter!");
        e.target.reset();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not connect to server. Please try again later.");
    }
  };

  return (
    // <div style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}>
    <>
      {/* ========== NAVIGATION BAR ========== */}
      <Navbar
        expand="lg"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          backdropFilter: "blur(15px)",
          // background: "rgba(10, 10, 20, 0.5)",
          // borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: "0.75rem 0",
        }}
      >
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left Logo */}
          <Navbar.Brand
            href="#home"
            style={{
              color: "#ffffff",
              fontSize: "1.4rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "40px",
                width: "40px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 6px rgba(96,165,250,0.5))",
              }}
            />
            AbsoluteAnalytics
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
            style={{ flexGrow: 1 }}
          >
            {/* Center Menu */}
            <div
              style={{
                display: "flex",
                gap: "1.2rem",
                margin: "0 auto",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1rem",
                padding: "0.5rem 1.5rem",
                backdropFilter: "blur(10px)",
              }}
            >
              {["features", "process", "data", "pricing", "FAQ", "contact"].map(
                (item) => (
                  <Nav.Link
                    key={item}
                    href={`#${item}`}
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      textTransform: "capitalize",
                      fontSize: "0.95rem",
                      padding: "0.4rem 0.9rem",
                      borderRadius: "0.75rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#60a5fa";
                      e.target.style.background = "rgba(9, 10, 10, 0.1)";
                      e.target.style.boxShadow =
                        "0 0 10px rgba(96,165,250,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "rgba(255,255,255,0.75)";
                      e.target.style.background = "transparent";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {item}
                  </Nav.Link>
                )
              )}
            </div>

            {/* Right Side Button */}
            <Nav.Link
              href="#waitlist"
              style={{
                // background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
                border: "none",
                padding: "0.6rem 1.5rem",
                borderRadius: "0.75rem",
                marginLeft: "1.5rem",
                color: "#ffffff",
                fontWeight: "500",
                letterSpacing: "0.5px",
                // boxShadow: "0 0 12px rgba(96,165,250,0.5)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 0 20px rgba(96,165,250,0.8)";
                e.target.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "0 0 12px rgba(96,165,250,0.5)";
                e.target.style.transform = "scale(1)";
              }}
            >
              Join Us
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ========== HERO SECTION ========== */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          background:
            "radial-gradient(circle at 50% 20%, rgba(37,99,235,0.2), transparent 70%), radial-gradient(circle at 80% 80%, rgba(14,165,233,0.15), transparent 70%), linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
          color: "#ffffff",
          padding: "0 1rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Light Glow Behind */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(96,165,250,0.25), transparent 70%)",
            transform: "translate(-50%, -50%)",
            filter: "blur(100px)",
            zIndex: 0,
          }}
        ></div>

        <Container style={{ position: "relative", zIndex: 2 }}>
          <h1
            style={{
              fontSize: "5rem",
              fontWeight: "900",
              background: "linear-gradient(90deg, #ffffff 0%, #70befa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              letterSpacing: "-1px",
              marginBottom: "1.2 rem",
            }}
          >
            AbsoluteAnalytics
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "1.rem",
              maxWidth: "800",
            }}
          >
            {/* The 8th sense of the market. */}
            Real-time alerts and institutional-grade research for Nifty, Gold,
            Crude, and select equities. Minimal noise. Maximum edge.
          </p>
          <p
            style={{
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "3rem",
              fontStyle: "italic",
            }}
          >
            “We don’t chase the market, we decode it.”
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              href="#pricing"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
                padding: "1rem 1rem",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.border = "1px solid rgba(57, 90, 125, 0.3)";
                e.target.style.boxShadow = "0 0 15px rgba(41, 82, 159, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                e.target.style.boxShadow = "none";
              }}
            >
              Subscribe Now-2,999/mo
            </Button>
            <Button
              href="#waitlist"
              style={{
                background:
                  "linear-gradient(90deg, rgba(37,99,235,0.8), rgba(96,165,250,0.6))",
                border: "none",
                color: "#ffffff",
                padding: "1rem 2rem",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                fontWeight: "500",
                boxShadow: "0 0 20px rgba(96,165,250,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 0 25px rgba(96,165,250,0.7)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "0 0 20px rgba(96,165,250,0.4)";
                e.target.style.transform = "scale(1)";
              }}
            >
              View Performance →
            </Button>
          </div>
        </Container>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section
        id="features"
        style={{ padding: "120px 0", background: "#0a0a0a" }}
      >
        <Container>
          <h2
            style={{
              // fontSize: "clamp(3rem, 6vw, 5rem)",
              // fontWeight: "300",
              // marginBottom: "80px",
              // color: "#fff",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: "500",
              background: "linear-gradient(90deg, #ffffff 0%, #70befa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              letterSpacing: "-1px",
              marginBottom: "1.2 rem",
            }}
          >
            {/* Features */}
            Built for Serious Traders
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.65)",
              maxWidth: "1100px",
              margin: "4 auto",
              textAlign: "center",
              wordSpacing: "2px",
              letterSpacing: "0.3px",
            }}
          >
            Algorithmic precision plus trader intuition. Liquidity decoys,
            volume traps, and directional bias — mapped across timeframes.
          </p>

          {/* Top Row - 2 Cards */}
          <Row className="mb-4">
            {/* Card 1 - Left slide */}
            <Col lg={6} className="mb-4">
              <motion.div
                variants={leftVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <img
                  src="https://framerusercontent.com/images/hlhnOIF0gp68ggTNF3O9zra4.jpg"
                  alt="Collaborative Charts"
                  style={{ width: "100%", display: "block" }}
                />
                <div style={{ padding: "2.5rem" }}>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: "500",
                      marginBottom: "1rem",
                    }}
                  >
                    Collaborative Charts
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.7",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    Trade smarter—together. With AbsoluteAnalytics's
                    Collaborative Chart, you and your team can analyze markets,
                    draw insights, and mark levels on the same chart in real
                    time.
                  </p>
                </div>
              </motion.div>
            </Col>

            {/* Card 2 - Right slide */}
            <Col lg={6} className="mb-4">
              <motion.div
                variants={rightVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <img
                  src="https://framerusercontent.com/images/6XgUPcUOPr9j7eqAf1t4XK1Bq4.png"
                  alt="Messenger Built for Markets"
                  style={{ width: "100%", display: "block" }}
                />
                <div style={{ padding: "2.5rem" }}>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: "500",
                      marginBottom: "1rem",
                    }}
                  >
                    Messenger Built for Markets
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.7",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    Create discussions and group chats, pin insights, and share
                    charts directly with edit access. Launch screen-sharing
                    calls or collaborate live on charts in real time.
                  </p>
                </div>
              </motion.div>
            </Col>
          </Row>

          {/* Bottom Row - 3 Cards */}
          <Row>
            {/* Card 3 - Left */}
            <Col lg={4} md={6} className="mb-4">
              <motion.div
                variants={leftVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <img
                  src="https://framerusercontent.com/images/CbpCvuIAKt85OeUVb87aBI6MBM.jpg"
                  alt="Watchlist"
                  style={{ width: "100%", display: "block" }}
                />
                <div style={{ padding: "2.5rem" }}>
                  <h3
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: "500",
                      marginBottom: "1rem",
                    }}
                  >
                    Watchlist
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.7",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    Create custom watchlists, track price movements across
                    multiple timeframes, spot top movers, and access key
                    financials, seasonality, and news.
                  </p>
                </div>
              </motion.div>
            </Col>

            {/* Card 4 - Middle (Fade up) */}
            <Col lg={4} md={6} className="mb-4">
              <motion.div
                variants={bottomVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <img
                  src="https://framerusercontent.com/images/ZjdIuDEw8a0WuFB5K40HlvKmkw.jpg"
                  alt="Portfolio Tracker"
                  style={{ width: "100%", display: "block" }}
                />
                <div style={{ padding: "2.5rem" }}>
                  <h3
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: "500",
                      marginBottom: "1rem",
                    }}
                  >
                    Portfolio Tracker
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.7",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    Add your own portfolios, monitor real-time performance, and
                    see how macro events impact every position.
                  </p>
                </div>
              </motion.div>
            </Col>

            {/* Card 5 - Right */}
            <Col lg={4} md={6} className="mb-4">
              <motion.div
                variants={rightVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <img
                  src="https://framerusercontent.com/images/zo1QPUjri1VueZzMywVFLWLx51M.jpg"
                  alt="Calendar"
                  style={{ width: "100%", display: "block" }}
                />
                <div style={{ padding: "2.5rem" }}>
                  <h3
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: "500",
                      marginBottom: "1rem",
                    }}
                  >
                    Calendar
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.7",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    Stay ahead with 900+ economic and earnings reports across
                    45+ countries. Filter by date, country, or category.
                  </p>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========== PROCESS SECTION (Where to start?) ========== */}
      <section
        id="process"
        style={{ padding: "120px 0", background: "#0a0a0a" }}
      >
        <Container>
          <h2
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: "300",
              marginBottom: "80px",
            }}
          >
            Where to start?
          </h2>

          <Row>
            {/* Step 1 */}
            <Col lg={4} md={6} className="mb-4">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "rgba(96, 165, 250, 0.8)",
                    marginBottom: "1.5rem",
                  }}
                >
                  01
                </div>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Download
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.7",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Currently available exclusively on iOS. Web and Android
                  versions are already in development and will be launching
                  soon.
                </p>
              </motion.div>
            </Col>

            {/* Step 2 */}
            <Col lg={4} md={6} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "rgba(96, 165, 250, 0.8)",
                    marginBottom: "1.5rem",
                  }}
                >
                  02
                </div>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Start Using
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.7",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Start using AbsoluteAnalytics and explore a seamless market
                  analysis experience.
                </p>
              </motion.div>
            </Col>

            {/* Step 3 */}
            <Col lg={4} md={6} className="mb-4">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "rgba(96, 165, 250, 0.8)",
                    marginBottom: "1.5rem",
                  }}
                >
                  03
                </div>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Create Account
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.7",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Create an account to save your watchlists, portfolios, chart
                  edits, and preferences.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========== DATA SECTION ========== */}
      <section
        id="data"
        style={{
          padding: "120px 0",
          background: "#0a0a0a",
          textAlign: "center",
        }}
      >
        <Container>
          <h2
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: "300",
              marginBottom: "80px",
            }}
          >
            Our Data Universe
          </h2>

          <Row>
            {/* Data Card 1 */}
            <Col lg={3} md={6} className="mb-4">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem 2rem",
                  height: "100%",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Assets & Instruments
                </h3>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: "300",
                    marginBottom: "1.5rem",
                    background:
                      "linear-gradient(180deg, #ffffff 0%, rgba(96, 165, 250, 0.9) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  60k+
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Access thousands of global assets, securities, and
                  instruments.
                </p>
              </div>
            </Col>

            {/* Data Card 2 */}
            <Col lg={3} md={6} className="mb-4">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem 2rem",
                  height: "100%",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Regression Models
                </h3>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: "300",
                    marginBottom: "1.5rem",
                    background:
                      "linear-gradient(180deg, #ffffff 0%, rgba(96, 165, 250, 0.9) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  43b+
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Our engine runs billions of models to uncover hidden
                  relationships.
                </p>
              </div>
            </Col>

            {/* Data Card 3 */}
            <Col lg={3} md={6} className="mb-4">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem 2rem",
                  height: "100%",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Macro Indicators
                </h3>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: "300",
                    marginBottom: "1.5rem",
                    background:
                      "linear-gradient(180deg, #ffffff 0%, rgba(96, 165, 250, 0.9) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  900+
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Track every key macroeconomic signal from over 45 countries.
                </p>
              </div>
            </Col>

            {/* Data Card 4 */}
            <Col lg={3} md={6} className="mb-4">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem 2rem",
                  height: "100%",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Historical Data
                </h3>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: "300",
                    marginBottom: "1.5rem",
                    background:
                      "linear-gradient(180deg, #ffffff 0%, rgba(96, 165, 250, 0.9) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  10y+
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Explore over a decade of structured historical data for
                  backtesting.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========== PRICING/SUBSCRIPTION SECTION ========== */}
      <section
        id="pricing"
        style={{
          padding: "120px 0",
          background: "#0a0a0a",
          textAlign: "center",
        }}
      >
        <Container>
          <h2
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: "300",
              marginBottom: "1rem",
            }}
          >
            Subscriptions
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: "2.5rem",
            }}
          >
            Three different subscriptions to match your needs.
          </p>

          {/* Billing Toggle */}
          <div
            style={{
              display: "inline-flex",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "0.75rem",
              padding: "0.25rem",
              marginBottom: "4rem",
            }}
          >
            <button
              onClick={() => setBilling("monthly")}
              style={{
                padding: "0.75rem 2rem",
                border:
                  billing === "monthly"
                    ? "1px solid rgba(96, 165, 250, 0.3)"
                    : "none",
                background:
                  billing === "monthly"
                    ? "rgba(96, 165, 250, 0.15)"
                    : "transparent",
                color: "#ffffff",
                fontSize: "1rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annually")}
              style={{
                padding: "0.75rem 2rem",
                border:
                  billing === "annually"
                    ? "1px solid rgba(96, 165, 250, 0.3)"
                    : "none",
                background:
                  billing === "annually"
                    ? "rgba(96, 165, 250, 0.15)"
                    : "transparent",
                color: "#ffffff",
                fontSize: "1rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              Annually
            </button>
          </div>

          <Row>
            {/* Basic Plan */}
            <Col lg={4} md={6} className="mb-4">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  height: "100%",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "1rem",
                  }}
                >
                  Basic
                </div>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "300",
                    marginBottom: "1rem",
                  }}
                >
                  FREE
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    marginBottom: "2rem",
                  }}
                >
                  For users exploring our core tools.
                </p>
                <Button
                  href="#waitlist"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.75rem",
                    marginBottom: "2rem",
                  }}
                >
                  Choose this plan
                </Button>
                {[
                  "Track up to 2 portfolios",
                  "Create 3 custom watchlists",
                  "Macro calendar for 15+ countries",
                  "Collaborative charts in view mode",
                  "Basic chat and sharing features",
                ].map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span style={{ color: "rgba(96, 165, 250, 0.8)" }}>✓</span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </Col>

            {/* Premium Plan */}
            <Col lg={4} md={6} className="mb-4">
              <div
                style={{
                  background: "rgba(96, 165, 250, 0.05)",
                  border: "1px solid rgba(96, 165, 250, 0.2)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  height: "100%",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    background: "rgba(96, 165, 250, 0.2)",
                    color: "rgba(96, 165, 250, 0.9)",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.8rem",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                  }}
                >
                  launch offer
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "1rem",
                  }}
                >
                  Premium
                </div>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "300",
                    marginBottom: "1rem",
                  }}
                >
                  FREE
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    marginBottom: "2rem",
                  }}
                >
                  Unlock deeper insights and analytics.
                </p>
                <Button
                  href="#waitlist"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background: "rgba(96, 165, 250, 0.15)",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                    borderRadius: "0.75rem",
                    marginBottom: "2rem",
                  }}
                >
                  Choose this plan
                </Button>
                {[
                  "Manage up to 10 portfolios",
                  "Unlimited watchlists",
                  "Full access to global macro calendar",
                  "Collaborate on charts in real time",
                  "Group chats and screen sharing",
                ].map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span style={{ color: "rgba(96, 165, 250, 0.8)" }}>✓</span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </Col>

            {/* Professional Plan */}
            <Col lg={4} md={6} className="mb-4">
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  height: "100%",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    background: "rgba(96, 165, 250, 0.2)",
                    color: "rgba(96, 165, 250, 0.9)",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.8rem",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                  }}
                >
                  launch offer
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "1rem",
                  }}
                >
                  Professional
                </div>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "300",
                    marginBottom: "1rem",
                  }}
                >
                  FREE
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    marginBottom: "2rem",
                  }}
                >
                  Full power ofAbsoluteAnalytics, unlocked.
                </p>
                <Button
                  href="#waitlist"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.75rem",
                    marginBottom: "2rem",
                  }}
                >
                  Choose this plan
                </Button>
                {[
                  "Unlimited portfolios access",
                  "Priority access to all data",
                  "Full collaboration suite",
                  "Private team workspaces",
                  "100+ automations for workflows",
                ].map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span style={{ color: "rgba(96, 165, 250, 0.8)" }}>✓</span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section id="FAQ" style={{ padding: "120px 0", background: "#0a0a0a" }}>
        <Container>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontWeight: "300",
                marginBottom: "1rem",
              }}
            >
              Answers
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              We've gone ahead and answered some of the questions you might
              have.
            </p>
          </div>

          <Row className="justify-content-center">
            <Col lg={10}>
              {/* FAQ 1 */}
              {[
                {
                  q: "What isAbsoluteAnalytics?",
                  a: " AbsoluteAnalytics is a comprehensive market analytics platform that provides real-time data, collaborative tools, and powerful insights for investors and traders. It combines market data, economic indicators, and collaborative features in one seamless platform.",
                },
                {
                  q: "Is this App Free?",
                  a: "Yes! We offer a free Basic plan that includes core features. We also have Premium and Professional plans with advanced features, currently available as a free launch offer.",
                },
                {
                  q: "Do we support live market data?",
                  a: "Yes,AbsoluteAnalytics provides live market data for thousands of global assets, securities, and instruments. You can track real-time price movements, access key financials, and stay updated with market changes.",
                },
                {
                  q: "Can I useAbsoluteAnalytics with a team?",
                  a: "Absolutely!AbsoluteAnalytics is built for collaboration. You can create team workspaces, share charts with edit access, collaborate on charts in real-time, and communicate through our built-in messenger.",
                },
                {
                  q: "Do I need to register to use the App?",
                  a: "Yes, registration is required to save your watchlists, portfolios, chart edits, and preferences. This ensures your data stays with you across all devices.",
                },
                {
                  q: "What kind of assets can I follow?",
                  a: "You can follow over 60,000+ global assets including stocks, indices, commodities, currencies, cryptocurrencies, and other securities from markets around the world.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  onClick={() => toggleFAQ(index)}
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "1rem",
                    marginBottom: "1rem",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1.75rem 2rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "500",
                        margin: 0,
                      }}
                    >
                      {faq.q}
                    </h3>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        color: "rgba(96, 165, 250, 0.8)",
                      }}
                    >
                      {activeFAQ === index ? "−" : "+"}
                    </span>
                  </div>
                  {activeFAQ === index && (
                    <div style={{ padding: "0 2rem 1.75rem" }}>
                      <p
                        style={{
                          fontSize: "1rem",
                          lineHeight: "1.7",
                          color: "rgba(255, 255, 255, 0.6)",
                          margin: 0,
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section
        id="contact"
        style={{ padding: "120px 0", background: "#0a0a0a" }}
      >
        <Container>
          <Row>
            <Col lg={5} className="mb-5">
              <h2
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: "300",
                  marginBottom: "3rem",
                }}
              >
                Contact Us
              </h2>

              <div style={{ marginBottom: "2.5rem" }}>
                <h4
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  OFFICE:
                </h4>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.7",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  Hyderabad
                  <br />
                  {/* Austin, TX 78731 */}
                  <br />
                  India
                </p>
              </div>

              <div style={{ marginBottom: "2.5rem" }}>
                <h4
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  EMAIL:
                </h4>
                <a
                  href="mailto: AbsoluteAnalytics@gmail.com"
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    textDecoration: "none",
                  }}
                >
                  AbsoluteAnalytics@gmail.com
                </a>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  PHONE:
                </h4>
                <a
                  href="tel:+17738864543"
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    textDecoration: "none",
                  }}
                >
                  +1 (773) 886 4543
                </a>
              </div>
            </Col>

            <Col lg={7}>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "1.5rem",
                  padding: "3rem",
                }}
              >
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "0.75rem",
                        padding: "0.875rem 1.25rem",
                        color: "#ffffff",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "0.75rem",
                        padding: "0.875rem 1.25rem",
                        color: "#ffffff",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Phone
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (123) 456-7890"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "0.75rem",
                        padding: "0.875rem 1.25rem",
                        color: "#ffffff",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message..."
                      required
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "0.75rem",
                        padding: "0.875rem 1.25rem",
                        color: "#ffffff",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label="By submitting this form, you agree to our Privacy Policy."
                      required
                      style={{ color: "rgba(255, 255, 255, 0.6)" }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "1rem",
                      background: "rgba(96, 165, 250, 0.15)",
                      border: "1px solid rgba(96, 165, 250, 0.3)",
                      borderRadius: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========== FOOTER / WAITLIST ========== */}
      <footer
        id="waitlist"
        style={{
          background: "#0a0a0a",
          padding: "80px 0 40px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Container>
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "300",
                marginBottom: "1rem",
                background:
                  "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Join Us
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "2.5rem",
              }}
            >
              Join the waitlist and be among the first to
              experienceAbsoluteAnalytics.
            </p>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1.125rem 2.5rem",
                background: "rgba(96, 165, 250, 0.15)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                color: "#ffffff",
                fontSize: "1.125rem",
                fontWeight: "600",
                borderRadius: "0.75rem",
                textDecoration: "none",
              }}
            >
              Join Us <span>→</span>
            </a>
          </div>

          <hr
            style={{
              border: "none",
              height: "1px",
              background: "rgba(255, 255, 255, 0.05)",
              margin: "60px 0",
            }}
          />

          <Row style={{ padding: "40px 0" }}>
            <Col lg={4} md={6} className="mb-4">
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <img
                  src={logo}
                  alt="Absolute Analytics Logo"
                  style={{
                    height: "50px",
                    width: "50px",
                    objectFit: "contain",
                  }}
                />
                AbsoluteAnalytics
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                No Signals. Just Real Analytics.
              </p>
            </Col>

            <Col lg={2} md={6} className="mb-4">
              <h4
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "rgba(255, 255, 255, 0.7)",
                  marginBottom: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                Product
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <a
                  href="#features"
                  style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  Features
                </a>
                <a
                  href="#process"
                  style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  Process
                </a>
                <a
                  href="#pricing"
                  style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  Pricing
                </a>
              </div>
            </Col>

            <Col lg={2} md={6} className="mb-4">
              <h4
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "rgba(255, 255, 255, 0.7)",
                  marginBottom: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                Company
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <a
                  href="#contact"
                  style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  Contact
                </a>
                <a
                  href="#faq"
                  style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  FAQ
                </a>
                <a
                  href="#data"
                  style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  Data
                </a>
              </div>
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <h4
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "rgba(255, 255, 255, 0.7)",
                  marginBottom: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                Stay Updated
              </h4>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  marginBottom: "1.25rem",
                }}
              >
                Subscribe to get the latest updates and news.
              </p>
              {/* <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: "0.875rem 1.25rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.75rem",
                    color: "#ffffff",
                  }}
                />
                <button
                  style={{
                    padding: "0.875rem 1.5rem",
                    background: "rgba(96, 165, 250, 0.15)",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                    color: "#ffffff",
                    fontSize: "1.25rem",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  →
                </button>
              </div> */}
              <form
                onSubmit={handleNewsletterSubmit}
                style={{ display: "flex", gap: "0.5rem" }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  style={{
                    flex: 1,
                    padding: "0.875rem 1.25rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.75rem",
                    color: "#ffffff",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "0.875rem 1.5rem",
                    background: "rgba(96, 165, 250, 0.15)",
                    border: "1px solid rgba(96, 165, 250, 0.3)",
                    color: "#ffffff",
                    fontSize: "1.25rem",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(96, 165, 250, 0.25)";
                    e.target.style.boxShadow =
                      "0 0 10px rgba(96, 165, 250, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(96, 165, 250, 0.15)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  →
                </button>
              </form>
            </Col>
          </Row>

          <div
            style={{
              padding: "30px 0 0",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: "0.9rem",
                margin: 0,
              }}
            >
              © 2025AbsoluteAnalytics. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Home;
