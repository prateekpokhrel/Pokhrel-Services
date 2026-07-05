import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   POKHREL SERVICES — REVIEWS PAGE (Premium Upgrade)
   Persists to localStorage · Advanced Glassmorphism UI
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
  ["#3b82f6","#1e3a8a"],["#8b5cf6","#4c1d95"],["#10b981","#064e3b"],
  ["#f59e0b","#78350f"],["#ec4899","#831843"],["#06b6d4","#164e63"],
  ["#6366f1","#312e81"],["#f43f5e","#881337"],["#14b8a6","#134e4a"],
];

function getPalette(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_PALETTES[Math.abs(h) % AVATAR_PALETTES.length];
}

/* ─── SVG Star ──────────────────────────────────────── */
function Star({ on, size = 15, onClick, onEnter }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20"
      style={{ cursor: onClick ? "pointer" : "default", flexShrink: 0, filter: on ? "drop-shadow(0 0 2px rgba(91,141,238,0.4))" : "none" }}
      onClick={onClick} onMouseEnter={onEnter}
    >
      <polygon
        points="10,1.5 12.35,7.24 18.54,7.64 13.97,11.6 15.45,17.64 10,14.25 4.55,17.64 6.03,11.6 1.46,7.64 7.65,7.24"
        fill={on ? "#3b82f6" : "rgba(148, 163, 184, 0.15)"}
        stroke={on ? "#3b82f6" : "rgba(148, 163, 184, 0.3)"}
        strokeWidth="0.8"
        style={{ transition: "all .2s ease" }}
      />
    </svg>
  );
}

function StarRow({ val, size, interactive, onSet }) {
  const [hov, setHov] = useState(0);
  const show = interactive ? (hov || val) : val;
  return (
    <div style={{ display:"flex", gap:4 }} onMouseLeave={() => interactive && setHov(0)}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} on={show >= i}
          onClick={interactive ? () => onSet(i) : null}
          onEnter={interactive ? () => setHov(i) : null}
        />
      ))}
    </div>
  );
}

/* ─── Rating Distribution Bar ───────────────────────── */
function DistBar({ star, count, total, trackColor, lblColor }) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  const lbl = { fontSize:12, color:lblColor, fontFamily:"monospace", minWidth:14, textAlign:"right", fontWeight: 500 };
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
      <span style={lbl}>{star}</span>
      <svg width={12} height={12} viewBox="0 0 20 20" style={{ flexShrink:0 }}>
        <polygon points="10,1.5 12.35,7.24 18.54,7.64 13.97,11.6 15.45,17.64 10,14.25 4.55,17.64 6.03,11.6 1.46,7.64 7.65,7.24" fill="#3b82f6"/>
      </svg>
      <div style={{ flex:1, height:6, borderRadius:3, background:trackColor, overflow:"hidden", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)" }}>
        <div style={{
          height:"100%", borderRadius:3,
          background: star >= 4 ? "linear-gradient(90deg, #3b82f6, #60a5fa)" : star === 3 ? "linear-gradient(90deg, #f59e0b, #fbbf24)" : "linear-gradient(90deg, #ef4444, #f87171)",
          width: pct + "%",
          transition: "width 1s cubic-bezier(.4,0,.2,1)",
        }}/>
      </div>
      <span style={lbl}>{count}</span>
    </div>
  );
}

