import { useState, useEffect, useRef } from "react";

/* ─── theme detection ─────────────────────────────────────────────────────── */
function useTheme() {
  const get = () =>
    document.documentElement.classList.contains("dark") ||
    document.documentElement.getAttribute("data-theme") === "dark" ||
    document.body.classList.contains("dark");
  const [dark, setDark] = useState(get);
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(get()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class","data-theme"] });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* ─── terminal log ────────────────────────────────────────────────────────── */
const LOG_LINES = [
  { delay: 0,    text: "> Initialising reviews module…",        color: "#94a3b8" },
  { delay: 900,  text: "> Loading rating engine…       [OK]",   color: "#22d3ee" },
  { delay: 1800, text: "> Fetching user profiles…      [OK]",   color: "#22d3ee" },
  { delay: 2700, text: "> Building comment threads…    [··]",   color: "#fbbf24" },
  { delay: 3600, text: "> Compiling star-score widget… [··]",   color: "#fbbf24" },
  { delay: 4500, text: "> ETA: coming soon ✦",                  color: "#f97316" },
];

function Terminal({ dark }) {
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    setVisible([]);
    const timers = LOG_LINES.map((l, i) =>
      setTimeout(() => setVisible(v => [...v, i]), l.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const bg  = dark ? "rgba(0,0,0,0.45)" : "rgba(15,23,42,0.90)";
  const bar = dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.08)";

  return (
    <div style={{
      width:"100%", borderRadius:12, overflow:"hidden",
      background: bg,
      backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
      border: dark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.25)",
      fontFamily:"'IBM Plex Mono', monospace", fontSize:11,
    }}>
      <div style={{
        display:"flex", alignItems:"center", gap:6,
        padding:"8px 14px", background: bar,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        {["#ef4444","#fbbf24","#22c55e"].map(c=>(
          <span key={c} style={{ width:9, height:9, borderRadius:"50%", background:c, display:"inline-block" }}/>
        ))}
        <span style={{ marginLeft:6, color:"rgba(255,255,255,0.35)", fontSize:10 }}>reviews — build.log</span>
      </div>
      <div style={{ padding:"14px 16px", minHeight:120, display:"flex", flexDirection:"column", gap:6 }}>
        {LOG_LINES.map((l,i) => (
          <div key={i} style={{
            color: visible.includes(i) ? l.color : "transparent",
            transition:"color 0.4s ease",
            display:"flex", alignItems:"center", gap:8,
          }}>
            {visible.includes(i) && i === LOG_LINES.length - 1 && (
              <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%",
                background:"#f97316", animation:"blink 1s step-end infinite" }}/>
            )}
            <span>{l.text}</span>
          </div>
        ))}
        <span style={{ width:8, height:14, background:"#22d3ee",
          display:"inline-block", animation:"blink 1s step-end infinite", marginTop:2 }}/>
      </div>
    </div>
  );
}

/* ─── progress ring ───────────────────────────────────────────────────────── */
function RingProgress({ dark }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let p = 0;
    const t = setInterval(() => { p = p < 68 ? p + 0.3 : 0; setPct(p); }, 40);
    return () => clearInterval(t);
  }, []);

  const R = 52, C = 2 * Math.PI * R;
  const stroke = dark ? "#22d3ee" : "#f97316";
  const glow   = dark ? "drop-shadow(0 0 6px #22d3ee)" : "drop-shadow(0 0 4px #f97316)";

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
      <svg width="130" height="130" style={{ filter: glow }}>
        <circle cx="65" cy="65" r={R} fill="none"
          stroke={dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)"} strokeWidth="7"/>
        <circle cx="65" cy="65" r={R} fill="none"
          stroke={stroke} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C - (C * pct / 100)}
          transform="rotate(-90 65 65)"
          style={{ transition:"stroke-dashoffset 0.04s linear" }}/>
        <text x="65" y="60" textAnchor="middle"
          fill={dark?"#f1f5f9":"#1e293b"}
          fontFamily="'Bebas Neue', sans-serif" fontSize="26" letterSpacing="1">
          {pct.toFixed(0)}%
        </text>
        <text x="65" y="76" textAnchor="middle"
          fill={dark?"#64748b":"#94a3b8"}
          fontFamily="'IBM Plex Mono', monospace" fontSize="9">COMPLETE</text>
      </svg>
    </div>
  );
}

