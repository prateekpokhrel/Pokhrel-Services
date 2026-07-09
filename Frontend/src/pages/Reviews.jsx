import { useState, useEffect, useCallback, useMemo } from "react";

const LS_KEY = "pokhrel_reviews_v2";
const THEME_KEY = "pokhrel_theme";

const SEED = [
  { id:"s1", name:"David Jika",   rating:5, service:"Web Development",  verified:true,  helpful:200,  date:"2025-02-18", title:"Outstanding work", text:"Clean architecture and very professional delivery. Every pixel was exactly what we asked for — and then some. Would rehire immediately." },
  { id:"s2", name:"Ankita Verma",    rating:4, service:"Full Stack App",   verified:true,  helpful:60,  date:"2025-01-30", title:"Great experience overall", text:"Great experience working with Pratik. Highly recommended! Communication was smooth and the final product exceeded our initial scope." },
  { id:"s3", name:"Sandhya Sharma",    rating:5, service:"AI Integration",   verified:true,  helpful:14, date:"2025-01-12", title:"Made our AI idea real", text:"We had a rough concept and turned it into a live product. The understanding of both ML pipelines and user-facing UX is rare. Incredibly patient through all our revisions, and never once made us feel like a small client." },
  { id:"s4", name:"Rajan Tamang",   rating:5, service:"UI/UX Design",     verified:false, helpful:4,  date:"2024-12-28", title:"Stunning redesign", text:"Our old site looked like it was built in 2010. The redesign is modern, fast and our bounce rate dropped by 40% in the first month. Remarkable turnaround." },
  { id:"s5", name:"Alex Max", rating:5, service:"API Development",  verified:true,  helpful:11, date:"2024-12-05", title:"Production-ready from day one", text:"Clean REST APIs, full Swagger docs, proper error handling and rate limiting. Our backend team integrated with zero friction. This is how APIs should be delivered." },
  { id:"s6", name:"Bikshya Lama",    rating:4, service:"Automation",       verified:true,  helpful:3,  date:"2024-11-20", title:"Saved us 30 hours a week", text:"The automation scripts eliminated an entire workflow our team was doing manually. ROI was visible within the first week of deployment." },
  { id:"s7", name:"Arjuna Maharjan", rating:5, service:"Machine Learning", verified:true,  helpful:17, date:"2024-11-03", title:"Forecasting accuracy jumped 26%", text:"Custom ML pipeline for retail demand forecasting. Accuracy went from 61% to 87%. Every technical decision was explained clearly, even to our non-technical management." },
  { id:"s8", name:"Tina Jordan", rating:3, service:"Mobile App",       verified:true,  helpful:2,  date:"2024-10-14", title:"Good, with a few hiccups", text:"The app works well overall. There were a couple of rounds of revisions on the onboarding flow, but the team stayed responsive and got it right in the end." },
];

const SERVICES = [
  "Web Development","Full Stack App","UI/UX Design",
  "AI Integration","API Development","Machine Learning",
  "Mobile App","Automation","Other",
];

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h);
}

function initialsOf(name) {
  return name.split(" ").map(w => w[0]).filter(Boolean).join("").slice(0, 2).toUpperCase();
}

function avatarSeed(name) {
  return (hashStr(name) % 70) + 1;
}

const AVATAR_PALETTES = [
  ["#6366f1","#312e81"],["#8b5cf6","#4c1d95"],["#10b981","#064e3b"],
  ["#f59e0b","#78350f"],["#ec4899","#831843"],["#06b6d4","#164e63"],
];

function getPalette(str) {
  return AVATAR_PALETTES[hashStr(str) % AVATAR_PALETTES.length];
}

function ringColors(rating) {
  if (rating >= 5) return ["#fcd34d", "#f59e0b"];
  if (rating === 4) return ["#6ee7b7", "#10b981"];
  if (rating === 3) return ["#93c5fd", "#3b82f6"];
  return ["#cbd5e1", "#94a3b8"];
}

function Star({ on, size = 16, onClick, onEnter }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20"
      style={{ cursor: onClick ? "pointer" : "default", flexShrink: 0, transition: "transform .15s ease" }}
      onClick={onClick} onMouseEnter={onEnter}
    >
      <polygon
        points="10,1.5 12.35,7.24 18.54,7.64 13.97,11.6 15.45,17.64 10,14.25 4.55,17.64 6.03,11.6 1.46,7.64 7.65,7.24"
        fill={on ? "#f59e0b" : "rgba(148, 163, 184, 0.25)"}
        style={{ transition: "fill .2s ease" }}
      />
    </svg>
  );
}