/* ─── Single Review Card ────────────────────────────── */
function Card({ r, onHelpful, isNight, T }) {
  const [pal] = useState(() => getPalette(r.initials));
  const [clicked, setClicked] = useState(false);
  const [helpN, setHelpN] = useState(r.helpful || 0);
  const d = new Date(r.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});

  return (
    <div style={{ ...S.card, background:T.cardBg, borderColor:T.cardBdr, backdropFilter:T.glassBlur, boxShadow:T.cardShadow }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = T.cardHoverShadow; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.cardBdr; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.cardShadow; }}
    >
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{
            width:42, height:42, borderRadius:"50%", flexShrink:0,
            background:`linear-gradient(135deg,${pal[0]},${pal[1]})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:14, fontWeight:700, color:"#fff",
            boxShadow: `0 4px 12px ${pal[0]}40`
          }}>{r.initials}</div>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
              <span style={{ ...S.cardName, color:T.titleColor }}>{r.name}</span>
              {r.verified && (
                <span style={{...S.verifiedBadge, background: isNight ? "rgba(16,185,129,.1)" : "#d1fae5"}}>
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" style={{marginRight:3, display:'inline-block'}}>
                    <path d="M20 6L9 17l-5-5" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Verified
                </span>
              )}
            </div>
            <span style={{ ...S.cardDate, color:T.subColor }}>{d}</span>
          </div>
        </div>
        {r.service && <span style={{...S.servicePill, background: isNight ? "rgba(59,130,246,.1)" : "#e0e7ff", color: isNight ? "#60a5fa" : "#3b82f6"}}>{r.service}</span>}
      </div>

      <div style={{ marginBottom:10 }}>
        <StarRow val={r.rating} size={14}/>
        {r.title && <div style={{ ...S.cardTitle, color:T.titleColor }}>{r.title}</div>}
      </div>

      <p style={{ ...S.cardText, color:T.textColor }}>{r.text}</p>

      <div style={{ ...S.cardFooter, borderTopColor: T.divider }}>
        <span style={{ ...S.cardDate, color:T.subColor }}>Was this helpful?</span>
        <button
          style={{
            ...S.helpBtn,
            color: clicked ? "#10b981" : T.subColor,
            borderColor: clicked ? "rgba(16,185,129,0.4)" : T.cardBdr,
            background: clicked ? (isNight ? "rgba(16,185,129,0.1)" : "#d1fae5") : "transparent",
          }}
          onClick={() => {
            if (!clicked) { setClicked(true); setHelpN(n => n + 1); onHelpful && onHelpful(r.id); }
          }}
        >
          <svg width={12} height={12} viewBox="0 0 20 20" fill={clicked?"#10b981":"none"} style={{ flexShrink:0 }}>
            <path d="M7 10l-3.5 3.5V4.5a1 1 0 011-1H9a1 1 0 01.85.48L12.5 8H17a1 1 0 011 1v.5a1 1 0 01-.15.53L15 14H7.5a1 1 0 01-1-1z" stroke={clicked?"#10b981":T.subColor} strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          {helpN}
        </button>
      </div>
    </div>
  );
}

/* ─── Submit Form ───────────────────────────────────── */
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
    if (!rating)             e.rating  = "Rating required";
    if (!name.trim())        e.name    = "Name required";
    if (!service)            e.service = "Service required";
    if (text.trim().length < 15) e.text = "Min 15 characters";
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
    }, 1200);
  };

  if (done) return (
    <div style={{ ...S.form, background:T.formBg, borderColor:"rgba(16,185,129,0.3)", backdropFilter:T.glassBlur, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, textAlign:"center", gap:16, boxShadow:T.cardShadow }}>
      <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(16,185,129,0.1)", border:"2px solid rgba(16,185,129,0.4)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 20px rgba(16,185,129,0.2)" }}>
        <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <div style={{ fontFamily:"DM Sans,sans-serif", fontSize:20, fontWeight:700, color:T.titleColor, marginBottom:6 }}>Review Published!</div>
        <div style={{ fontSize:14, color:T.subColor, lineHeight:1.6 }}>Thank you for your feedback.<br/>It helps others trust Pokhrel Services.</div>
      </div>
    </div>
  );

  const inpSt = { width:"100%", padding:"10px 14px", borderRadius:10, fontSize:13, background:T.inpBg, color:T.titleColor, fontFamily:"DM Sans,sans-serif", transition:"all .2s ease", boxSizing:"border-box", outline:"none" };

  return (
    <div style={{ ...S.form, background:T.formBg, borderColor:T.formBdr, backdropFilter:T.glassBlur, boxShadow:T.cardShadow }}>
      <div style={S.formHeader}>
        <div style={{...S.formIcon, background: isNight ? "rgba(59,130,246,0.1)" : "#eff6ff", borderColor: isNight ? "rgba(59,130,246,0.2)" : "#bfdbfe"}}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div style={{ ...S.formTitle, color:T.titleColor }}>Leave a Review</div>
          <div style={{ ...S.formSub, color:T.subColor }}>Your experience helps Pratik improve.</div>
        </div>
      </div>

      <div style={{ marginBottom:18 }}>
        <div style={{ ...S.lbl, color:T.subColor }}>Rating <span style={{color:"#ef4444"}}>*</span></div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          {[1,2,3,4,5].map(i => (
            <button key={i} onClick={() => setRating(i)} style={S.starBtn}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <svg width={28} height={28} viewBox="0 0 20 20">
                <polygon points="10,1.5 12.35,7.24 18.54,7.64 13.97,11.6 15.45,17.64 10,14.25 4.55,17.64 6.03,11.6 1.46,7.64 7.65,7.24"
                  fill={rating >= i ? "#3b82f6" : T.starOff} stroke={rating >= i ? "#3b82f6" : T.starOffBdr} strokeWidth="1"
                  style={{filter: rating >= i ? "drop-shadow(0 0 4px rgba(59,130,246,0.5))" : "none", transition:"all .2s"}}
                />
              </svg>
            </button>
          ))}
          {rating > 0 && <span style={{ fontSize:13, fontWeight:600, color:"#3b82f6", marginLeft:8 }}>{["","Poor","Fair","Good","Great","Excellent!"][rating]}</span>}
        </div>
        {errs.rating && <div style={S.err}>{errs.rating}</div>}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
        <div>
          <div style={{ ...S.lbl, color:T.subColor }}>Your Name <span style={{color:"#ef4444"}}>*</span></div>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            style={{ ...inpSt, border:`1px solid ${errs.name ? "rgba(239,68,68,0.5)" : T.inpBdr}` }}
            onFocus={e => e.target.style.borderColor = "#3b82f6"}
            onBlur={e => e.target.style.borderColor = errs.name ? "rgba(239,68,68,0.5)" : T.inpBdr}
          />
          {errs.name && <div style={S.err}>{errs.name}</div>}
        </div>
        <div>
          <div style={{ ...S.lbl, color:T.subColor }}>Service <span style={{color:"#ef4444"}}>*</span></div>
          <select value={service} onChange={e => setService(e.target.value)}
            style={{ ...inpSt, border:`1px solid ${errs.service ? "rgba(239,68,68,0.5)" : T.inpBdr}`, appearance:"none" }}
            onFocus={e => e.target.style.borderColor = "#3b82f6"}
            onBlur={e => e.target.style.borderColor = errs.service ? "rgba(239,68,68,0.5)" : T.inpBdr}
          >
            <option value="">Select...</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errs.service && <div style={S.err}>{errs.service}</div>}
        </div>
      </div>

      <div style={{ marginBottom:14 }}>
        <div style={{ ...S.lbl, color:T.subColor }}>Headline (optional)</div>
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Exceeded expectations"
          style={{ ...inpSt, border:`1px solid ${T.inpBdr}` }}
          onFocus={e => e.target.style.borderColor = "#3b82f6"}
          onBlur={e => e.target.style.borderColor = T.inpBdr}
        />
      </div>

      <div style={{ marginBottom:22 }}>
        <div style={{ ...S.lbl, color:T.subColor }}>Your Review <span style={{color:"#ef4444"}}>*</span></div>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
          placeholder="Share your experience working with Pratik..."
          style={{ ...inpSt, resize:"vertical", minHeight:96, border:`1px solid ${errs.text ? "rgba(239,68,68,0.5)" : T.inpBdr}` }}
          onFocus={e => e.target.style.borderColor = "#3b82f6"}
          onBlur={e => e.target.style.borderColor = errs.text ? "rgba(239,68,68,0.5)" : T.inpBdr}
        />
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
          {errs.text ? <div style={S.err}>{errs.text}</div> : <div/>}
          <span style={{ fontSize:12, fontWeight:500, color: text.length >= 15 ? "#10b981" : T.subColor }}>{text.length}/15 min</span>
        </div>
      </div>

      <button onClick={submit} disabled={loading} style={{
        ...S.submitBtn,
        opacity: loading ? 0.7 : 1,
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: loading ? "none" : "0 4px 14px rgba(59, 130, 246, 0.4)",
      }}
      onMouseEnter={e => { if(!loading) e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
      >
        {loading ? (
          <span style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}>
            <svg style={{ animation:"spin 1s linear infinite" }} width={16} height={16} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.3)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0110 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Publishing...
          </span>
        ) : "Submit Review"}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT 
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

  useEffect(() => { const t = setTimeout(() => setReady(true), 100); return () => clearTimeout(t); }, []);

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

  /* ── Enhanced Theme Tokens ── */
  const T = isNight ? {
    page:        "#020617",
    heroBg:      "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
    glassBlur:   "blur(16px)",
    
    titleColor:  "#f8fafc",
    subColor:    "#94a3b8",
    textColor:   "#cbd5e1",
    
    cardBg:      "rgba(30, 41, 59, 0.4)",
    cardBdr:     "rgba(255, 255, 255, 0.08)",
    cardShadow:  "0 4px 20px rgba(0, 0, 0, 0.2)",
    cardHoverShadow: "0 8px 30px rgba(59, 130, 246, 0.15)",
    
    divider:     "rgba(255, 255, 255, 0.06)",
    barTrack:    "rgba(15, 23, 42, 0.6)",
    
    formBg:      "rgba(30, 41, 59, 0.45)",
    formBdr:     "rgba(59, 130, 246, 0.3)",
    inpBg:       "rgba(15, 23, 42, 0.6)",
    inpBdr:      "rgba(255, 255, 255, 0.1)",
    
    starOff:     "rgba(15, 23, 42, 0.8)",
    starOffBdr:  "rgba(255, 255, 255, 0.15)",
  } : {
    page:        "#f8fafc",
    heroBg:      "linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)",
    glassBlur:   "blur(20px)",
    
    titleColor:  "#0f172a",
    subColor:    "#64748b",
    textColor:   "#475569",
    
    cardBg:      "rgba(255, 255, 255, 0.7)",
    cardBdr:     "rgba(226, 232, 240, 0.8)",
    cardShadow:  "0 4px 15px rgba(0, 0, 0, 0.03)",
    cardHoverShadow: "0 10px 30px rgba(59, 130, 246, 0.1)",
    
    divider:     "rgba(226, 232, 240, 1)",
    barTrack:    "rgba(226, 232, 240, 0.6)",
    
    formBg:      "rgba(255, 255, 255, 0.8)",
    formBdr:     "rgba(147, 197, 253, 0.5)",
    inpBg:       "rgba(248, 250, 252, 0.8)",
    inpBdr:      "rgba(203, 213, 225, 0.8)",
    
    starOff:     "rgba(241, 245, 249, 1)",
    starOffBdr:  "rgba(203, 213, 225, 1)",
  };

  const total = reviews.length;
  const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const dist = [5,4,3,2,1].map(s => ({ star:s, count:reviews.filter(r => r.rating === s).length }));
  const fivePct = total ? Math.round((dist[0].count / total) * 100) : 0;
  const verifiedN = reviews.filter(r => r.verified).length;

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
        @keyframes up  { from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        select option { background:${isNight?"#0f172a":"#ffffff"}; color:${isNight?"#f8fafc":"#0f172a"}; }
        ::placeholder  { color:${isNight?"#475569":"#94a3b8"}!important; }
        *::-webkit-scrollbar { width:6px; }
        *::-webkit-scrollbar-thumb { background:${isNight?"#334155":"#cbd5e1"}; border-radius:10px; }
        @media(max-width:768px){
          .rp-cols { flex-direction:column!important; }
          .rp-grid { grid-template-columns:1fr!important; }
          .rp-form-wrap { width: 100%!important; position: static!important; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <div style={{ ...S.hero, background:T.heroBg, borderBottomColor:T.divider }}>
        <div style={{ ...S.glow1, background: isNight ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)" }}/>
        <div style={{ ...S.glow2, background: isNight ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.1)" }}/>

        <div style={S.heroInner}>
          <div style={{
            ...S.eyebrow,
            background: isNight ? "rgba(59,130,246,0.1)" : "#eff6ff", 
            borderColor: isNight ? "rgba(59,130,246,0.2)" : "#bfdbfe", 
            color: isNight ? "#60a5fa" : "#2563eb",
            animation: ready ? "up .5s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
          }}>
            <div style={{ ...S.eyebrowDot, background: isNight ? "#60a5fa" : "#2563eb" }}/>
            Client Testimonials · Pokhrel Services
          </div>

          <h2 style={{ ...S.heroTitle, color:T.titleColor, animation: ready ? "up .5s .05s cubic-bezier(0.16, 1, 0.3, 1) both" : "none" }}>
            What Clients Say
          </h2>
          <p style={{ ...S.heroSub, color:T.subColor, animation: ready ? "up .5s .1s cubic-bezier(0.16, 1, 0.3, 1) both" : "none" }}>
            Real feedback from real projects — unedited and unfiltered.
          </p>

          <div className="rp-cols" style={{ ...S.statsRow, animation: ready ? "up .6s .15s cubic-bezier(0.16, 1, 0.3, 1) both" : "none" }}>
            <div style={{ ...S.avgCard, background:T.cardBg, borderColor:T.cardBdr, backdropFilter:T.glassBlur, boxShadow:T.cardShadow }}>
              <div style={{ display:"flex", alignItems:"flex-end", gap:14 }}>
                <span style={S.avgNum}>{avg.toFixed(1)}</span>
                <div style={{ paddingBottom:8 }}>
                  <StarRow val={Math.round(avg)} size={16}/>
                  <div style={{ fontSize:12, fontWeight:500, color:T.subColor, marginTop:4 }}>out of 5.0</div>
                </div>
              </div>
              <div style={{ ...S.dividerV, background:T.divider }}/>
              <div style={{ flex:1 }}>
                {dist.map(d => (
                  <DistBar key={d.star} star={d.star} count={d.count} total={total}
                    trackColor={T.barTrack} lblColor={T.subColor}/>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:12, flex:1 }}>
              {[
                { label:"Total Reviews",    val:total,      color:"#3b82f6", bg: isNight?"rgba(59,130,246,0.1)":"#eff6ff", icon:"M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1" },
                { label:"5-Star Rate",      val:fivePct+"%",color:"#10b981", bg: isNight?"rgba(16,185,129,0.1)":"#ecfdf5", icon:"M13 10V3L4 14h7v7l9-11h-7z" },
                { label:"Verified Clients", val:verifiedN,  color:"#8b5cf6", bg: isNight?"rgba(139,92,246,0.1)":"#f5f3ff", icon:"M9 12l2 2 4-4M7.8 4.7a3.4 3.4 0 001.9-.8 3.4 3.4 0 014.4 0 3.4 3.4 0 001.9.8 3.4 3.4 0 013.1 3.1 3.4 3.4 0 00.8 1.9 3.4 3.4 0 010 4.4 3.4 3.4 0 00-.8 1.9 3.4 3.4 0 01-3.1 3.1 3.4 3.4 0 00-1.9.8 3.4 3.4 0 01-4.4 0 3.4 3.4 0 00-1.9-.8 3.4 3.4 0 01-3.1-3.1 3.4 3.4 0 00-.8-1.9 3.4 3.4 0 010-4.4 3.4 3.4 0 00.8-1.9 3.4 3.4 0 013.1-3.1z" },
              ].map(m => (
                <div key={m.label}
                  style={{ ...S.metricCard, background:T.cardBg, borderColor:T.cardBdr, backdropFilter:T.glassBlur, boxShadow:T.cardShadow }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = m.color + "60"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = T.cardBdr}
                >
                  <div style={{ width:32, height:32, borderRadius:8, background:m.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      <path d={m.icon} stroke={m.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize:13, fontWeight:500, color:T.subColor, flex:1 }}>{m.label}</span>
                  <span style={{ fontSize:18, fontWeight:700, color:T.titleColor, fontFamily:"DM Sans,sans-serif" }}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div style={S.content}>
        <div style={S.bar}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {FILTER_OPTS.map(f => (
              <button key={f.v} onClick={() => setFilter(f.v)} style={{
                ...S.filterBtn,
                borderColor: filter === f.v ? "#3b82f6" : T.cardBdr,
                background:  filter === f.v ? "#3b82f6" : T.cardBg,
                color:       filter === f.v ? "#ffffff" : T.subColor,
                boxShadow:   filter === f.v ? "0 4px 12px rgba(59,130,246,0.3)" : "none"
              }}>{f.label}</button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ ...S.sortSel, background:T.cardBg, borderColor:T.cardBdr, color:T.titleColor }}>
            <option value="recent">Most Recent</option>
            <option value="top">Top Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>

        <div className="rp-cols" style={{ display:"flex", gap:24, alignItems:"flex-start" }}>
          <div style={{ flex:1, minWidth:0 }}>
            {visible.length === 0 ? (
              <div style={{ ...S.empty, borderColor:T.divider, background:T.cardBg, backdropFilter:T.glassBlur }}>
                <div style={{ fontSize:32, marginBottom:12, opacity:0.4, color:T.subColor }}>◎</div>
                <div style={{ fontSize:15, fontWeight:500, color:T.subColor }}>No reviews found for this filter.</div>
              </div>
            ) : (
              <div className="rp-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:20 }}>
                {visible.map((r, i) => (
                  <div key={r.id} style={{ animation:`up .4s ${i * 0.05}s cubic-bezier(0.16, 1, 0.3, 1) both` }}>
                    <Card r={r} onHelpful={handleHelpful} isNight={isNight} T={T}/>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rp-form-wrap" style={{ width:340, flexShrink:0, position:"sticky", top:24 }}>
            <Form onSubmit={handleSubmit} isNight={isNight} T={T}/>
          </div>
        </div>

        {/* ── TRUST FOOTER ───────────────────────────────── */}
        <div style={{ ...S.trustBar, background:T.cardBg, borderColor:T.cardBdr, backdropFilter:T.glassBlur }}>
          {[
            { icon:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", txt:"100% Genuine & Unedited" },
            { icon:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", txt:"itspratikpok@gmail.com" },
            { icon:"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064", txt:"Global Client Base" },
          ].map((t,i) => (
            <div key={i} style={{ ...S.trustItem, color:T.subColor }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
                <path d={t.icon} stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
   STYLES — Refined Structure
   ═══════════════════════════════════════════════════════ */
const S = {
  page: { fontFamily:"DM Sans, sans-serif", minHeight:"100vh", paddingBottom:80, transition:"background 0.3s ease" },
  
  hero: { position:"relative", overflow:"hidden", borderBottom:"1px solid", padding:"60px 0 50px" },
  glow1:{ position:"absolute", top:-120, left:"10%", width:500, height:500, borderRadius:"50%", filter:"blur(100px)", pointerEvents:"none", animation:"float 8s ease-in-out infinite" },
  glow2:{ position:"absolute", bottom:-100, right:"5%", width:400, height:400, borderRadius:"50%", filter:"blur(100px)", pointerEvents:"none", animation:"float 10s ease-in-out infinite reverse" },
  heroInner:{ maxWidth:1040, margin:"0 auto", padding:"0 24px", position:"relative", zIndex:1 },
  
  eyebrow:{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:30, marginBottom:24, border:"1px solid", fontSize:12, fontWeight:600, letterSpacing:"0.5px" },
  eyebrowDot:{ width:8, height:8, borderRadius:"50%", flexShrink:0 },
  heroTitle:{ fontSize:"clamp(32px, 5vw, 48px)", fontWeight:800, lineHeight:1.1, marginBottom:16, letterSpacing:"-0.5px" },
  heroSub:{ fontSize:16, marginBottom:40, lineHeight:1.6, maxWidth:600 },
  
  statsRow:{ display:"flex", gap:20, flexWrap:"wrap" },
  avgCard:{ border:"1px solid", borderRadius:20, padding:"24px 28px", display:"flex", alignItems:"center", gap:24, minWidth:280, flex:1.2 },
  avgNum:{ fontFamily:"DM Sans,sans-serif", fontSize:56, fontWeight:800, color:"#3b82f6", lineHeight:0.9, letterSpacing:"-1px" },
  dividerV:{ width:1, height:80, flexShrink:0 },
  metricCard:{ border:"1px solid", borderRadius:16, padding:"16px 20px", display:"flex", alignItems:"center", gap:14, transition:"all .2s ease" },
  
  content:{ maxWidth:1040, margin:"0 auto", padding:"40px 24px 0" },
  bar:{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, marginBottom:28, flexWrap:"wrap" },
  filterBtn:{ padding:"8px 18px", borderRadius:30, fontSize:13, fontWeight:600, cursor:"pointer", border:"1px solid", transition:"all .2s ease" },
  sortSel:{ padding:"8px 36px 8px 16px", borderRadius:30, fontSize:13, fontWeight:500, border:"1px solid", appearance:"none", WebkitAppearance:"none", cursor:"pointer", backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center" },
  
  card:{ padding:"24px", borderRadius:20, border:"1px solid", transition:"all .3s cubic-bezier(0.16, 1, 0.3, 1)", height:"100%", boxSizing:"border-box" },
  cardName:{ fontSize:15, fontWeight:700 },
  verifiedBadge:{ fontSize:10.5, fontWeight:600, padding:"3px 10px", borderRadius:20, color:"#10b981", display:"flex", alignItems:"center" },
  servicePill:{ fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:20, flexShrink:0 },
  cardDate:{ fontSize:12, fontWeight:500, display:"block", marginTop:4 },
  cardTitle:{ fontSize:16, fontWeight:700, marginTop:10 },
  cardText:{ fontSize:14, lineHeight:1.7, margin:"12px 0 0" },
  cardFooter:{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:20, paddingTop:16, borderTop:"1px solid" },
  helpBtn:{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", borderRadius:30, border:"1px solid", fontSize:12.5, fontWeight:600, cursor:"pointer", transition:"all .2s ease" },
  
  form:{ border:"1px solid", borderRadius:24, padding:"28px 24px" },
  formHeader:{ display:"flex", alignItems:"center", gap:14, marginBottom:24 },
  formIcon:{ width:40, height:40, borderRadius:12, flexShrink:0, border:"1px solid", display:"flex", alignItems:"center", justifyContent:"center" },
  formTitle:{ fontSize:18, fontWeight:800 },
  formSub:{ fontSize:13, marginTop:2 },
  lbl:{ fontSize:12, fontWeight:600, marginBottom:8 },
  starBtn:{ background:"none", border:"none", cursor:"pointer", padding:2, transition:"transform .2s ease" },
  err:{ fontSize:12, fontWeight:500, color:"#ef4444", marginTop:6 },
  submitBtn:{ width:"100%", padding:"14px", borderRadius:12, background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", border:"none", color:"#fff", fontSize:15, fontWeight:700, transition:"all .2s ease" },
  
  trustBar:{ marginTop:50, padding:"24px", border:"1px solid", borderRadius:16, display:"flex", gap:32, flexWrap:"wrap", justifyContent:"center" },
  trustItem:{ display:"flex", alignItems:"center", gap:10, fontSize:13, fontWeight:600 },
  
  empty:{ textAlign:"center", padding:"60px 24px", border:"1px dashed", borderRadius:20 },
};