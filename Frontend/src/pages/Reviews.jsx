import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   POKHREL SERVICES — REVIEWS PAGE  (drop-in upgrade)
   Same export: export default function ReviewPage()
   Persists to localStorage · Matches your dark theme
   ═══════════════════════════════════════════════════════ */

const LS_KEY = "pokhrel_reviews_v1";

const SEED = [
  { id:"s1", name:"Rahul Sharma",    initials:"RS", rating:5, service:"Web Development",  verified:true,  helpful:9,  date:"2025-02-18", title:"Outstanding work", text:"Clean architecture and very professional delivery. Every pixel was exactly what we asked for — and then some. Would rehire immediately." },
  { id:"s2", name:"Ankit Verma",     initials:"AV", rating:4, service:"Full Stack App",   verified:true,  helpful:6,  date:"2025-01-30", title:"Great experience overall", text:"Great experience working with Pratik. Highly recommended! Communication was smooth and the final product exceeded our initial scope." },
  { id:"s3", name:"Sneha Karki",     initials:"SK", rating:5, service:"AI Integration",   verified:true,  helpful:14, date:"2025-01-12", title:"Made our AI idea real", text:"We had a rough concept and Pratik turned it into a live product. His understanding of both ML pipelines and user-facing UX is rare. Incredibly patient through all our revisions." },
  { id:"s4", name:"Rajan Tamang",    initials:"RT", rating:5, service:"UI/UX Design",     verified:false, helpful:4,  date:"2024-12-28", title:"Stunning redesign", text:"Our old site looked like it was built in 2010. The redesign is modern, fast and our bounce rate dropped by 40% in the first month. Remarkable turnaround." },
  { id:"s5", name:"Priya Shrestha",  initials:"PS", rating:5, service:"API Development",  verified:true,  helpful:11, date:"2024-12-05", title:"Production-ready from day one", text:"Clean REST APIs, full Swagger docs, proper error handling and rate limiting. Our backend team integrated with zero friction. This is how APIs should be delivered." },
  { id:"s6", name:"Bikash Lama",     initials:"BL", rating:4, service:"Automation",       verified:true,  helpful:3,  date:"2024-11-20", title:"Saved us 30 hours a week", text:"The automation scripts Pratik wrote eliminated an entire workflow our team was doing manually. ROI was visible within the first week of deployment." },
  { id:"s7", name:"Arjun Maharjan",  initials:"AM", rating:5, service:"Machine Learning", verified:true,  helpful:17, date:"2024-11-03", title:"Forecasting accuracy jumped 26%", text:"Custom ML pipeline for retail demand forecasting. Accuracy went from 61% to 87%. He explained every technical decision clearly, even to our non-technical management." },
];

const SERVICES = [
  "Web Development","Full Stack App","UI/UX Design",
  "AI Integration","API Development","Machine Learning",
  "Mobile App","Automation","Other",
];

const AVATAR_PALETTES = [
  ["#5b8dee","#0d1a35"],["#8b5cf6","#1a1030"],["#10b981","#0a2018"],
  ["#f59e0b","#251a08"],["#f472b6","#2a1020"],["#06b6d4","#082025"],
  ["#6366f1","#10122a"],["#ec4899","#2a0e1f"],["#14b8a6","#082520"],
];

function getPalette(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_PALETTES[Math.abs(h) % AVATAR_PALETTES.length];
}

/* ─── tiny Star SVG ─────────────────────────────────── */
function Star({ on, size = 15, onClick, onEnter }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20"
      style={{ cursor: onClick ? "pointer" : "default", flexShrink: 0 }}
      onClick={onClick} onMouseEnter={onEnter}
    >
      <polygon
        points="10,1.5 12.35,7.24 18.54,7.64 13.97,11.6 15.45,17.64 10,14.25 4.55,17.64 6.03,11.6 1.46,7.64 7.65,7.24"
        fill={on ? "#5b8dee" : "#1e2240"}
        stroke={on ? "#5b8dee" : "#2a2f60"}
        strokeWidth="0.6"
        style={{ transition: "fill .12s" }}
      />
    </svg>
  );
}

function StarRow({ val, size, interactive, onSet }) {
  const [hov, setHov] = useState(0);
  const show = interactive ? (hov || val) : val;
  return (
    <div style={{ display:"flex", gap:3 }}
      onMouseLeave={() => interactive && setHov(0)}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} on={show >= i}
          onClick={interactive ? () => onSet(i) : null}
          onEnter={interactive ? () => setHov(i) : null}
        />
      ))}
    </div>
  );
}

