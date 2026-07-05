import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   POKHREL SERVICES — AUTHENTIC REVIEWS PAGE
   Dashboard / Feed Layout (Trustpilot / Platform Style)
   ═══════════════════════════════════════════════════════ */

const LS_KEY = "pokhrel_reviews_v1";

const SEED = [
  { id:"s1", name:"Rahul Sharma",    initials:"RS", rating:5, service:"Web Development",  verified:true,  helpful:9,  date:"2025-02-18", title:"Outstanding work", text:"Clean architecture and very professional delivery. Every pixel was exactly what we asked for — and then some. Would rehire immediately." },
  { id:"s2", name:"Ankit Verma",     initials:"AV", rating:4, service:"Full Stack App",   verified:true,  helpful:6,  date:"2025-01-30", title:"Great experience overall", text:"Great experience working with Pratik. Highly recommended! Communication was smooth and the final product exceeded our initial scope." },
  { id:"s3", name:"Sneha Karki",     initials:"SK", rating:5, service:"AI Integration",   verified:true,  helpful:14, date:"2025-01-12", title:"Made our AI idea real", text:"We had a rough concept and turned it into a live product. The understanding of both ML pipelines and user-facing UX is rare. Incredibly patient through all our revisions." },
  { id:"s4", name:"Rajan Tamang",    initials:"RT", rating:5, service:"UI/UX Design",     verified:false, helpful:4,  date:"2024-12-28", title:"Stunning redesign", text:"Our old site looked like it was built in 2010. The redesign is modern, fast and our bounce rate dropped by 40% in the first month. Remarkable turnaround." },
  { id:"s5", name:"Priya Shrestha",  initials:"PS", rating:5, service:"API Development",  verified:true,  helpful:11, date:"2024-12-05", title:"Production-ready from day one", text:"Clean REST APIs, full Swagger docs, proper error handling and rate limiting. Our backend team integrated with zero friction. This is how APIs should be delivered." },
  { id:"s6", name:"Bikash Lama",     initials:"BL", rating:4, service:"Automation",       verified:true,  helpful:3,  date:"2024-11-20", title:"Saved us 30 hours a week", text:"The automation scripts eliminated an entire workflow our team was doing manually. ROI was visible within the first week of deployment." },
  { id:"s7", name:"Arjun Maharjan",  initials:"AM", rating:5, service:"Machine Learning", verified:true,  helpful:17, date:"2024-11-03", title:"Forecasting accuracy jumped 26%", text:"Custom ML pipeline for retail demand forecasting. Accuracy went from 61% to 87%. Every technical decision was explained clearly, even to our non-technical management." },
];

const SERVICES = [
  "Web Development","Full Stack App","UI/UX Design",
  "AI Integration","API Development","Machine Learning",
  "Mobile App","Automation","Other",
];

const AVATAR_PALETTES = [
  ["#3b82f6","#1e3a8a"],["#8b5cf6","#4c1d95"],["#10b981","#064e3b"],
  ["#f59e0b","#78350f"],["#ec4899","#831843"],["#06b6d4","#164e63"],
];

function getPalette(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_PALETTES[Math.abs(h) % AVATAR_PALETTES.length];
}

/* ─── Shared Components ─────────────────────────────── */
function Star({ on, size = 16, onClick, onEnter }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20"
      style={{ cursor: onClick ? "pointer" : "default", flexShrink: 0 }}
      onClick={onClick} onMouseEnter={onEnter}
    >
      <polygon
        points="10,1.5 12.35,7.24 18.54,7.64 13.97,11.6 15.45,17.64 10,14.25 4.55,17.64 6.03,11.6 1.46,7.64 7.65,7.24"
        fill={on ? "#f59e0b" : "rgba(148, 163, 184, 0.2)"}
        style={{ transition: "fill .2s ease" }}
      />
    </svg>
  );
}

function StarRow({ val, size, interactive, onSet }) {
  const [hov, setHov] = useState(0);
  const show = interactive ? (hov || val) : val;
  return (
    <div style={{ display:"flex", gap:3 }} onMouseLeave={() => interactive && setHov(0)}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} on={show >= i}
          onClick={interactive ? () => onSet(i) : null}
          onEnter={interactive ? () => setHov(i) : null}
        />
      ))}
    </div>
  );
}

