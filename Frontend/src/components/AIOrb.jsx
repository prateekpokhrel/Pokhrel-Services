import { useState, useRef } from "react";
import aiIcon from "../assets/aibot.png";

export default function AIOrb() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [resp, setResp] = useState(
    "Hi! Ask me anything about Pratik's skills, projects, education, or availability."
  );

  const historyRef = useRef([]);

  // 🔥 Smart Knowledge Base
  const knowledge = {
    skills: `
Core Skills:
• Java & Spring Boot
• React.js & Node.js
• SQL, REST and Fast APIs
• AI/ML Integration
• Clean Architecture & Scalable Systems
    `,
    projects: `
Projects:
1️ SUIS - Smart University Intelligent System  
2️ Kavout - AI-powered NSE Stock Forecasting  
3️ AI Smart City Issue Solver - MLH Hackathon @ KIIT 
4️ SEGA - Smart Emergency Governance Architecture
5️ More details in Projects section! 
    `,
    education: `
🎓 Education:
B.Tech CSE - KIIT Deemed to be University  
CGPA: 7.44  
+2 Science - Sagarmatha Higher Secondary Boarding School
GPA: 3.59 / 4.0
    `,
    contact: `
Contact:
Email: itspratikpok@gmail.com  
Open to internships & full-time roles.
Responds within 24 hours.
    `,
    personality: `
About Pratik:
Authentic. Bold. Unapologetically himself.  
Focused on building real-world scalable AI integrated products and systems.
    `,
  };

// ✨ Smooth Typing Animation
const typeText = (text) => {
  if (!text) return setResp("");
  
  let i = 0;
  setResp(""); // Clear previous

  const interval = setInterval(() => {
    setResp((prev) => text.slice(0, i + 1));
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 15);

  return () => clearInterval(interval); // Cleanup function
};

// 🧠 Smart Assistant Logic
const generateReply = (input) => {
  const query = input.toLowerCase().trim();

  // 1. Direct Project Matches (More specific keys first)
  if (query.includes("kavout")) {
    return "Kavout is an AI-powered NSE stock forecasting platform. It uses linear models for 1-day, 15-day, and 30-day predictions.";
  }
  if (query.includes("suis")) {
    return "SUIS (Smart University Intelligent System) is a scalable management solution with AI-powered automation for universities.";
  }
  if (query.includes("smart city") || query.includes("mlh")) {
    return "The AI Smart City Issue Solver was an MLH Hackathon project designed to identify and solve urban issues using AI.";
  }
  if (query.includes("sega") || query.includes("emergency")) {
    return "SEGA (Smart Emergency Governance Architecture) is a centralized infrastructure for incident reporting and real-time safety compliance. 🚨";
  }

  // 2. Category Matches
  const mappings = [
    { keys: ["skill", "tech", "stack"], value: knowledge.skills },
    { keys: ["project", "build", "work"], value: knowledge.projects },
    { keys: ["education", "study", "college"], value: knowledge.education },
    { keys: ["contact", "hire", "email", "linkedin"], value: knowledge.contact },
    { keys: ["about", "who", "personality"], value: knowledge.personality }
  ];

  const match = mappings.find(m => m.keys.some(key => query.includes(key)));
  if (match) return match.value;

  // 3. Greetings & Fallback
  if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
    return "Hey there! 👋 I'm Jax, your AI assistant. How can I help you explore my world today?";
  }

  return `I'm not quite sure about that, but I can tell you about:
• My Tech Skills
• Featured Projects
• Education & Background
• How to Contact Me
Try asking something like "What projects have you built?"`;
};

//Execute Search
const ask = () => {
  if (!q.trim()) return;

  historyRef.current.push(q);
  const reply = generateReply(q);

  setResp("Thinking..."); 
  
  // Added a slight delay for "Realism"
  setTimeout(() => {
    typeText(reply);
  }, 600);

  setQ("");
};


  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 84,
            right: 26,
            width: 296,
            background: "var(--bg2)",
            border: "1px solid var(--bdr2)",
            borderRadius: 14,
            padding: 20,
            zIndex: 199,
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(91,141,238,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={aiIcon}
                alt="AI"
                style={{
                  width: "85%",
                  height: "85%",
                  objectFit: "contain",
                  filter: "brightness(1.15)",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--t1)",
                }}
              >
                AI Assistant
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: "var(--t3)",
                }}
              >
                Smart Portfolio Assistant
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 13,
              color: "var(--t2)",
              minHeight: 60,
              padding: 12,
              borderRadius: 8,
              background: "var(--surf)",
              marginBottom: 12,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {resp}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask()}
              placeholder="Ask something..."
              style={{
                flex: 1,
                padding: "9px 11px",
                background: "var(--surf)",
                border: "1px solid var(--bdr)",
                borderRadius: 7,
                color: "var(--t1)",
                fontSize: 12,
                outline: "none",
              }}
            />

            <button
              onClick={ask}
              style={{
                width: 34,
                height: 34,
                borderRadius: 7,
                background: "var(--p)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 26,
          right: 26,
          width: 46,
          height: 46,
          borderRadius: 11,
          background: "var(--p)",
          border: "none",
          cursor: "pointer",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {open ? (
          <span style={{ fontSize: 18, color: "#fff" }}>X</span>
        ) : (
          <img
            src={aiIcon}
            alt="AI"
            style={{
              width: "78%",
              height: "78%",
              objectFit: "contain",
              filter: "brightness(1.2)",
            }}
          />
        )}
      </button>
    </>
  );
}