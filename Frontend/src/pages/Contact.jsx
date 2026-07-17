import { useState, useEffect, useRef } from "react";
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

/* ─────────────────────────── SCROLL REVEAL ─────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return; }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal-item${inView ? ' is-in' : ''}${className ? ' ' + className : ''}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────── CONTACT INFO ─────────────────────────── */
const contactInfo = [
  {
    icon: <FaEnvelope size={18} />,
    label: "Email",
    value: "itspratikpok@gmail.com",
    href: "mailto:itspratikpok@gmail.com",
    bg: "var(--pdim)",
    color: "var(--p)"
  },
  {
    icon: <FaLinkedin size={18} />,
    label: "LinkedIn",
    value: "linkedin.com/in/pokhrelpratik",
    href: "https://www.linkedin.com/in/pokhrelpratik/",
    bg: "rgba(10,102,194,0.12)",
    color: "#0A66C2"
  },
  {
    icon: <FaGithub size={18} />,
    label: "GitHub",
    value: "github.com/prateekpokhrel",
    href: "https://github.com/prateekpokhrel",
    bg: "var(--surf)",
    color: "var(--t1)"
  },
  {
    icon: <FaCalendarAlt size={18} />,
    label: "Availability",
    value: "Open to Work",
    href: null,
    bg: "var(--surf)",
    color: "var(--t1)"
  },
  {
    icon: <FaMapMarkerAlt size={18} />,
    label: "Currently In",
    value: "Bhubaneswar, India",
    href: null,
    bg: "var(--surf)",
    color: "var(--t1)"
  },
  {
    icon: <FaHome size={18} />,
    label: "Address",
    value: "Biratnagar, Nepal",
    href: null,
    bg: "var(--surf)",
    color: "var(--t1)"
  },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
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
    setErrors({});

    try {
      const templateParams = {
        name: form.name,
        email: form.email,
        title: form.subject || "Portfolio Contact",
        message: form.message,
      };

      // 1️⃣ Send to YOU
      await emailjs.send(
        "service_6v43to8",
        "template_zw9f7ob", 
        templateParams,
        "MdWyRENA0yrVdwqVR"
      );

      // 2️⃣ Auto reply to USER
      await emailjs.send(
        "service_6v43to8",
        "template_u6gheos",
        templateParams,
        "MdWyRENA0yrVdwqVR"
      );

      setSuccessMsg("Message sent magically! I'll be in touch within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.log("EmailJS Error:", err);
      setSuccessMsg("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="page-wrapper contact-page">
      <style>{contactStyles}</style>

      {/* ── HEADER ── */}
      <Reveal className="sec-header">
        <div className="sec-label">06 / CONTACT</div>
        <div className="sec-title">Get in Touch</div>
      </Reveal>

      <div className="contact-layout">
        
        {/* ── LEFT: MAGICAL FORM ── */}
        <Reveal delay={100} className="contact-card form-card">
          <div className="card-header">
            <h3>Send a Message</h3>
            <p>Let's build something amazing together.</p>
          </div>

          <div className="form-row">
            <div className="input-wrapper">
              <input
                className={`magic-input ${errors.name ? 'input-error' : ''}`}
                placeholder=" "
                value={form.name}
                onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({...errors, name: null}) }}
              />
              <label className="floating-label">Name *</label>
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="input-wrapper">
              <input
                className={`magic-input ${errors.email ? 'input-error' : ''}`}
                type="email"
                placeholder=" "
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({...errors, email: null}) }}
              />
              <label className="floating-label">Email *</label>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div className="input-wrapper">
            <input
              className="magic-input"
              placeholder=" "
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
            <label className="floating-label">Subject (Optional)</label>
          </div>

          <div className="input-wrapper">
            <textarea
              className={`magic-input ${errors.message ? 'input-error' : ''}`}
              rows={5}
              placeholder=" "
              value={form.message}
              onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({...errors, message: null}) }}
            />
            <label className="floating-label">Message *</label>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          <button
            className={`magic-btn ${loading ? 'loading' : ''}`}
            onClick={submit}
            disabled={loading}
          >
            <span className="btn-text">{loading ? "Transmitting..." : "Send Message →"}</span>
            <div className="btn-loader"></div>
          </button>

          {successMsg && (
            <div className={`status-msg ${successMsg.includes("wrong") ? 'error' : 'success'}`}>
              {successMsg}
            </div>
          )}
        </Reveal>

        {/* ── RIGHT: INFO SIDEBAR ── */}
        <div className="sidebar-layout">
          
          {/* Contact Cards */}
          <Reveal delay={200} className="contact-card info-card">
            <h3 className="sidebar-title">Contact Info</h3>
            
            <div className="info-grid">
              {contactInfo.map((c, i) => {
                const CardContent = (
                  <div className="info-item" style={{ transitionDelay: `${i * 50}ms` }}>
                    <div className="info-icon" style={{ background: c.bg, color: c.color }}>
                      {c.icon}
                    </div>
                    <div className="info-text">
                      <span className="info-label">{c.label}</span>
                      <span className="info-val">{c.value}</span>
                    </div>
                  </div>
                );

                return c.href ? (
                  <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="info-link">
                    {CardContent}
                  </a>
                ) : (
                  <div key={c.label}>{CardContent}</div>
                );
              })}
            </div>
          </Reveal>

          {/* Availability Block */}
          <Reveal delay={300} className="contact-card avail-card">
            <h3 className="sidebar-title">Availability</h3>
            <div className="avail-status">
              <span className="pulse-dot"></span>
              Open to Opportunities
            </div>
            <p className="avail-desc">
              Available for full-time roles, freelance projects, and open-source collaborations.
            </p>
          </Reveal>

          {/* Quick Response Widget */}
          <Reveal delay={400} className="quick-response-widget">
            <div className="qr-icon">
              <FaBolt size={18} />
            </div>
            <div className="qr-text">
              <div className="qr-title">Quick Response</div>
              <div className="qr-desc">Usually replies within 24 hours</div>
            </div>
          </Reveal>

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── INJECTED STYLES ─────────────────────────── */
const contactStyles = `
/* Layout Architecture */
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  align-items: start;
}

@media (max-width: 992px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
}

.sidebar-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Scroll Reveal Animations */
.reveal-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.22, 0.68, 0, 1.01), transform 0.7s cubic-bezier(0.22, 0.68, 0, 1.01);
  will-change: opacity, transform;
}
.reveal-item.is-in {
  opacity: 1;
  transform: translateY(0);
}

/* Base Card Styles */
.contact-card {
  background: var(--bg2);
  border: 1px solid var(--bdr);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
}

@media (max-width: 600px) {
  .contact-card { padding: 24px; }
}

.card-header h3 {
  font-family: 'Syne', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: var(--t1);
  margin: 0 0 8px 0;
}
.card-header p {
  font-size: 14px;
  color: var(--t3);
  margin: 0 0 32px 0;
}

/* Magical Form Elements */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; gap: 0; }
}

.input-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.magic-input {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--bdr);
  border-radius: 12px;
  padding: 18px 16px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: var(--t1);
  transition: all 0.3s ease;
  resize: vertical;
}

.magic-input:focus {
  outline: none;
  border-color: var(--p);
  box-shadow: 0 0 0 4px rgba(91,141,238,0.1);
  background: var(--bg2);
}

.magic-input.input-error {
  border-color: #ff6b6b;
}

/* Floating Label Logic */
.floating-label {
  position: absolute;
  left: 16px;
  top: 16px;
  font-size: 15px;
  color: var(--t3);
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.magic-input:focus ~ .floating-label,
.magic-input:not(:placeholder-shown) ~ .floating-label {
  top: -9px;
  left: 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--p);
  background: var(--bg2);
  padding: 0 6px;
  border-radius: 4px;
}

.error-text {
  position: absolute;
  bottom: -18px;
  left: 4px;
  font-size: 11px;
  color: #ff6b6b;
  font-weight: 500;
}

/* Magical Submit Button */
.magic-btn {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background: var(--p);
  color: #fff;
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.magic-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(91,141,238,0.35);
}

.magic-btn:active:not(:disabled) {
  transform: translateY(0);
}

.magic-btn:disabled {
  background: var(--pdim);
  cursor: not-allowed;
  opacity: 0.8;
}

.btn-loader {
  display: none;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

.magic-btn.loading .btn-text { display: none; }
.magic-btn.loading .btn-loader { display: block; }

@keyframes spin {
  to { transform: rotate(360deg); }
}

.status-msg {
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  animation: fadeIn 0.4s ease forwards;
}
.status-msg.success { background: rgba(74,222,128,0.1); color: #4ade80; border: 1px solid rgba(74,222,128,0.2); }
.status-msg.error { background: rgba(255,107,107,0.1); color: #ff6b6b; border: 1px solid rgba(255,107,107,0.2); }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Sidebar Elements */
.sidebar-title {
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--t2);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 20px 0;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-link {
  text-decoration: none;
  display: block;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border-radius: 12px;
  background: var(--bg);
  border: 1px solid var(--bdr);
  transition: all 0.3s ease;
}

.info-link .info-item:hover {
  transform: translateX(6px);
  border-color: var(--p);
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  background: var(--bg2);
}

.info-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--t3);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 4px;
}

.info-val {
  font-size: 14px;
  font-weight: 600;
  color: var(--t1);
  display: block;
}

/* Availability Card */
.avail-status {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Syne', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--t1);
  margin-bottom: 12px;
}

.pulse-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 0 0 rgba(74,222,128,0.6);
  animation: pulseDot 2s infinite;
}

@keyframes pulseDot {
  0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.55); }
  70%  { box-shadow: 0 0 0 10px rgba(74,222,128,0); }
  100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
}

.avail-desc {
  font-size: 13px;
  color: var(--t3);
  line-height: 1.6;
  margin: 0;
}

/* Quick Response Widget */
.quick-response-widget {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  background: var(--bg2);
  border: 1px solid var(--bdr);
}

.qr-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(91,141,238,0.12);
  color: var(--p);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.qr-title {
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--t1);
  margin-bottom: 4px;
}

.qr-desc {
  font-size: 12px;
  color: var(--t3);
}
`