/* ─── Review Modal Form ─────────────────────────────── */
function ReviewModal({ isOpen, onClose, onSubmit, isNight, T }) {
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
      // Reset form
      setName(""); setService(""); setTitle(""); setText(""); setRating(0); setErrs({});
    }, 1000);
  };

  const inpSt = { width:"100%", padding:"12px 14px", borderRadius:8, fontSize:14, background:T.inpBg, border:`1px solid ${T.inpBdr}`, color:T.titleColor, fontFamily:"inherit", outline:"none", boxSizing:"border-box" };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:20, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }}>
      <div style={{ background:T.cardBg, width:"100%", maxWidth:500, borderRadius:16, border:`1px solid ${T.border}`, padding:24, position:"relative", boxShadow:"0 20px 40px rgba(0,0,0,0.2)" }}>
        
        <button onClick={onClose} style={{ position:"absolute", top:20, right:20, background:"none", border:"none", color:T.subColor, cursor:"pointer", padding:4 }}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <h3 style={{ margin:"0 0 8px", fontSize:20, color:T.titleColor }}>Write a Review</h3>
        <p style={{ margin:"0 0 24px", fontSize:14, color:T.subColor }}>Share your experience with Pokhrel Services.</p>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:13, fontWeight:600, color:T.titleColor, marginBottom:8 }}>Rating *</div>
          <StarRow val={rating} size={28} interactive onSet={setRating} />
          {errs.rating && <div style={{ color:"#ef4444", fontSize:12, marginTop:4 }}>{errs.rating}</div>}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name *" style={{...inpSt, borderColor:errs.name?"#ef4444":T.inpBdr}} />
          </div>
          <div>
            <select value={service} onChange={e=>setService(e.target.value)} style={{...inpSt, borderColor:errs.service?"#ef4444":T.inpBdr}}>
              <option value="">Select Service *</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom:16 }}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Review Headline (Optional)" style={inpSt} />
        </div>

        <div style={{ marginBottom:24 }}>
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} placeholder="Describe your experience..." style={{...inpSt, resize:"vertical", borderColor:errs.text?"#ef4444":T.inpBdr}} />
          {errs.text && <div style={{ color:"#ef4444", fontSize:12, marginTop:4 }}>{errs.text}</div>}
        </div>

        <button onClick={submit} disabled={loading} style={{ width:"100%", padding:14, borderRadius:8, background:"#3b82f6", color:"#fff", fontSize:15, fontWeight:600, border:"none", cursor:loading?"not-allowed":"pointer", opacity:loading?0.7:1 }}>
          {loading ? "Publishing..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT 
   ═══════════════════════════════════════════════════════ */
export default function ReviewPage({ isNight = true }) {
  const [reviews, setReviews] = useState(() => {
    try { const s = localStorage.getItem(LS_KEY); return s ? JSON.parse(s) : SEED; } catch { return SEED; }
  });

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(reviews)); } catch {}
  }, [reviews]);

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

  /* ── Theme Tokens ── */
  const T = isNight ? {
    bg: "#020617",
    cardBg: "#0f172a",
    border: "#1e293b",
    titleColor: "#f8fafc",
    subColor: "#94a3b8",
    textColor: "#cbd5e1",
    inpBg: "#020617",
    inpBdr: "#1e293b",
    barBg: "#1e293b"
  } : {
    bg: "#f8fafc",
    cardBg: "#ffffff",
    border: "#e2e8f0",
    titleColor: "#0f172a",
    subColor: "#64748b",
    textColor: "#334155",
    inpBg: "#f8fafc",
    inpBdr: "#e2e8f0",
    barBg: "#e2e8f0"
  };

  const total = reviews.length;
  const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const dist = [5,4,3,2,1].map(s => ({ star:s, count:reviews.filter(r => r.rating === s).length }));

  let visible = [...reviews];
  if (filter !== "all") visible = visible.filter(r => r.rating === +filter);
  if (sort === "recent") visible.sort((a,b) => new Date(b.date) - new Date(a.date));
  if (sort === "top") visible.sort((a,b) => b.rating - a.rating || new Date(b.date) - new Date(a.date));
  if (sort === "helpful") visible.sort((a,b) => (b.helpful||0) - (a.helpful||0));

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "DM Sans, system-ui, sans-serif", color: T.textColor, padding: "40px 20px" }}>
      <style>{`
        * { box-sizing: border-box; }
        @media(max-width: 860px){
          .rp-container { flex-direction: column!important; }
          .rp-sidebar { width: 100%!important; position: static!important; }
        }
      `}</style>

      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} isNight={isNight} T={T} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* Simple Page Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: T.titleColor, margin: "0 0 8px" }}>Client Reviews</h1>
          <p style={{ fontSize: 16, color: T.subColor, margin: 0 }}>Verified feedback for Pokhrel Services.</p>
        </div>

        <div className="rp-container" style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          
          {/* ── LEFT SIDEBAR (Stats) ── */}
          <div className="rp-sidebar" style={{ width: 320, flexShrink: 0, position: "sticky", top: 40 }}>
            <div style={{ background: T.cardBg, borderRadius: 12, border: `1px solid ${T.border}`, padding: 24 }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: T.titleColor, lineHeight: 1 }}>{avg.toFixed(1)}</div>
                <div>
                  <StarRow val={Math.round(avg)} size={18} />
                  <div style={{ fontSize: 13, color: T.subColor, marginTop: 4 }}>Based on {total} reviews</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {dist.map(d => {
                  const pct = total ? Math.round((d.count / total) * 100) : 0;
                  return (
                    <div key={d.star} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, width: 35, fontSize: 13, fontWeight: 600 }}>
                        {d.star} <Star on size={12} />
                      </div>
                      <div style={{ flex: 1, height: 8, borderRadius: 4, background: T.barBg, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: "#f59e0b", borderRadius: 4 }} />
                      </div>
                      <div style={{ width: 25, fontSize: 12, color: T.subColor, textAlign: "right" }}>{d.count}</div>
                    </div>
                  );
                })}
              </div>

              <button onClick={() => setIsModalOpen(true)} style={{ width: "100%", padding: "12px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.titleColor, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = isNight ? "#1e293b" : "#f1f5f9"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                Write a Review
              </button>
            </div>
          </div>

          {/* ── RIGHT FEED (Reviews List) ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            
            {/* Filters */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", gap: 8 }}>
                {["all", "5", "4", "3", "2", "1"].map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: `1px solid ${filter === f ? "#3b82f6" : T.border}`, background: filter === f ? "#3b82f6" : "transparent", color: filter === f ? "#fff" : T.subColor, cursor: "pointer" }}>
                    {f === "all" ? "All" : `${f} Stars`}
                  </button>
                ))}
              </div>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "8px 12px", borderRadius: 8, fontSize: 14, background: T.cardBg, border: `1px solid ${T.border}`, color: T.titleColor, outline: "none", cursor: "pointer" }}>
                <option value="recent">Most Recent</option>
                <option value="top">Top Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            {/* List */}
            {visible.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: T.subColor }}>No reviews found for this filter.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {visible.map(r => {
                  const pal = getPalette(r.initials);
                  const d = new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                  
                  return (
                    <div key={r.id} style={{ background: T.cardBg, borderRadius: 12, border: `1px solid ${T.border}`, padding: 24 }}>
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                        <div style={{ display: "flex", gap: 16 }}>
                          <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${pal[0]},${pal[1]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                            {r.initials}
                          </div>
                          <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: T.titleColor, display: "flex", alignItems: "center", gap: 8 }}>
                              {r.name}
                              {r.verified && (
                                <span style={{ fontSize: 11, background: isNight ? "rgba(16,185,129,0.15)" : "#d1fae5", color: "#10b981", padding: "2px 8px", borderRadius: 12, display: "flex", alignItems: "center", gap: 4 }}>
                                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg> Verified
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 13, color: T.subColor, marginTop: 4 }}>
                              {r.service} • {d}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: 12 }}>
                        <StarRow val={r.rating} size={15} />
                      </div>
                      
                      {r.title && <h4 style={{ margin: "0 0 8px", fontSize: 16, color: T.titleColor }}>{r.title}</h4>}
                      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: T.textColor }}>{r.text}</p>

                      <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 13, color: T.subColor }}>Helpful?</span>
                        <button onClick={() => handleHelpful(r.id)} style={{ background: "transparent", border: `1px solid ${T.border}`, padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, color: T.subColor, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
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