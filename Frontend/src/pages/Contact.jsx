import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import emailjs from "@emailjs/browser";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaHome,
  FaBolt
} from "react-icons/fa";

/* ---------- CONTACT INFO ---------- */

const contactInfo = [
  {
    icon: <FaEnvelope size={18} color="var(--t1)" />,
    label: "Email",
    value: "itspratikpok@gmail.com",
    href: "mailto:itspratikpok@gmail.com",
    bg: "var(--pdim)",
  },
  {
    icon: <FaLinkedin size={18} color="var(--t1)" />,
    label: "LinkedIn",
    value: "linkedin.com/in/pokhrelpratik/",
    href: "https://www.linkedin.com/in/pokhrelpratik/",
    bg: "rgba(10,102,194,0.12)",
  },
  {
    icon: <FaGithub size={18} color="var(--t1)" />,
    label: "GitHub",
    value: "github.com/prateekpokhrel",
    href: "https://github.com/prateekpokhrel",
    bg: "rgba(255,255,255,0.06)",
  },
  {
    icon: <FaCalendarAlt size={18} color="var(--t1)" />,
    label: "Availability",
    value: "Open to Work",
    href: null,
    bg: "rgba(255,255,255,0.04)",
  },
  {
    icon: <FaMapMarkerAlt size={18} color="var(--t1)" />,
    label: "Currently In",
    value: "Bhubaneswar, India",
    href: null,
    bg: "rgba(255,255,255,0.04)",
  },
  {
    icon: <FaHome size={18} color="var(--t1)" />,
    label: "Address",
    value: "Biratnagar, Nepal",
    href: null,
    bg: "rgba(255,255,255,0.04)",
  },
];

export default function Contact() {
  useReveal();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

 const submit = async () => {
  const e = validate();
  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }

  setLoading(true);
  setSuccessMsg("");

  try {
    const templateParams = {
      name: form.name,
      email: form.email,
      title: form.subject,
      message: form.message,
    };

    // 1️⃣ Send to YOU
    await emailjs.send(
      "service_6v43to8",
      "template_zw9f7ob",  // ← replace
      templateParams,
      "MdWyRENA0yrVdwqVR"  
    );

    // 2️⃣ Auto reply to USER
    await emailjs.send(
       "service_6v43to8",     // replace
        "template_u6gheos",   // ← replace
      templateParams,
      "MdWyRENA0yrVdwqVR"  
    );

    setSuccessMsg("Message sent successfully. I'll reply within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });

  } catch (err) {
    console.log("EmailJS Error:", err);
    setSuccessMsg("Something went wrong. Please try again.");
  }

  setLoading(false);
};

  return (
    <div className="page-wrapper">
      <div className="sec-header">
        <div className="sec-label">06 / CONTACT</div>
        <div className="sec-title">Get in Touch</div>
      </div>

      {/* Balanced Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 360px",
          gap: 40,
          alignItems: "start",
        }}
      >
        {/* ---------------- FORM (COMPACT) ---------------- */}
        <div
          className="card reveal"
          style={{
            padding: 26,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "var(--t2)",
              marginBottom: 18,
            }}
          >
            Send a Message
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 12,
            }}
          >
            <div>
              <label className="f-label">Name *</label>
              <input
                className="f-input"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              {errors.name && (
                <span style={{ fontSize: 11, color: "#ff6b6b" }}>
                  {errors.name}
                </span>
              )}
            </div>

            <div>
              <label className="f-label">Email *</label>
              <input
                className="f-input"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              {errors.email && (
                <span style={{ fontSize: 11, color: "#ff6b6b" }}>
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label className="f-label">Subject</label>
            <input
              className="f-input"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label className="f-label">Message *</label>
            <textarea
              className="f-input"
              rows={4} 
              style={{ resize: "vertical", minHeight: 100 }}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />
            {errors.message && (
              <span style={{ fontSize: 11, color: "#ff6b6b" }}>
                {errors.message}
              </span>
            )}
          </div>

          <button
            className="btn btn-fill"
            onClick={submit}
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? "Sending..." : "Send Message →"}
          </button>

          {successMsg && (
            <div
              style={{
                marginTop: 14,
                fontSize: 13,
                color: successMsg.includes("✓")
                  ? "var(--green)"
                  : "#ff6b6b",
              }}
            >
              {successMsg}
            </div>
          )}
        </div>

        {/* ---------------- RIGHT SIDEBAR ---------------- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {/* Contact Info */}
          <div className="card-flat reveal" style={{ padding: 22 }}>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--t2)",
                marginBottom: 16,
              }}
            >
              Contact Info
            </div>

            {contactInfo.map((c) => {
              const card = (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",
                    border: "1px solid var(--bdr)",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      background: c.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {c.icon}
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: 9,
                        color: "var(--t3)",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        display: "block",
                        fontFamily: "'JetBrains Mono', monospace",
                        marginBottom: 2,
                      }}
                    >
                      {c.label}
                    </span>

                    <span style={{ fontSize: 13, color: "var(--t1)" }}>
                      {c.value}
                    </span>
                  </div>
                </div>
              );

              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {card}
                </a>
              ) : (
                <div key={c.label}>{card}</div>
              );
            })}
          </div>

          {/* Availability */}
          <div className="card-flat reveal" style={{ padding: 22 }}>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--t2)",
                marginBottom: 10,
              }}
            >
              Availability
            </div>

            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--t1)",
                marginBottom: 8,
              }}
            >
              Open to Opportunities
            </div>

            <p
              style={{
                fontSize: 12,
                color: "var(--t3)",
                lineHeight: 1.7,
              }}
            >
              Available for full-time roles and freelance projects.
              Typical response time within 24 hours.
            </p>
          </div>

          {/* Quick Response */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 18px",
              borderRadius: 14,
              background: "var(--surf)",
              border: "1px solid var(--bdr)",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                background: "rgba(91,141,238,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--p)",
              }}
            >
              <FaBolt size={17} />
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--t1)",
                }}
              >
                Quick Response
              </div>

              <div style={{ fontSize: 11, color: "var(--t3)" }}>
                Usually replies within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}