/* ─── construction scene ──────────────────────────────────────────────────── */
function Scene({ dark }) {
  const sky    = dark ? "transparent" : "#dbeafe";
  const ground = dark ? "rgba(30,41,59,0.6)" : "#fef3c7";
  const wall1  = dark ? "#1e40af" : "#fb923c";
  const wall2  = dark ? "#1d4ed8" : "#fdba74";
  const scaffC = dark ? "#22d3ee" : "#92400e";
  const plankC = dark ? "#0891b2" : "#b45309";

  return (
    <svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg"
      style={{ width:"100%", display:"block", borderRadius:10 }}>
      <rect width="480" height="260" fill={sky} rx="10"/>
      {dark && Array.from({length:9},(_,i)=>(
        <line key={`vg${i}`} x1={i*60} y1="0" x2={i*60} y2="260"
          stroke="rgba(34,211,238,0.06)" strokeWidth="1"/>
      ))}
      {dark && Array.from({length:5},(_,i)=>(
        <line key={`hg${i}`} x1="0" y1={i*65} x2="480" y2={i*65}
          stroke="rgba(34,211,238,0.06)" strokeWidth="1"/>
      ))}
      {dark && [[30,20],[90,15],[180,30],[280,12],[370,22],[440,8],[60,50],[200,45],[330,48],[420,40]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="1.4" fill="#e2e8f0" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.2;0.7"
            dur={`${1.4+i*0.25}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      {dark && <>
        <circle cx="410" cy="38" r="22" fill="#e2e8f0" opacity="0.92"/>
        <circle cx="422" cy="30" r="17" fill="#0f172a"/>
      </>}
      {!dark && <>
        <circle cx="410" cy="38" r="28" fill="#fbbf24" opacity="0.9">
          <animate attributeName="r" values="28;30;28" dur="4s" repeatCount="indefinite"/>
        </circle>
        {[0,40,80,120,160,200,240,280,320].map((d,i)=>(
          <line key={i}
            x1={410+35*Math.cos(d*Math.PI/180)} y1={38+35*Math.sin(d*Math.PI/180)}
            x2={410+44*Math.cos(d*Math.PI/180)} y2={38+44*Math.sin(d*Math.PI/180)}
            stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round"/>
        ))}
      </>}
      {!dark && <>
        <g opacity="0.85">
          <ellipse cx="80" cy="70" rx="36" ry="18" fill="white"/>
          <ellipse cx="102" cy="62" rx="26" ry="16" fill="white"/>
          <ellipse cx="60" cy="65" rx="20" ry="13" fill="white"/>
          <animateTransform attributeName="transform" type="translate" values="0 0;7 0;0 0" dur="7s" repeatCount="indefinite"/>
        </g>
        <g opacity="0.75">
          <ellipse cx="300" cy="50" rx="40" ry="19" fill="white"/>
          <ellipse cx="328" cy="42" rx="28" ry="17" fill="white"/>
          <ellipse cx="276" cy="47" rx="22" ry="13" fill="white"/>
          <animateTransform attributeName="transform" type="translate" values="0 0;-9 0;0 0" dur="9s" repeatCount="indefinite"/>
        </g>
      </>}
      {dark && <ellipse cx="240" cy="170" rx="110" ry="16"
        fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth="8"
        style={{filter:"blur(3px)"}}/>}
      {/* scaffolding */}
      <rect x="130" y="68" width="7" height="122" fill={scaffC} rx="2"/>
      <rect x="220" y="55" width="7" height="135" fill={scaffC} rx="2"/>
      <rect x="310" y="68" width="7" height="122" fill={scaffC} rx="2"/>
      <rect x="130" y="76" width="187" height="7" fill={plankC} rx="2"/>
      <rect x="130" y="120" width="187" height="7" fill={plankC} rx="2"/>
      <rect x="130" y="164" width="187" height="7" fill={plankC} rx="2"/>
      <line x1="137" y1="76" x2="224" y2="127" stroke={scaffC} strokeWidth="2.5" opacity="0.7"/>
      <line x1="227" y1="76" x2="314" y2="127" stroke={scaffC} strokeWidth="2.5" opacity="0.7"/>
      <line x1="227" y1="127" x2="137" y2="171" stroke={scaffC} strokeWidth="2.5" opacity="0.7"/>
      <line x1="317" y1="127" x2="227" y2="171" stroke={scaffC} strokeWidth="2.5" opacity="0.7"/>
      {/* wall */}
      {[0,1,2,3,4,5].flatMap(row =>
        [0,1,2,3,4].map(col => {
          const x = 133 + col*36 + (row%2)*18;
          const y = 188 - row*18;
          if (x + 32 > 316) return null;
          const shade = row < 2 ? wall1 : (row < 4 ? wall2 : (dark?"#3b82f6":"#fed7aa"));
          return <rect key={`${row}-${col}`} x={x} y={y} width="32" height="15"
            fill={shade} stroke={dark?"rgba(0,0,0,0.4)":"rgba(255,255,255,0.5)"}
            strokeWidth="1.2" rx="2"/>;
        })
      )}
      {[0,1,2].map(col => {
        const x = 133 + col*36 + 18;
        if (x + 32 > 316) return null;
        return <rect key={col} x={x} y={90} width="32" height="15"
          fill={dark?"#1e40af":"#fb923c"} stroke={dark?"rgba(0,0,0,0.3)":"rgba(255,255,255,0.4)"}
          strokeWidth="1.2" rx="2" opacity="0.45"/>;
      })}
      {/* crane */}
      <rect x="316" y="40" width="7" height="152" fill={dark?"#475569":"#78716c"} rx="2"/>
      <rect x="316" y="40" width="72" height="6" fill={dark?"#64748b":"#a8a29e"} rx="2"/>
      <line x1="376" y1="46" x2="376" y2="88" stroke={dark?"#94a3b8":"#78716c"} strokeWidth="1.8">
        <animate attributeName="y2" values="88;102;88" dur="1.8s" repeatCount="indefinite"/>
      </line>
      <g>
        <animate attributeName="transform" values="translate(0,0);translate(0,14);translate(0,0)" dur="1.8s" repeatCount="indefinite"/>
        <rect x="368" y="84" width="16" height="11" fill={dark?"#22d3ee":"#ef4444"} rx="2"/>
      </g>
      {/* ground */}
      <rect y="200" width="480" height="60" fill={ground}/>
      <rect y="200" width="480" height="8" fill={dark?"rgba(34,211,238,0.15)":"rgba(180,130,60,0.4)"}/>
      {[0,55,110,165,220,275,330,385,440].map((x,i)=>(
        <rect key={i} x={x+8} y="226" width="30" height="6"
          fill={dark?"rgba(34,211,238,0.2)":"rgba(203,213,225,0.7)"} rx="2"/>
      ))}
      {/* worker 1 */}
      <g>
        <rect x="154" y="148" width="8" height="18" fill={dark?"#1e3a5f":"#1e40af"} rx="3"/>
        <rect x="164" y="148" width="8" height="18" fill={dark?"#1e3a5f":"#1e40af"} rx="3"/>
        <rect x="150" y="124" width="22" height="24" fill="#f97316" rx="4"/>
        <rect x="153" y="130" width="7" height="7" fill="rgba(0,0,0,0.2)" rx="2"/>
        <circle cx="161" cy="117" r="10" fill="#fde68a"/>
        <circle cx="157" cy="116" r="1.8" fill="#1e293b"/>
        <circle cx="165" cy="116" r="1.8" fill="#1e293b"/>
        <path d="M 157 121 Q 161 124 165 121" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="161" cy="109" rx="13" ry="6" fill="#facc15"/>
        <rect x="148" y="107" width="26" height="6" fill="#facc15" rx="3"/>
        <line x1="172" y1="132" x2="187" y2="124" stroke="#fde68a" strokeWidth="4.5" strokeLinecap="round">
          <animate attributeName="x2" values="187;192;187" dur="0.55s" repeatCount="indefinite"/>
          <animate attributeName="y2" values="124;119;124" dur="0.55s" repeatCount="indefinite"/>
        </line>
        <rect x="186" y="120" width="12" height="5" fill={dark?"#94a3b8":"#6b7280"} rx="1.5">
          <animate attributeName="x" values="186;191;186" dur="0.55s" repeatCount="indefinite"/>
          <animate attributeName="y" values="120;115;120" dur="0.55s" repeatCount="indefinite"/>
        </rect>
        <line x1="150" y1="132" x2="138" y2="128" stroke="#fde68a" strokeWidth="4.5" strokeLinecap="round"/>
      </g>
      {/* worker 2 */}
      <g>
        <rect x="255" y="194" width="8" height="16" fill={dark?"#1e3a5f":"#1e40af"} rx="3"/>
        <rect x="265" y="194" width="8" height="16" fill={dark?"#1e3a5f":"#1e40af"} rx="3"/>
        <rect x="251" y="171" width="22" height="23" fill={dark?"#10b981":"#059669"} rx="4"/>
        <circle cx="262" cy="163" r="10" fill="#fde68a"/>
        <circle cx="258" cy="162" r="1.8" fill="#1e293b"/>
        <circle cx="266" cy="162" r="1.8" fill="#1e293b"/>
        <ellipse cx="262" cy="155" rx="13" ry="6" fill="#f87171"/>
        <rect x="249" y="153" width="26" height="6" fill="#f87171" rx="3"/>
        <line x1="273" y1="180" x2="288" y2="172" stroke="#fde68a" strokeWidth="4.5" strokeLinecap="round">
          <animate attributeName="y2" values="172;166;172" dur="0.85s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="288;292;288" dur="0.85s" repeatCount="indefinite"/>
        </line>
        <rect x="286" y="167" width="14" height="9" fill={dark?"#a78bfa":"#7c3aed"} rx="3">
          <animate attributeName="y" values="167;161;167" dur="0.85s" repeatCount="indefinite"/>
          <animate attributeName="x" values="286;290;286" dur="0.85s" repeatCount="indefinite"/>
        </rect>
        <circle cx="290" cy="190" r="2.5" fill={dark?"#a78bfa":"#7c3aed"} opacity="0.8">
          <animate attributeName="cy" values="182;210;182" dur="1.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0;0.8" dur="1.4s" repeatCount="indefinite"/>
        </circle>
        <line x1="251" y1="180" x2="239" y2="177" stroke="#fde68a" strokeWidth="4.5" strokeLinecap="round"/>
      </g>
      {/* worker 3 */}
      <g>
        <rect x="78" y="218" width="9" height="18" fill={dark?"#1e3a5f":"#1e40af"} rx="3">
          <animate attributeName="y" values="218;215;218" dur="0.45s" repeatCount="indefinite"/>
        </rect>
        <rect x="89" y="218" width="9" height="18" fill={dark?"#1e3a5f":"#1e40af"} rx="3">
          <animate attributeName="y" values="215;218;215" dur="0.45s" repeatCount="indefinite"/>
        </rect>
        <rect x="74" y="196" width="22" height="22" fill={dark?"#f97316":"#fb923c"} rx="4"/>
        <circle cx="85" cy="188" r="10" fill="#fde68a"/>
        <circle cx="81" cy="187" r="1.8" fill="#1e293b"/>
        <circle cx="89" cy="187" r="1.8" fill="#1e293b"/>
        <ellipse cx="85" cy="180" rx="13" ry="6" fill="#facc15"/>
        <rect x="72" y="178" width="26" height="6" fill="#facc15" rx="3"/>
        <line x1="74" y1="204" x2="60" y2="210" stroke="#fde68a" strokeWidth="4.5" strokeLinecap="round"/>
        <line x1="96" y1="204" x2="112" y2="210" stroke="#fde68a" strokeWidth="4.5" strokeLinecap="round"/>
        <rect x="58" y="205" width="56" height="9" fill={dark?"#475569":"#ef4444"} rx="2"/>
        <rect x="60" y="196" width="52" height="9" fill={dark?"#64748b":"#f87171"} rx="2"/>
        <rect x="62" y="187" width="48" height="9" fill={dark?"#7c8fa6":"#fca5a5"} rx="2"/>
      </g>
      {/* worker 4 */}
      <g>
        <rect x="400" y="236" width="5" height="16" fill={dark?"#475569":"#a16207"} rx="2"/>
        <rect x="425" y="236" width="5" height="16" fill={dark?"#475569":"#a16207"} rx="2"/>
        <rect x="396" y="234" width="38" height="6" fill={dark?"#64748b":"#ca8a04"} rx="2"/>
        <rect x="403" y="224" width="8" height="12" fill="#3730a3" rx="3"/>
        <rect x="414" y="224" width="8" height="12" fill="#3730a3" rx="3"/>
        <rect x="400" y="200" width="22" height="24" fill={dark?"#818cf8":"#6366f1"} rx="4"/>
        <circle cx="411" cy="192" r="10" fill="#fde68a"/>
        <circle cx="407" cy="192" r="3.5" fill="none" stroke="#60a5fa" strokeWidth="1.8"/>
        <circle cx="416" cy="192" r="3.5" fill="none" stroke="#60a5fa" strokeWidth="1.8"/>
        <line x1="410.5" y1="192" x2="412.5" y2="192" stroke="#60a5fa" strokeWidth="1.4"/>
        <ellipse cx="411" cy="184" rx="13" ry="6" fill="#22d3ee"/>
        <rect x="398" y="182" width="26" height="6" fill="#22d3ee" rx="3"/>
        <rect x="396" y="217" width="32" height="20" fill={dark?"#0f172a":"#e0f2fe"} rx="3"/>
        <rect x="398" y="219" width="28" height="16" fill={dark?"#1e3a5f":"#93c5fd"} rx="2">
          <animate attributeName="fill"
            values={dark?"#1e3a5f;#0c4a6e;#1e3a5f":"#93c5fd;#60a5fa;#93c5fd"}
            dur="2.2s" repeatCount="indefinite"/>
        </rect>
        <line x1="400" y1="210" x2="396" y2="220" stroke="#fde68a" strokeWidth="4.5" strokeLinecap="round"/>
        <line x1="422" y1="210" x2="428" y2="220" stroke="#fde68a" strokeWidth="4.5" strokeLinecap="round"/>
      </g>
      {/* cones */}
      {[[440,220],[462,224]].map(([cx,cy],i)=>(
        <g key={i}>
          <polygon points={`${cx},${cy} ${cx-10},${cy+28} ${cx+10},${cy+28}`} fill="#f97316"/>
          <rect x={cx-12} y={cy+26} width="24" height="5" fill="#f97316" rx="1"/>
          <rect x={cx-8}  y={cy+10} width="16" height="4" fill="white" opacity="0.7"/>
        </g>
      ))}
      {/* wheelbarrow */}
      <ellipse cx="38" cy="226" rx="11" ry="7"
        fill={dark?"rgba(34,211,238,0.2)":"#d1fae5"}
        stroke={dark?"#22d3ee":"#6ee7b7"} strokeWidth="1.5"/>
      <rect x="16" y="216" width="44" height="13" fill={dark?"#334155":"#6ee7b7"} rx="4"/>
      <circle cx="38" cy="234" r="7" fill={dark?"#475569":"#a7f3d0"}
        stroke={dark?"#22d3ee":"#34d399"} strokeWidth="2"/>
      <line x1="16" y1="222" x2="5" y2="218" stroke={dark?"#64748b":"#92400e"} strokeWidth="3" strokeLinecap="round"/>
      <line x1="60" y1="222" x2="71" y2="218" stroke={dark?"#64748b":"#92400e"} strokeWidth="3" strokeLinecap="round"/>
      {/* speech bubble */}
      <rect x="176" y="90" width="76" height="24"
        fill={dark?"rgba(15,23,42,0.88)":"white"}
        stroke={dark?"rgba(34,211,238,0.5)":"#e5e7eb"} strokeWidth="1.5" rx="8"/>
      <polygon points="185,114 178,122 198,114"
        fill={dark?"rgba(15,23,42,0.88)":"white"}
        stroke={dark?"rgba(34,211,238,0.5)":"#e5e7eb"} strokeWidth="1"/>
      <polygon points="185,114 198,114 192,120"
        fill={dark?"rgba(15,23,42,0.88)":"white"}/>
      <text x="214" y="106" textAnchor="middle" fontSize="8.5"
        fill={dark?"#22d3ee":"#6b7280"}
        fontFamily="'IBM Plex Mono', monospace">Almost there!</text>
      {/* caution tape */}
      {Array.from({length:17},(_,i)=>(
        <rect key={i} x={i*30} y="198" width="15" height="6"
          fill={i%2===0?"#facc15":"#1c1917"} opacity="0.9"/>
      ))}
    </svg>
  );
}

/* ─── stat pill ───────────────────────────────────────────────────────────── */
function StatPill({ icon, label, value, dark, delay, accent }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:10,
      padding:"10px 16px", borderRadius:99,
      background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
      border: `1px solid ${dark?"rgba(255,255,255,0.10)":"rgba(0,0,0,0.08)"}`,
      animation:`fadeSlideUp 0.5s ease both`,
      animationDelay:`${delay}ms`,
    }}>
      <span style={{ fontSize:16 }}>{icon}</span>
      <div>
        <div style={{
          fontFamily:"'Bebas Neue', sans-serif",
          fontSize:17, letterSpacing:"0.05em", lineHeight:1, color: accent,
        }}>{value}</div>
        <div style={{
          fontFamily:"'IBM Plex Mono', monospace",
          fontSize:9, letterSpacing:"0.08em",
          color: dark?"#64748b":"#94a3b8", textTransform:"uppercase",
        }}>{label}</div>
      </div>
    </div>
  );
}

/* ─── main export ─────────────────────────────────────────────────────────── */
export default function Reviews() {
  const dark   = useTheme();
  const accent = dark ? "#22d3ee" : "#f97316";
  const accent2= dark ? "#f97316" : "#0284c7";
  const txt    = dark ? "#e2e8f0" : "#1e293b";
  const muted  = dark ? "#64748b" : "#94a3b8";
  const border = dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "#ffffff";
  const blur   = dark ? "blur(20px)" : "none";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500;700&family=Outfit:wght@400;500;600&display=swap');
        @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeSlideUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes ticker       { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes neonPulse    { 0%,100%{box-shadow:0 0 0 0 transparent} 50%{box-shadow:0 0 28px 4px rgba(34,211,238,0.16)} }
        .reviews-root * { box-sizing:border-box; }
      `}</style>

      <div className="reviews-root" style={{
        width:"100%", minHeight:"100%",
        background: dark ? "transparent" : "#f1f5f9",
        padding:"22px 14px 36px",
        display:"flex", flexDirection:"column", alignItems:"center",
        overflowX:"hidden",
        fontFamily:"'Outfit', sans-serif",
        transition:"background 0.3s",
      }}>

        {/* page header */}
        <div style={{
          width:"100%", maxWidth:"min(700px,100%)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom:18, paddingBottom:14,
          borderBottom:`1px solid ${border}`,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{
              width:32, height:32, borderRadius:8, fontSize:16,
              background: dark?"rgba(34,211,238,0.12)":"rgba(249,115,22,0.1)",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>⭐</span>
            <span style={{
              fontFamily:"'Bebas Neue', sans-serif", fontSize:18, letterSpacing:"0.18em",
              color: dark?"rgba(255,255,255,0.45)":"rgba(0,0,0,0.35)",
            }}>REVIEWS</span>
          </div>
          <div style={{
            display:"flex", alignItems:"center", gap:7,
            padding:"5px 12px", borderRadius:99,
            background: dark?"rgba(249,115,22,0.12)":"rgba(249,115,22,0.10)",
            border:`1px solid ${dark?"rgba(249,115,22,0.35)":"rgba(249,115,22,0.25)"}`,
            animation:"floatY 2.8s ease-in-out infinite",
          }}>
            <span style={{
              width:7, height:7, borderRadius:"50%", background:"#f97316",
              display:"inline-block", animation:"blink 1.2s step-end infinite",
            }}/>
            <span style={{
              fontFamily:"'IBM Plex Mono', monospace", fontSize:9, fontWeight:700,
              letterSpacing:"0.12em", color:"#f97316",
            }}>UNDER CONSTRUCTION</span>
          </div>
        </div>

        {/* main grid */}
        <div style={{ width:"100%", maxWidth:"min(700px,100%)", display:"flex", flexDirection:"column", gap:12 }}>

          {/* scene card */}
          <div style={{
            borderRadius:16, overflow:"hidden",
            border:`1px solid ${border}`,
            background: dark ? "rgba(255,255,255,0.03)" : "#ffffff",
            backdropFilter: blur, WebkitBackdropFilter: blur,
            animation: dark ? "neonPulse 4s ease-in-out infinite" : "none",
            position:"relative",
          }}>
            <div style={{
              height:5,
              background:"repeating-linear-gradient(90deg,#f97316 0,#f97316 18px,#facc15 18px,#facc15 36px,#1c1917 36px,#1c1917 54px)",
            }}/>
            <div style={{
              position:"absolute", top:16, left:14,
              fontFamily:"'IBM Plex Mono', monospace",
              fontSize:9, letterSpacing:"0.15em", fontWeight:700,
              color: dark?"rgba(34,211,238,0.45)":"rgba(0,0,0,0.2)", textTransform:"uppercase",
            }}>// construction_site.svg</div>
            <div style={{ padding:"10px 10px 0" }}><Scene dark={dark}/></div>
          </div>

          {/* two-col row */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:12, alignItems:"start" }}>

            {/* left col */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

              {/* headline card */}
              <div style={{
                padding:"20px 22px",
                borderRadius:14,
                background: cardBg,
                border:`1px solid ${border}`,
                backdropFilter: blur, WebkitBackdropFilter: blur,
              }}>
                <div style={{
                  fontFamily:"'IBM Plex Mono', monospace", fontSize:9,
                  letterSpacing:"0.2em", fontWeight:700, color: accent,
                  textTransform:"uppercase", marginBottom:8,
                }}>// coming_soon</div>
                <h1 style={{
                  fontFamily:"'Bebas Neue', sans-serif",
                  fontSize:"clamp(32px,5.5vw,50px)",
                  lineHeight:0.95, margin:"0 0 12px",
                  color: txt, letterSpacing:"0.02em",
                }}>
                  Reviews<br/>
                  <span style={{
                    color: accent,
                    textShadow: dark ? `0 0 22px ${accent}55` : "none",
                  }}>Section</span>
                </h1>
                <p style={{
                  fontSize:13, color: muted, lineHeight:1.75, margin:0,
                  fontFamily:"'Outfit', sans-serif", maxWidth:310,
                }}>
                  Our team is actively building the reviews portal — star ratings, verified comments, and smart filtering coming soon.
                </p>
              </div>

              {/* stat pills */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                <StatPill icon="⭐" label="Star Ratings" value="5.0"     dark={dark} accent={accent}  delay={0}/>
                <StatPill icon="💬" label="Comments"     value="Soon"    dark={dark} accent={accent2} delay={80}/>
                <StatPill icon="🏆" label="Top Picks"    value="Curated" dark={dark} accent={accent}  delay={160}/>
              </div>

              {/* terminal */}
              <Terminal dark={dark}/>
            </div>

            {/* right col */}
            <div style={{
              display:"flex", flexDirection:"column",
              alignItems:"center", gap:12,
              padding:"20px 16px",
              borderRadius:14,
              background: cardBg,
              border:`1px solid ${border}`,
              backdropFilter: blur, WebkitBackdropFilter: blur,
              minWidth:148,
            }}>
              <div style={{
                fontFamily:"'IBM Plex Mono', monospace", fontSize:8,
                letterSpacing:"0.2em", fontWeight:700,
                color: muted, textTransform:"uppercase",
              }}>BUILD PROGRESS</div>
              <RingProgress dark={dark}/>
              <div style={{
                fontFamily:"'IBM Plex Mono', monospace", fontSize:9,
                color: muted, textAlign:"center", lineHeight:1.65,
              }}>Active<br/>Development</div>
              <div style={{ width:"100%", height:1, background: border }}/>
              <div style={{
                fontFamily:"'IBM Plex Mono', monospace", fontSize:8,
                letterSpacing:"0.15em", fontWeight:700,
                color: muted, textTransform:"uppercase",
              }}>GET NOTIFIED</div>
              <input type="email" placeholder="your@email.com"
                style={{
                  width:"100%", padding:"8px 10px", borderRadius:8,
                  border:`1px solid ${dark?"rgba(34,211,238,0.25)":"rgba(0,0,0,0.12)"}`,
                  background: dark?"rgba(0,0,0,0.4)":"#f8fafc",
                  color: txt, fontFamily:"'IBM Plex Mono', monospace",
                  fontSize:10, outline:"none",
                }}
                onFocus={e => e.target.style.borderColor = accent}
                onBlur={e  => e.target.style.borderColor = dark?"rgba(34,211,238,0.25)":"rgba(0,0,0,0.12)"}
              />
              <button
                onClick={() => alert("You'll be notified! 🎉")}
                style={{
                  width:"100%", padding:"9px", borderRadius:8, border:"none",
                  background:`linear-gradient(135deg,#f97316,${dark?"#fbbf24":"#0284c7"})`,
                  color: dark?"#1c1917":"#ffffff",
                  fontFamily:"'IBM Plex Mono', monospace",
                  fontSize:10, fontWeight:700, cursor:"pointer", letterSpacing:"0.06em",
                  transition:"opacity 0.2s, transform 0.15s",
                }}
                onMouseEnter={e=>{e.target.style.opacity="0.85";e.target.style.transform="scale(1.03)";}}
                onMouseLeave={e=>{e.target.style.opacity="1";e.target.style.transform="scale(1)";}}
              >NOTIFY ME →</button>
            </div>
          </div>

          {/* ticker */}
          <div style={{
            borderRadius:10, overflow:"hidden",
            border:`1px solid ${border}`,
            background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            padding:"8px 0",
          }}>
            <div style={{
              display:"inline-flex", gap:40,
              animation:"ticker 22s linear infinite",
              whiteSpace:"nowrap",
              fontFamily:"'IBM Plex Mono', monospace",
              fontSize:10, color: muted, letterSpacing:"0.05em",
            }}>
              {[...Array(2)].flatMap(()=>
                ["★ Star Ratings","⬡ Verified Reviews","◈ Smart Filters",
                 "▸ Comment Threads","◉ Score Analytics","▲ Reviewer Badges",
                 "⬦ Under Development","✦ Launching Soon"].map((t,i)=>(
                  <span key={`${t}${i}`} style={{ paddingRight:40 }}>{t}</span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* footer */}
        <div style={{
          marginTop:16,
          fontFamily:"'IBM Plex Mono', monospace", fontSize:9,
          letterSpacing:"0.1em",
          color: dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.2)",
          display:"flex", alignItems:"center", gap:10,
        }}>
          <span>© {new Date().getFullYear()}</span>
          <span style={{opacity:0.4}}>·</span>
          <span>reviews_portal</span>
          <span style={{opacity:0.4}}>·</span>
          <span>ETA: TBD</span>
        </div>
      </div>
    </>
  );
}