import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/logo.png";
import "./Navbar.css";

const CustomNavbar = () => {
  const [activeLink, setActiveLink] = useState("features");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "features",
        "process",
        "data",
        "pricing",
        "faq",
        "contact",
      ];
      let current = "";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 100) {
          current = id;
        }
      });
      if (current) setActiveLink(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home" className="brand">
          <img src={logo} alt="Logo" className="nav-logo" />
          AbsoluteAnalytics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-links" />
        <Navbar.Collapse id="nav-links">
          <Nav className="ms-auto align-items-center nav-links-wrapper">
            {["features", "process", "data", "pricing", "faq", "contact"].map(
              (link) => (
                <Nav.Link
                  key={link}
                  href={`#${link}`}
                  className={`nav-link-item ${
                    activeLink === link ? "active" : ""
                  }`}
                >
                  {link}
                </Nav.Link>
              )
            )}
            <Nav.Link href="#waitlist" className="join-btn">
              Get Early Access
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;




import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "./logo.png"; // replace with your actual logo path

const CustomNavbar = () => {
  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "rgba(10, 10, 10, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "1rem 0",
      }}
    >
      <Container>
        {/* Left Side Logo */}
        <Navbar.Brand
          href="#home"
          style={{
            color: "#ffffff",
            fontSize: "1.25rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", width: "40px", objectFit: "contain" }}
          />
          AbsoluteAnalytics
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          {/* Middle Menu with Rounded Background */}
          <div
            style={{
              backgroundColor: "rgba(20, 20, 20, 0.8)",
              borderRadius: "1rem",
              padding: "0.5rem 2rem",
              display: "flex",
              gap: "1rem",
            }}
          >
            {["features", "process", "data", "pricing", "FAQ", "contact"].map(
              (item) => (
                <Nav.Link
                  key={item}
                  href={`#${item}`}
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textTransform: "lowercase",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.75rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.border = "1px solid rgba(96,165,250,0.8)";
                    e.target.style.boxShadow = "0 0 10px rgba(96,165,250,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.border = "none";
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
              background: "rgba(20, 20, 20, 0.8)",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              padding: "0.6rem 1.5rem",
              borderRadius: "0.75rem",
              marginLeft: "1.5rem",
              color: "#ffffff",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.border = "1px solid rgba(96,165,250,0.8)";
              e.target.style.boxShadow = "0 0 10px rgba(96,165,250,0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.border = "1px solid rgba(96,165,250,0.3)";
              e.target.style.boxShadow = "none";
            }}
          >
            Get Early Access
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;





import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "./logo.png"; // your logo path

const HomePage = () => {
  return (
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
          background: "rgba(10, 10, 20, 0.5)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
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
                      e.target.style.background =
                        "rgba(96,165,250,0.1)";
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
                background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
                border: "none",
                padding: "0.6rem 1.5rem",
                borderRadius: "0.75rem",
                marginLeft: "1.5rem",
                color: "#ffffff",
                fontWeight: "500",
                letterSpacing: "0.5px",
                boxShadow: "0 0 12px rgba(96,165,250,0.5)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow =
                  "0 0 20px rgba(96,165,250,0.8)";
                e.target.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow =
                  "0 0 12px rgba(96,165,250,0.5)";
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
              fontWeight: "300",
              marginBottom: "1.5rem",
              background:
                "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(255,255,255,0.15)",
            }}
          >
            AbsoluteAnalytics
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "1.2rem",
            }}
          >
            The 8th sense of the market.
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
              href="#services"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
                padding: "1rem 2rem",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.border = "1px solid rgba(255,255,255,0.3)";
                e.target.style.boxShadow =
                  "0 0 15px rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                e.target.style.boxShadow = "none";
              }}
            >
              our services
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
                e.target.style.boxShadow =
                  "0 0 25px rgba(96,165,250,0.7)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow =
                  "0 0 20px rgba(96,165,250,0.4)";
                e.target.style.transform = "scale(1)";
              }}
            >
              wait-list →
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;