/* ─── Rating distribution bar ───────────────────────── */
function DistBar({ star, count, total, trackColor, lblColor }) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  const lbl = { fontSize:11, color:lblColor||"#5b6890", fontFamily:"monospace", minWidth:12, textAlign:"right" };
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
      <span style={lbl}>{star}</span>
      <svg width={11} height={11} viewBox="0 0 20 20" style={{ flexShrink:0 }}>
        <polygon points="10,1.5 12.35,7.24 18.54,7.64 13.97,11.6 15.45,17.64 10,14.25 4.55,17.64 6.03,11.6 1.46,7.64 7.65,7.24" fill="#5b8dee"/>
      </svg>
      <div style={{ flex:1, height:4, borderRadius:2, background:trackColor||"rgba(255,255,255,.05)", overflow:"hidden" }}>
        <div style={{
          height:"100%", borderRadius:2,
          background: star >= 4 ? "#5b8dee" : star === 3 ? "#f59e0b" : "#ef4444",
          width: pct + "%",
          transition: "width .9s cubic-bezier(.4,0,.2,1)",
        }}/>
      </div>
      <span style={lbl}>{count}</span>
    </div>
  );
}

/* ─── Single review card ────────────────────────────── */
function Card({ r, onHelpful, isNight, T }) {
  const [pal] = useState(() => getPalette(r.initials));
  const [clicked, setClicked] = useState(false);
  const [helpN, setHelpN] = useState(r.helpful || 0);
  const d = new Date(r.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  const t = T || {};
  const cardBg  = t.cardBg  || "rgba(255,255,255,.025)";
  const cardBdr = t.cardBdr || "rgba(255,255,255,.07)";
  const nameC   = isNight === false ? "#1a1f3c" : "#e8ecf8";
  const textC   = isNight === false ? "#4a5568"  : "#8892a4";
  const dateC   = isNight === false ? "#8892a4"  : "#5b6890";
  const titleC  = isNight === false ? "#1a2040"  : "#cdd4e8";

  return (
    <div style={{ ...S.card, background:cardBg, borderColor:cardBdr }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(91,141,238,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = cardBdr; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* top row */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:11 }}>
          <div style={{
            width:40, height:40, borderRadius:"50%", flexShrink:0,
            background:`linear-gradient(135deg,${pal[0]},${pal[1]})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:13, fontWeight:700, color:pal[0],
            border:`1.5px solid ${pal[0]}35`,
          }}>{r.initials}</div>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
              <span style={{ ...S.cardName, color:nameC }}>{r.name}</span>
              {r.verified && (
                <span style={S.verifiedBadge}>✓ Verified</span>
              )}
            </div>
            <span style={{ ...S.cardDate, color:dateC }}>{d}</span>
          </div>
        </div>
        {r.service && <span style={S.servicePill}>{r.service}</span>}
      </div>

      {/* stars + title */}
      <div style={{ marginBottom:8 }}>
        <StarRow val={r.rating} size={13}/>
        {r.title && <div style={{ ...S.cardTitle, color:titleC }}>{r.title}</div>}
      </div>

      <p style={{ ...S.cardText, color:textC }}>{r.text}</p>

      {/* helpful */}
      <div style={{ ...S.cardFooter, borderTopColor: isNight===false ? "rgba(91,141,238,.1)" : "rgba(255,255,255,.04)" }}>
        <span style={{ ...S.cardDate, color:dateC }}>Helpful?</span>
        <button
          style={{
            ...S.helpBtn,
            color: clicked ? "#10b981" : dateC,
            borderColor: clicked ? "rgba(16,185,129,0.3)" : (isNight===false ? "rgba(91,141,238,.15)" : "rgba(255,255,255,0.07)"),
            background: clicked ? "rgba(16,185,129,0.08)" : "transparent",
          }}
          onClick={() => {
            if (!clicked) { setClicked(true); setHelpN(n => n + 1); onHelpful && onHelpful(r.id); }
          }}
        >
          <svg width={11} height={11} viewBox="0 0 20 20" fill={clicked?"#10b981":"none"} style={{ flexShrink:0 }}>
            <path d="M7 10l-3.5 3.5V4.5a1 1 0 011-1H9a1 1 0 01.85.48L12.5 8H17a1 1 0 011 1v.5a1 1 0 01-.15.53L15 14H7.5a1 1 0 01-1-1z" stroke={clicked?"#10b981":dateC} strokeWidth="1.3"/>
          </svg>
          {helpN}
        </button>
      </div>
    </div>
  );
}

/* ─── Submit form ───────────────────────────────────── */
function Form({ onSubmit, isNight, T }) {
  const [name, setName]       = useState("");
  const [service, setService] = useState("");
  const [title, setTitle]     = useState("");
  const [text, setText]       = useState("");
  const [rating, setRating]   = useState(0);
  const [errs, setErrs]       = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const validate = () => {
    const e = {};
    if (!rating)             e.rating  = "Pick a star rating";
    if (!name.trim())        e.name    = "Your name is required";
    if (!service)            e.service = "Select a service";
    if (text.trim().length < 15) e.text = "Write at least 15 characters";
    setErrs(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      onSubmit({ name: name.trim(), service, title: title.trim(), text: text.trim(), rating });
      setDone(true);
      setLoading(false);
    }, 1000);
  };

  const t = T || {};
  const formBg   = t.formBg   || "rgba(255,255,255,.03)";
  const formBdr  = t.formBdr  || "rgba(91,141,238,.18)";
  const inpBg    = t.inpBg    || "rgba(255,255,255,.035)";
  const inpBdr   = t.inpBdr   || "rgba(255,255,255,.08)";
  const inpColor = t.inpColor || "#e8ecf8";
  const titleC   = isNight === false ? "#1a1f3c" : "#e8ecf8";
  const subC     = isNight === false ? "#5b6890" : "#8892a4";
  const lblC     = isNight === false ? "#8892a4" : "#5b6890";
  const starOff  = isNight === false ? "#dce5f8" : "#1a1f40";
  const starOffBdr = isNight === false ? "#b8c8ee" : "#2a3060";

  if (done) return (
    <div style={{ background:formBg, border:`1px solid rgba(16,185,129,0.25)`, borderRadius:16, padding:"22px 20px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:260, textAlign:"center", gap:14 }}>
      <div style={{ width:60, height:60, borderRadius:"50%", background:"rgba(16,185,129,0.1)", border:"2px solid rgba(16,185,129,0.35)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ fontFamily:"DM Sans,sans-serif", fontSize:18, fontWeight:700, color:titleC }}>Review Published!</div>
      <div style={{ fontSize:13, color:subC, lineHeight:1.6 }}>Thank you for your feedback.<br/>It helps others trust Pokhrel Services.</div>
    </div>
  );

  const normInpBdr = errs_ => errs_ ? "rgba(239,68,68,.4)" : inpBdr;
  const inpSt = { width:"100%", padding:"9px 12px", borderRadius:9, fontSize:12.5, background:inpBg, color:inpColor, fontFamily:"DM Sans,sans-serif", transition:"border-color .18s,box-shadow .18s", boxSizing:"border-box" };

  return (
    <div style={{ background:formBg, border:`1px solid ${formBdr}`, borderRadius:16, padding:"22px 20px", boxShadow:`0 0 40px ${t.formShadow||"rgba(91,141,238,.05)"}` }}>
      <div style={S.formHeader}>
        <div style={S.formIcon}>
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#5b8dee" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div style={{ ...S.formTitle, color:titleC }}>Leave a Review</div>
          <div style={{ ...S.formSub, color:subC }}>Your experience helps Pratik improve.</div>
        </div>
      </div>

      {/* Star picker */}
      <div style={{ marginBottom:16 }}>
        <div style={{ ...S.lbl, color:lblC }}>Rating *</div>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          {[1,2,3,4,5].map(i => (
            <button key={i} onClick={() => setRating(i)} style={S.starBtn}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.25)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <svg width={24} height={24} viewBox="0 0 20 20">
                <polygon points="10,1.5 12.35,7.24 18.54,7.64 13.97,11.6 15.45,17.64 10,14.25 4.55,17.64 6.03,11.6 1.46,7.64 7.65,7.24"
                  fill={rating >= i ? "#5b8dee" : starOff} stroke={rating >= i ? "#5b8dee" : starOffBdr} strokeWidth="0.7"/>
              </svg>
            </button>
          ))}
          {rating > 0 && <span style={{ fontSize:12, color:"#5b8dee", marginLeft:5 }}>{["","Poor","Fair","Good","Great","Excellent!"][rating]}</span>}
        </div>
        {errs.rating && <div style={S.err}>{errs.rating}</div>}
      </div>

      {/* Name + Service */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div>
          <div style={{ ...S.lbl, color:lblC }}>Your Name *</div>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            style={{ ...inpSt, border:`1px solid ${normInpBdr(errs.name)}` }}
          />
          {errs.name && <div style={S.err}>{errs.name}</div>}
        </div>
        <div>
          <div style={{ ...S.lbl, color:lblC }}>Service *</div>
          <select value={service} onChange={e => setService(e.target.value)}
            style={{ ...inpSt, border:`1px solid ${normInpBdr(errs.service)}`, appearance:"none", WebkitAppearance:"none" }}
          >
            <option value="">Select...</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errs.service && <div style={S.err}>{errs.service}</div>}
        </div>
      </div>

      {/* Headline */}
      <div style={{ marginBottom:12 }}>
        <div style={{ ...S.lbl, color:lblC }}>Headline (optional)</div>
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Outstanding work, exceeded expectations"
          style={{ ...inpSt, border:`1px solid ${inpBdr}` }}
        />
      </div>

      {/* Body */}
      <div style={{ marginBottom:18 }}>
        <div style={{ ...S.lbl, color:lblC }}>Your Review *</div>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
          placeholder="Share the quality, communication, delivery experience..."
          style={{ ...inpSt, resize:"vertical", minHeight:88, border:`1px solid ${normInpBdr(errs.text)}` }}
        />
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
          {errs.text ? <div style={S.err}>{errs.text}</div> : <div/>}
          <span style={{ fontSize:11, color: text.length >= 15 ? "#10b981" : lblC }}>{text.length}/15 min</span>
        </div>
      </div>

      <button onClick={submit} disabled={loading} style={{
        ...S.submitBtn,
        opacity: loading ? .6 : 1,
        cursor: loading ? "not-allowed" : "pointer",
      }}
      onMouseEnter={e => { if(!loading) e.currentTarget.style.transform="translateY(-1px)"; }}
      onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
      >
        {loading ? (
          <span style={{ display:"flex", alignItems:"center", gap:8 }}>
            <svg style={{ animation:"spin 1s linear infinite" }} width={14} height={14} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.3)" strokeWidth="2.5"/>
              <path d="M12 2a10 10 0 0110 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Publishing...
          </span>
        ) : "Submit Review"}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT — drop-in replacement for ReviewPage
   ═══════════════════════════════════════════════════════ */
export default function ReviewPage({ isNight = true }) {
  const [reviews, setReviews] = useState(() => {
    try {
      const s = localStorage.getItem(LS_KEY);
      return s ? JSON.parse(s) : SEED;
    } catch { return SEED; }
  });

  const [filter, setFilter] = useState("all");
  const [sort, setSort]     = useState("recent");
  const [ready, setReady]   = useState(false);

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(reviews)); } catch {}
  }, [reviews]);

  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  const handleSubmit = useCallback((data) => {
    const initials = data.name.split(" ").map(w => w[0].toUpperCase()).join("").slice(0, 2) || "??";
    setReviews(prev => [{
      id: "u" + Date.now(),
      name: data.name, initials, service: data.service,
      rating: data.rating, title: data.title, text: data.text,
      date: new Date().toISOString().slice(0, 10),
      verified: false, helpful: 0,
    }, ...prev]);
  }, []);

  const handleHelpful = useCallback((id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, helpful: (r.helpful || 0) + 1 } : r));
  }, []);

  /* Theme tokens — day vs night */
 const T = isNight ? {
  page:        "#000000",
 heroBg: "linear-gradient(180deg,#020617 0%, #050505 100%)",
  heroBorder:  "rgba(255,255,255,.06)",
  glow1:       "rgba(91,141,238,.05)",
  glow2:       "rgba(139,92,246,.04)",

  titleColor:  "#ffffff",
  subColor:    "#9aa4b2",

  eyebrowBg:   "rgba(91,141,238,.15)",
  eyebrowBdr:  "rgba(91,141,238,.3)",
  eyebrowText: "#5b8dee",

  cardBg:      "rgba(255,255,255,.04)",
  cardBdr:     "rgba(255,255,255,.08)",

  metricBg:    "rgba(255,255,255,.04)",
  metricBdr:   "rgba(255,255,255,.08)",

  avgCardBg:   "rgba(255,255,255,.04)",
  avgCardBdr:  "rgba(255,255,255,.08)",

  divider:     "rgba(255,255,255,.08)",
  barTrack:    "rgba(255,255,255,.08)",
  distLbl:     "#9aa4b2",

  contentBg:   "#000000",
  barBg:       "#000000",

  filterNorm:  "rgba(255,255,255,.05)",
  filterNormBdr:"rgba(255,255,255,.1)",
  filterNormC: "#9aa4b2",

  sortBg:      "rgba(255,255,255,.05)",
  sortBdr:     "rgba(255,255,255,.1)",
  sortColor:   "#9aa4b2",

  trustBg:     "rgba(255,255,255,.03)",
  trustBdr:    "rgba(255,255,255,.06)",
  trustText:   "#9aa4b2",

  emptyBdr:    "rgba(255,255,255,.1)",
  emptyText:   "#9aa4b2",

  formBg:      "rgba(255,255,255,.05)",
  formBdr:     "rgba(91,141,238,.25)",
  formShadow:  "rgba(91,141,238,.08)",

  inpBg:       "rgba(255,255,255,.06)",
  inpBdr:      "rgba(255,255,255,.12)",
  inpColor:    "#ffffff",

  footerBdr:   "rgba(255,255,255,.06)",
} : {
  page:        "#f8fbff",

  // ✅ FIXED HERO (main issue)
  heroBg:      "linear-gradient(180deg,#eef4ff 0%, #ffffff 100%)",
  heroBorder:  "rgba(91,141,238,.15)",

  glow1:       "rgba(91,141,238,.08)",
  glow2:       "rgba(139,92,246,.05)",

  titleColor:  "#0f172a",
  subColor:    "#5b6890",

  eyebrowBg:   "rgba(91,141,238,.08)",
  eyebrowBdr:  "rgba(91,141,238,.2)",
  eyebrowText: "#3a6fd8",

  cardBg:      "#ffffff",
  cardBdr:     "rgba(91,141,238,.14)",

  metricBg:    "#ffffff",
  metricBdr:   "rgba(91,141,238,.14)",

  avgCardBg:   "#ffffff",
  avgCardBdr:  "rgba(91,141,238,.14)",

  divider:     "rgba(91,141,238,.12)",
  barTrack:    "rgba(91,141,238,.08)",
  distLbl:     "#64748b",

  contentBg:   "#f8fbff",
  barBg:       "#f8fbff",

  filterNorm:  "rgba(91,141,238,.05)",
  filterNormBdr:"rgba(91,141,238,.15)",
  filterNormC: "#64748b",

  sortBg:      "rgba(91,141,238,.05)",
  sortBdr:     "rgba(91,141,238,.15)",
  sortColor:   "#475569",

  trustBg:     "rgba(91,141,238,.04)",
  trustBdr:    "rgba(91,141,238,.12)",
  trustText:   "#64748b",

  emptyBdr:    "rgba(91,141,238,.15)",
  emptyText:   "#64748b",

  formBg:      "#ffffff",
  formBdr:     "rgba(91,141,238,.25)",
  formShadow:  "rgba(91,141,238,.08)",

  inpBg:       "#ffffff",
  inpBdr:      "rgba(91,141,238,.2)",
  inpColor:    "#0f172a",

  footerBdr:   "rgba(91,141,238,.12)",
};

  /* Stats */
  const total  = reviews.length;
  const avg    = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const dist   = [5,4,3,2,1].map(s => ({ star:s, count:reviews.filter(r => r.rating === s).length }));
  const fivePct = total ? Math.round((dist[0].count / total) * 100) : 0;
  const verifiedN = reviews.filter(r => r.verified).length;

  /* Filtered + sorted */
  let visible = [...reviews];
  if (filter !== "all") visible = visible.filter(r => r.rating === +filter);
  if (sort === "recent")  visible.sort((a,b) => new Date(b.date) - new Date(a.date));
  if (sort === "top")     visible.sort((a,b) => b.rating - a.rating || new Date(b.date) - new Date(a.date));
  if (sort === "helpful") visible.sort((a,b) => (b.helpful||0) - (a.helpful||0));

  const FILTER_OPTS = [
    { v:"all", label:`All (${total})` },
    { v:"5", label:"5★" }, { v:"4", label:"4★" },
    { v:"3", label:"3★" }, { v:"2", label:"2★" }, { v:"1", label:"1★" },
  ];

  return (
    <div style={{ ...S.page, background: T.page }}>
      <style>{`
        @keyframes up  { from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes pulse{ 0%,100%{opacity:1}50%{opacity:.45} }
        select option { background:${isNight?"#0c0f20":"#ffffff"}; color:${isNight?"#e8ecf8":"#1a1f3c"}; }
        ::placeholder  { color:${isNight?"#2e3460":"#b0bcd4"}!important; }
        *::-webkit-scrollbar{ width:3px; }
        *::-webkit-scrollbar-thumb{ background:${isNight?"#1e2448":"#d0d8ef"}; border-radius:2px; }
        input:focus,textarea:focus,select:focus{
          border-color:rgba(91,141,238,.55)!important;
          box-shadow:0 0 0 3px rgba(91,141,238,.08);
          outline:none;
        }
        @media(max-width:680px){
          .rp-cols{ flex-direction:column!important; }
          .rp-grid{ grid-template-columns:1fr!important; }
          .rp-form-row{ grid-template-columns:1fr!important; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <div style={{ ...S.hero, background:T.heroBg, borderBottomColor:T.heroBorder }}>
        <div style={{ ...S.glow1, background:T.glow1 }}/>
        <div style={{ ...S.glow2, background:T.glow2 }}/>

        <div style={S.heroInner}>
          <div style={{
            ...S.eyebrow,
            background:T.eyebrowBg, borderColor:T.eyebrowBdr, color:T.eyebrowText,
            animation: ready ? "up .4s ease both" : "none",
          }}>
            <div style={{ ...S.eyebrowDot, background:T.eyebrowText }}/>
            Client Testimonials · Pokhrel Services
          </div>

          <h2 style={{ ...S.heroTitle, color:T.titleColor, animation: ready ? "up .45s .04s ease both" : "none" }}>
            What Clients Say
          </h2>
          <p style={{ ...S.heroSub, color:T.subColor, animation: ready ? "up .45s .08s ease both" : "none" }}>
            Real feedback from real projects — unedited, unfiltered.
          </p>

          <div className="rp-cols" style={{ ...S.statsRow, animation: ready ? "up .5s .12s ease both" : "none" }}>

            {/* Average block */}
            <div style={{ ...S.avgCard, background:T.avgCardBg, borderColor:T.avgCardBdr }}>
              <div style={{ display:"flex", alignItems:"flex-end", gap:10 }}>
                <span style={S.avgNum}>{avg.toFixed(1)}</span>
                <div style={{ paddingBottom:6 }}>
                  <StarRow val={Math.round(avg)} size={14}/>
                  <div style={{ fontSize:11, color:T.distLbl, marginTop:3 }}>out of 5.0</div>
                </div>
              </div>
              <div style={{ ...S.dividerV, background:T.divider }}/>
              <div style={{ flex:1 }}>
                {dist.map(d => (
                  <DistBar key={d.star} star={d.star} count={d.count} total={total}
                    trackColor={T.barTrack} lblColor={T.distLbl}/>
                ))}
              </div>
            </div>

            {/* 3 metric pills */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, flex:1 }}>
              {[
                { label:"Total Reviews",    val:total,      color:"#5b8dee", icon:"M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1" },
                { label:"5-Star Rate",      val:fivePct+"%",color:"#10b981", icon:"M13 10V3L4 14h7v7l9-11h-7z" },
                { label:"Verified Clients", val:verifiedN,  color:"#8b5cf6", icon:"M9 12l2 2 4-4M7.8 4.7a3.4 3.4 0 001.9-.8 3.4 3.4 0 014.4 0 3.4 3.4 0 001.9.8 3.4 3.4 0 013.1 3.1 3.4 3.4 0 00.8 1.9 3.4 3.4 0 010 4.4 3.4 3.4 0 00-.8 1.9 3.4 3.4 0 01-3.1 3.1 3.4 3.4 0 00-1.9.8 3.4 3.4 0 01-4.4 0 3.4 3.4 0 00-1.9-.8 3.4 3.4 0 01-3.1-3.1 3.4 3.4 0 00-.8-1.9 3.4 3.4 0 010-4.4 3.4 3.4 0 00.8-1.9 3.4 3.4 0 013.1-3.1z" },
              ].map(m => (
                <div key={m.label}
                  style={{ ...S.metricCard, background:T.metricBg, borderColor:T.metricBdr }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = m.color + "45"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = T.metricBdr}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
                    <path d={m.icon} stroke={m.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize:11, color:T.subColor, flex:1 }}>{m.label}</span>
                  <span style={{ fontSize:16, fontWeight:700, color:m.color, fontFamily:"DM Sans,sans-serif" }}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div style={S.content}>

        {/* Filter + sort bar */}
        <div style={S.bar}>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {FILTER_OPTS.map(f => (
              <button key={f.v} onClick={() => setFilter(f.v)} style={{
                ...S.filterBtn,
                borderColor: filter === f.v ? "rgba(91,141,238,.5)" : T.filterNormBdr,
                background:  filter === f.v ? "rgba(91,141,238,.1)" : T.filterNorm,
                color:       filter === f.v ? "#5b8dee"             : T.filterNormC,
              }}>{f.label}</button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ ...S.sortSel, background:T.sortBg, borderColor:T.sortBdr, color:T.sortColor }}>
            <option value="recent">Most Recent</option>
            <option value="top">Top Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>

        {/* Two-col: cards left, form right */}
        <div className="rp-cols" style={{ display:"flex", gap:20, alignItems:"flex-start" }}>

          {/* Cards */}
          <div style={{ flex:1, minWidth:0 }}>
            {visible.length === 0 ? (
              <div style={{ ...S.empty, borderColor:T.emptyBdr }}>
                <div style={{ fontSize:28, marginBottom:10, opacity:.3 }}>◎</div>
                <div style={{ fontSize:14, color:T.emptyText }}>No reviews for this filter</div>
              </div>
            ) : (
              <div className="rp-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
                {visible.map((r, i) => (
                  <div key={r.id} style={{ animation:`up .35s ${i * 0.04}s ease both` }}>
                    <Card r={r} onHelpful={handleHelpful} isNight={isNight} T={T}/>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sticky form */}
          <div style={{ width:300, flexShrink:0, position:"sticky", top:20 }}>
            <Form onSubmit={handleSubmit} isNight={isNight} T={T}/>
          </div>
        </div>

        {/* Trust footer */}
        <div style={{ ...S.trustBar, background:T.trustBg, borderColor:T.trustBdr }}>
          {[
            { icon:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", txt:"All reviews genuine & unedited" },
            { icon:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", txt:"Contact: itspratikpok@gmail.com" },
            { icon:"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064", txt:"Clients from Nepal, India & beyond" },
          ].map((t,i) => (
            <div key={i} style={{ ...S.trustItem, color:T.trustText }}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
                <path d={t.icon} stroke="#5b8dee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{t.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STYLES — matching your existing DM Sans dark theme
   ═══════════════════════════════════════════════════════ */
const S = {
  page: {
    fontFamily:"DM Sans, sans-serif",
    color:"#e8ecf8",
    minHeight:"100vh",
    paddingBottom:60,
  },

  /* Hero */
  hero: {
    position:"relative", overflow:"hidden",
    background:"linear-gradient(180deg,rgba(10,12,30,.95) 0%,rgba(5,6,18,.98) 100%)",
    borderBottom:"1px solid rgba(255,255,255,.04)",
    padding:"50px 0 40px",
  },
  glow1:{ position:"absolute",top:-100,left:"18%",width:420,height:420,borderRadius:"50%",background:"rgba(91,141,238,.04)",filter:"blur(80px)",pointerEvents:"none" },
  glow2:{ position:"absolute",bottom:-80,right:"12%",width:360,height:360,borderRadius:"50%",background:"rgba(139,92,246,.03)",filter:"blur(80px)",pointerEvents:"none" },
  heroInner:{ maxWidth:900,margin:"0 auto",padding:"0 20px" },
  eyebrow:{
    display:"inline-flex",alignItems:"center",gap:8,
    padding:"4px 14px",borderRadius:30,marginBottom:18,
    background:"rgba(91,141,238,.1)",border:"1px solid rgba(91,141,238,.22)",
    fontSize:11.5,color:"#5b8dee",letterSpacing:"0.4px",
  },
  eyebrowDot:{ width:6,height:6,borderRadius:"50%",background:"#5b8dee",animation:"pulse 2s ease-in-out infinite",flexShrink:0 },
  heroTitle:{ fontSize:"clamp(24px,4.5vw,40px)",fontWeight:700,lineHeight:1.12,marginBottom:10,color:"#e8ecf8" },
  heroSub:{ fontSize:13.5,color:"#8892a4",marginBottom:30,lineHeight:1.6 },

  /* Stats */
  statsRow:{ display:"flex",gap:14,flexWrap:"wrap" },
  avgCard:{
    background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",
    borderRadius:14,padding:"18px 20px",display:"flex",alignItems:"center",gap:18,
    minWidth:220,
  },
  avgNum:{ fontFamily:"DM Sans,sans-serif",fontSize:44,fontWeight:700,color:"#5b8dee",lineHeight:1 },
  dividerV:{ width:1,height:58,background:"rgba(255,255,255,.06)",flexShrink:0 },
  metricCard:{
    background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",
    borderRadius:12,padding:"11px 16px",display:"flex",alignItems:"center",gap:10,
    transition:"border-color .22s",
  },
  distLbl:{ fontSize:11,color:"#5b6890",fontFamily:"monospace",minWidth:12,textAlign:"right" },

  /* Content */
  content:{ maxWidth:900,margin:"0 auto",padding:"32px 20px 0" },
  bar:{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,marginBottom:20,flexWrap:"wrap" },
  filterBtn:{
    padding:"5px 13px",borderRadius:20,fontSize:11.5,
    fontFamily:"monospace",cursor:"pointer",border:"1px solid",transition:"all .16s",
  },
  sortSel:{
    padding:"6px 28px 6px 11px",borderRadius:20,fontSize:12,
    background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",
    color:"#8892a4",appearance:"none",WebkitAppearance:"none",cursor:"pointer",
    backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%238892a4' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
    backgroundRepeat:"no-repeat",backgroundPosition:"right 9px center",
  },

  /* Card */
  card:{
    padding:"17px 18px",borderRadius:14,
    background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",
    transition:"border-color .22s,transform .22s",height:"100%",boxSizing:"border-box",
  },
  cardName:{ fontSize:13.5,fontWeight:600,color:"#e8ecf8" },
  verifiedBadge:{
    fontSize:9.5,padding:"2px 7px",borderRadius:20,
    background:"rgba(16,185,129,.09)",border:"1px solid rgba(16,185,129,.22)",
    color:"#10b981",fontFamily:"monospace",
  },
  servicePill:{
    fontSize:10,padding:"2px 9px",borderRadius:20,flexShrink:0,
    background:"rgba(91,141,238,.08)",border:"1px solid rgba(91,141,238,.2)",
    color:"#5b8dee",fontFamily:"monospace",
  },
  cardDate:{ fontSize:11,color:"#5b6890",display:"block",marginTop:2 },
  cardTitle:{ fontSize:13.5,fontWeight:600,color:"#cdd4e8",marginTop:6 },
  cardText:{ fontSize:13,color:"#8892a4",lineHeight:1.62,margin:"8px 0 0" },
  cardFooter:{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.04)" },
  helpBtn:{
    display:"flex",alignItems:"center",gap:5,padding:"3px 10px",
    borderRadius:20,border:"1px solid",fontSize:11.5,fontFamily:"monospace",
    cursor:"pointer",transition:"all .18s",background:"transparent",
  },

  /* Form */
  form:{
    background:"rgba(255,255,255,.03)",border:"1px solid rgba(91,141,238,.18)",
    borderRadius:16,padding:"22px 20px",
    boxShadow:"0 0 40px rgba(91,141,238,.05)",
  },
  formHeader:{ display:"flex",alignItems:"center",gap:10,marginBottom:20 },
  formIcon:{
    width:32,height:32,borderRadius:9,flexShrink:0,
    background:"rgba(91,141,238,.1)",border:"1px solid rgba(91,141,238,.22)",
    display:"flex",alignItems:"center",justifyContent:"center",
  },
  formTitle:{ fontSize:15,fontWeight:700,color:"#e8ecf8" },
  formSub:{ fontSize:11,color:"#5b6890",marginTop:2 },
  lbl:{ fontSize:10.5,color:"#5b6890",marginBottom:6,letterSpacing:"0.5px",textTransform:"uppercase",fontFamily:"monospace" },
  inp:{
    width:"100%",padding:"9px 12px",borderRadius:9,fontSize:12.5,
    background:"rgba(255,255,255,.035)",border:"1px solid rgba(255,255,255,.08)",
    color:"#e8ecf8",fontFamily:"DM Sans,sans-serif",
    transition:"border-color .18s,box-shadow .18s",boxSizing:"border-box",
  },
  starBtn:{ background:"none",border:"none",cursor:"pointer",padding:2,transition:"transform .12s" },
  err:{ fontSize:10.5,color:"#ef4444",marginTop:3,fontFamily:"monospace" },
  submitBtn:{
    width:"100%",padding:"11px",borderRadius:10,
    background:"linear-gradient(135deg,#5b8dee,#8b5cf6)",
    border:"none",color:"#fff",fontSize:13.5,fontWeight:600,
    transition:"transform .18s,opacity .18s",letterSpacing:"0.2px",
  },

  /* Trust bar */
  trustBar:{
    marginTop:40,padding:"16px 20px",
    background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.04)",
    borderRadius:12,display:"flex",gap:24,flexWrap:"wrap",justifyContent:"center",
  },
  trustItem:{ display:"flex",alignItems:"center",gap:7,fontSize:11.5,color:"#5b6890" },

  /* Empty state */
  empty:{
    textAlign:"center",padding:"48px 24px",
    border:"1px dashed rgba(255,255,255,.06)",borderRadius:14,
  },
};