function StarRow({ val, size, interactive, onSet }) {
  const [hov, setHov] = useState(0);
  const show = interactive ? (hov || val) : val;
  return (
    <div style={{ display: "flex", gap: 3 }} onMouseLeave={() => interactive && setHov(0)}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} on={show >= i}
          onClick={interactive ? () => onSet(i) : null}
          onEnter={interactive ? () => setHov(i) : null}
        />
      ))}
    </div>
  );
}

function Avatar({ name, rating, size = 44, T }) {
  const [imgFailed, setImgFailed] = useState(false);
  const seed = useMemo(() => avatarSeed(name), [name]);
  const pal = useMemo(() => getPalette(name), [name]);
  const [c1, c2] = ringColors(rating);
  const ringSize = size + 6;

  return (
    <div
      style={{
        width: ringSize, height: ringSize, borderRadius: "50%", flexShrink: 0,
        background: `conic-gradient(${c1}, ${c2}, ${c1})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 2.5,
      }}
      title={`${rating}-star review`}
    >
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%", background: T.cardBg,
        padding: 2, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {imgFailed ? (
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            background: `linear-gradient(135deg, ${pal[0]}, ${pal[1]})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: size * 0.36, fontWeight: 700, color: "#fff",
          }}>
            {initialsOf(name)}
          </div>
        ) : (
          <img
            src={`https://i.pravatar.cc/96?img=${seed}`}
            alt={name}
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>
    </div>
  );
}

function ReviewText({ text, T }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 220;
  const shown = open || !long ? text : text.slice(0, 200).trimEnd() + "…";
  return (
    <>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: T.textColor }}>{shown}</p>
      {long && (
        <button
          onClick={() => setOpen(o => !o)}
          style={{ marginTop: 6, background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: 13, fontWeight: 700, color: T.accent, fontFamily: "inherit" }}
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </>
  );
}

function ReviewModal({ isOpen, onClose, onSubmit, T }) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!rating) e.rating = "Rating required";
    if (!name.trim()) e.name = "Name required";
    if (!service) e.service = "Service required";
    if (text.trim().length < 15) e.text = "Min 15 characters";
    setErrs(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      onSubmit({ name: name.trim(), service, title: title.trim(), text: text.trim(), rating });
      setLoading(false);
      onClose();
      setName(""); setService(""); setTitle(""); setText(""); setRating(0); setErrs({});
    }, 900);
  };

  const inpSt = { width: "100%", padding: "12px 14px", borderRadius: 10, fontSize: 14, background: T.inpBg, border: `1px solid ${T.inpBdr}`, color: T.titleColor, fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border-color .15s ease" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(2,6,23,0.65)", backdropFilter: "blur(6px)" }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: T.cardBg, width: "100%", maxWidth: 500, borderRadius: 18, border: `1px solid ${T.border}`, padding: 28, position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", animation: "modalIn .25s cubic-bezier(.16,1,.3,1)" }}>

        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: T.subColor, cursor: "pointer", padding: 4 }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.accent, marginBottom: 8 }}>Share your experience</div>
        <h3 style={{ margin: "0 0 24px", fontSize: 22, fontFamily: "Sora, sans-serif", fontWeight: 700, color: T.titleColor }}>Write a review</h3>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.titleColor, marginBottom: 8 }}>Your rating *</div>
          <StarRow val={rating} size={28} interactive onSet={setRating} />
          {errs.rating && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errs.rating}</div>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name *" style={{ ...inpSt, borderColor: errs.name ? "#ef4444" : T.inpBdr }} />
          <select value={service} onChange={e => setService(e.target.value)} style={{ ...inpSt, borderColor: errs.service ? "#ef4444" : T.inpBdr }}>
            <option value="">Select service *</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Review headline (optional)" style={inpSt} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={4} placeholder="Describe your experience..." style={{ ...inpSt, resize: "vertical", borderColor: errs.text ? "#ef4444" : T.inpBdr }} />
          {errs.text && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errs.text}</div>}
        </div>

        <button onClick={submit} disabled={loading} style={{ width: "100%", padding: 14, borderRadius: 10, background: `linear-gradient(135deg, ${T.accent}, ${T.accent2})`, color: "#fff", fontSize: 15, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, boxShadow: `0 8px 20px ${T.accentShadow}` }}>
          {loading ? "Publishing…" : "Submit review"}
        </button>
      </div>
    </div>
  );
}

export default function ReviewPage({ isNight: isNightProp }) {
  const [reviews, setReviews] = useState(() => {
    try { const s = localStorage.getItem(LS_KEY); return s ? JSON.parse(s) : SEED; } catch { return SEED; }
  });

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. More robust theme initialization that checks for standard "dark" mode as well
  const [isNight, setIsNightState] = useState(() => {
    if (isNightProp !== undefined) return isNightProp;
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem("theme");
        if (saved) return saved === "night" || saved === "dark";
        
        // Check for standard dark mode DOM classes (Tailwind style)
        if (document.documentElement.classList.contains("dark") || document.body.classList.contains("dark")) {
          return true;
        }
      } catch {}
      if (window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    }
    return true; // Default fallback
  });

  // 2. Keep state synced if the prop specifically updates
  useEffect(() => {
    if (isNightProp !== undefined) setIsNightState(isNightProp);
  }, [isNightProp]);

  // 3. Bulletproof global listener to catch side-effect toggles from the parent wrapper
  useEffect(() => {
    const syncTheme = () => {
      try {
        // Fallback checks
        const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem("theme");
        if (saved) {
          setIsNightState(saved === "night" || saved === "dark");
          return;
        }
        
        const isDarkDOM = document.documentElement.classList.contains("dark") || 
                          document.body.classList.contains("dark") ||
                          document.documentElement.getAttribute("data-theme") === "dark";
        if (isDarkDOM) {
          setIsNightState(true);
          return;
        }
        
        const isLightDOM = document.documentElement.classList.contains("light") || 
                           document.body.classList.contains("light") ||
                           document.documentElement.getAttribute("data-theme") === "light";
        if (isLightDOM) {
          setIsNightState(false);
          return;
        }
      } catch {}
    };

    // Listen to standard custom events and cross-tab storage changes
    window.addEventListener("storage", syncTheme);
    window.addEventListener("themechange", syncTheme);
    window.addEventListener("toggle-theme", syncTheme);

    // Mutation observer for catching direct class changes (highly common in React ecosystems)
    const observer = new MutationObserver(syncTheme);
    if (typeof document !== "undefined") {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
      observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    }

    // Monkey-patch localStorage.setItem to instantly catch same-tab theme changes if no event is fired
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments);
      if (key === THEME_KEY || key === "theme") {
        syncTheme();
      }
    };

    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("toggle-theme", syncTheme);
      observer.disconnect();
      localStorage.setItem = originalSetItem;
    };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(reviews)); } catch {}
  }, [reviews]);

  const handleSubmit = useCallback((data) => {
    setReviews(prev => [{
      id: "u" + Date.now(),
      name: data.name, service: data.service,
      rating: data.rating, title: data.title, text: data.text,
      date: new Date().toISOString().slice(0, 10),
      verified: false, helpful: 0,
    }, ...prev]);
  }, []);

  const handleHelpful = useCallback((id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, helpful: (r.helpful || 0) + 1 } : r));
  }, []);

  /* ── Theme tokens ── */
  const T = isNight ? {
    bg: "#05070d",
    bgGradient: "radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,0.12), transparent), radial-gradient(1000px 500px at 100% 0%, rgba(236,72,153,0.08), transparent)",
    cardBg: "#0d1117",
    cardBgAlt: "#111826",
    border: "#1e2530",
    titleColor: "#f8fafc",
    subColor: "#8b95a7",
    textColor: "#c9d1d9",
    inpBg: "#0a0e16",
    inpBdr: "#242b38",
    barBg: "#1c232f",
    accent: "#818cf8",
    accent2: "#c084fc",
    accentShadow: "rgba(99,102,241,0.35)",
    accentSoftBg: "rgba(129,140,248,0.12)",
  } : {
    bg: "#f6f7fb",
    bgGradient: "radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,0.06), transparent), radial-gradient(1000px 500px at 100% 0%, rgba(236,72,153,0.05), transparent)",
    cardBg: "#ffffff",
    cardBgAlt: "#f9fafc",
    border: "#e6e8ef",
    titleColor: "#0f172a",
    subColor: "#64748b",
    textColor: "#374151",
    inpBg: "#f8fafc",
    inpBdr: "#e2e8f0",
    barBg: "#eef0f5",
    accent: "#6366f1",
    accent2: "#a855f7",
    accentShadow: "rgba(99,102,241,0.2)",
    accentSoftBg: "rgba(99,102,241,0.08)",
  };

  const total = reviews.length;
  const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const dist = [5, 4, 3, 2, 1].map(s => ({ star: s, count: reviews.filter(r => r.rating === s).length }));
  const verifiedPct = total ? Math.round((reviews.filter(r => r.verified).length / total) * 100) : 0;

  let visible = [...reviews];
  if (filter !== "all") visible = visible.filter(r => r.rating === +filter);
  if (sort === "recent") visible.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sort === "top") visible.sort((a, b) => b.rating - a.rating || new Date(b.date) - new Date(a.date));
  if (sort === "helpful") visible.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));

  const selectArrow = (color) => `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>`
  )}")`;

  return (
    <div style={{ background: T.bg, backgroundImage: T.bgGradient, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: T.textColor, padding: "40px 20px", transition: "background-color .3s ease, color .3s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: ${T.accent}; color: #fff; }
        @keyframes cardIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalIn { from { opacity: 0; transform: scale(.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes barFill { from { width: 0; } }
        .rp-card { animation: cardIn .4s cubic-bezier(.16,1,.3,1) backwards; }
        .rp-chip { transition: all .15s ease; }
        .rp-chip:hover { transform: translateY(-1px); }
        .rp-select { appearance: none; -webkit-appearance: none; background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px !important; }
        .rp-helpful:hover { background: ${T.accentSoftBg} !important; border-color: ${T.accent} !important; color: ${T.accent} !important; }
        .rp-write-btn:hover { background: linear-gradient(135deg, ${T.accent}, ${T.accent2}) !important; color: #fff !important; border-color: transparent !important; }
        @media(max-width: 860px){
          .rp-container { flex-direction: column!important; }
          .rp-sidebar { width: 100%!important; position: static!important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rp-card, .rp-card * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} T={T} />

      <div style={{ maxWidth: 1120, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>
            Pokhrel Services
          </div>
          <h1 style={{ fontSize: 34, fontFamily: "Sora, sans-serif", fontWeight: 800, color: T.titleColor, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
            Client reviews
          </h1>
          <p style={{ fontSize: 15.5, color: T.subColor, margin: 0 }}>Verified feedback, straight from the people we've delivered for.</p>
        </div>

        <div className="rp-container" style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>

          {/* ── LEFT SIDEBAR (Stats) ── */}
          <div className="rp-sidebar" style={{ width: 320, flexShrink: 0, position: "sticky", top: 32 }}>
            <div style={{ background: T.cardBg, borderRadius: 16, border: `1px solid ${T.border}`, padding: 26, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${T.accent}, ${T.accent2})` }} />

              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
                <div style={{ fontSize: 52, fontFamily: "Sora, sans-serif", fontWeight: 800, color: T.titleColor, lineHeight: 1 }}>{avg.toFixed(1)}</div>
                <div>
                  <StarRow val={Math.round(avg)} size={17} />
                  <div style={{ fontSize: 13, color: T.subColor, marginTop: 6 }}>from {total} review{total !== 1 ? "s" : ""}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                <div style={{ flex: 1, background: T.cardBgAlt, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: T.titleColor, fontFamily: "Sora, sans-serif" }}>{verifiedPct}%</div>
                  <div style={{ fontSize: 11.5, color: T.subColor, marginTop: 2 }}>Verified clients</div>
                </div>
                <div style={{ flex: 1, background: T.cardBgAlt, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: T.titleColor, fontFamily: "Sora, sans-serif" }}>{dist[0].count + dist[1].count}</div>
                  <div style={{ fontSize: 11.5, color: T.subColor, marginTop: 2 }}>4★ & 5★ reviews</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 28 }}>
                {dist.map(d => {
                  const pct = total ? Math.round((d.count / total) * 100) : 0;
                  const [rc1, rc2] = ringColors(d.star);
                  return (
                    <div key={d.star} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, width: 34, fontSize: 13, fontWeight: 700, color: T.titleColor }}>
                        {d.star}<Star on size={11} />
                      </div>
                      <div style={{ flex: 1, height: 8, borderRadius: 4, background: T.barBg, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${rc2}, ${rc1})`, borderRadius: 4, animation: "barFill .8s cubic-bezier(.16,1,.3,1)" }} />
                      </div>
                      <div style={{ width: 22, fontSize: 12, color: T.subColor, textAlign: "right" }}>{d.count}</div>
                    </div>
                  );
                })}
              </div>

              <button
                className="rp-write-btn"
                onClick={() => setIsModalOpen(true)}
                style={{ width: "100%", padding: "13px", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", color: T.titleColor, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all .2s ease" }}
              >
                Write a review
              </button>
            </div>
          </div>

          {/* ── RIGHT FEED (Reviews List) ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Filters */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 24, paddingBottom: 18, borderBottom: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["all", "5", "4", "3", "2", "1"].map(f => {
                  const count = f === "all" ? total : dist.find(d => String(d.star) === f)?.count ?? 0;
                  const active = filter === f;
                  return (
                    <button key={f} className="rp-chip" onClick={() => setFilter(f)}
                      style={{
                        padding: "7px 13px", borderRadius: 20, fontSize: 13, fontWeight: 700,
                        border: `1px solid ${active ? "transparent" : T.border}`,
                        background: active ? `linear-gradient(135deg, ${T.accent}, ${T.accent2})` : "transparent",
                        color: active ? "#fff" : T.subColor, cursor: "pointer",
                      }}>
                      {f === "all" ? "All" : `${f}★`} <span style={{ opacity: 0.75, fontWeight: 600 }}>({count})</span>
                    </button>
                  );
                })}
              </div>
              <select
                className="rp-select"
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{ padding: "9px 14px", borderRadius: 10, fontSize: 14, fontWeight: 600, background: `${T.cardBg} ${selectArrow(isNight ? "%23c9d1d9" : "%23374151")}`, border: `1px solid ${T.border}`, color: T.titleColor, outline: "none", cursor: "pointer" }}
              >
                <option value="recent">Most recent</option>
                <option value="top">Top rated</option>
                <option value="helpful">Most helpful</option>
              </select>
            </div>

            {/* List */}
            {visible.length === 0 ? (
              <div style={{ textAlign: "center", padding: "70px 20px", color: T.subColor, background: T.cardBg, borderRadius: 16, border: `1px solid ${T.border}` }}>
                No reviews match this filter yet.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {visible.map((r, i) => {
                  const d = new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                  return (
                    <div
                      key={r.id}
                      className="rp-card"
                      style={{ animationDelay: `${Math.min(i, 8) * 55}ms`, background: T.cardBg, borderRadius: 16, border: `1px solid ${T.border}`, padding: 24, transition: "border-color .2s ease, transform .2s ease" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 12 }}>
                        <div style={{ display: "flex", gap: 14 }}>
                          <Avatar name={r.name} rating={r.rating} size={46} T={T} />
                          <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: T.titleColor, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                              {r.name}
                              {r.verified && (
                                <span style={{ fontSize: 11, fontWeight: 700, background: isNight ? "rgba(16,185,129,0.15)" : "#d1fae5", color: "#10b981", padding: "3px 8px", borderRadius: 12, display: "flex", alignItems: "center", gap: 4 }}>
                                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                                  Verified
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 13, color: T.subColor, marginTop: 4 }}>
                              {r.service} · {d}
                            </div>
                          </div>
                        </div>
                        <StarRow val={r.rating} size={14} />
                      </div>

                      {r.title && <h4 style={{ margin: "0 0 8px", fontSize: 16.5, fontWeight: 700, fontFamily: "Sora, sans-serif", color: T.titleColor }}>{r.title}</h4>}
                      <ReviewText text={r.text} T={T} />

                      <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 13, color: T.subColor }}>Was this helpful?</span>
                        <button
                          className="rp-helpful"
                          onClick={() => handleHelpful(r.id)}
                          style={{ background: "transparent", border: `1px solid ${T.border}`, padding: "5px 13px", borderRadius: 20, fontSize: 13, fontWeight: 700, color: T.subColor, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all .15s ease" }}
                        >
                          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                          {r.helpful || 0}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}