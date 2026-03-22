import { useState, useRef, useEffect } from "react";
import aiIcon from "../assets/aibot.png";
import{FaVolumeUp,FaVolumeMute} from "react-icons/fa";

const commonBubbleFix = {
  wordBreak: "break-word",
  overflowWrap: "break-word",
  whiteSpace: "pre-wrap",
  maxWidth: "75%",
  lineHeight: "1.4",
};

const AIORB_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
  @keyframes _aio_slideUp { from{opacity:0;transform:translateY(22px) scale(.94)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes _aio_fadeBot { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
  @keyframes _aio_fadeUser{ from{opacity:0;transform:translateX(10px)} to{opacity:1;transform:translateX(0)} }
  @keyframes _aio_dot { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(-5px);opacity:1} }
  @keyframes _aio_pulse { 0%,100%{box-shadow:0 8px 28px rgba(82,130,255,.45),0 0 0 0 rgba(82,130,255,.35)} 60%{box-shadow:0 8px 28px rgba(82,130,255,.45),0 0 0 9px rgba(82,130,255,0)} }
  @keyframes _aio_glow { 0%,100%{filter:brightness(1.1) drop-shadow(0 0 5px rgba(82,130,255,.5))} 50%{filter:brightness(1.3) drop-shadow(0 0 12px rgba(82,130,255,.85))} }
  ._aio_panel    { animation:_aio_slideUp .32s cubic-bezier(.34,1.56,.64,1) forwards }
  ._aio_bot_msg  { animation:_aio_fadeBot  .22s ease forwards }
  ._aio_user_msg { animation:_aio_fadeUser .22s ease forwards }
  ._aio_d1{animation:_aio_dot 1.3s infinite .00s}
  ._aio_d2{animation:_aio_dot 1.3s infinite .18s}
  ._aio_d3{animation:_aio_dot 1.3s infinite .36s}
  ._aio_fab     { animation:_aio_pulse 2.8s infinite }
  ._aio_orb_img { animation:_aio_glow 2.2s infinite }
  ._aio_scroll {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* Scrollbar */
._aio_scroll::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
._aio_scroll::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.12);
  border-radius: 10px;
}
._aio_scroll::-webkit-scrollbar-track {
  background: transparent;
}

/* Message animation */
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Typing dots */
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

._aio_d1, ._aio_d2, ._aio_d3 {
  animation: bounce 1.2s infinite ease-in-out;
}
._aio_d2 { animation-delay: 0.2s; }
._aio_d3 { animation-delay: 0.4s; }
  ._aio_chip{transition:all .18s ease;cursor:pointer}
  ._aio_chip:hover{background:rgba(82,130,255,.2)!important;border-color:rgba(82,130,255,.55)!important;color:#82a8ff!important;transform:translateY(-1px)}
  ._aio_send{transition:all .18s ease}
  ._aio_send:hover:not(:disabled){background:#4268e0!important;transform:scale(1.06)}
  ._aio_send:disabled{opacity:.45;cursor:not-allowed}
  ._aio_iconbtn{transition:all .18s ease}
  ._aio_iconbtn:hover{background:rgba(255,255,255,.1)!important}
  ._aio_voice_on{background:rgba(82,130,255,.2)!important;border-color:rgba(82,130,255,.4)!important;color:#82a8ff!important}
  ._aio_input:focus{border-color:rgba(82,130,255,.55)!important;box-shadow:0 0 0 3px rgba(82,130,255,.1)}
  ._aio_input{transition:border-color .2s,box-shadow .2s}
`;

const KB = {
  identity:`
Hey! Here is who Pratik is:

  Name : Pratik Pokharel
  Role : Full-Stack Developer & AI Engineer
  From : Nepal, studying at KIIT University, India

What makes him different:
  Builds systems that work in the real world.
  Clean architecture. Real AI integration. No fake demos.

Current status: Open to internships, freelance & full-time

His motto:
  "Turning ideas into products, coffee into code,
   and bugs into personality development."

Ask about his skills, projects, education or contact!
`.trim(),

  skills_overview:`
Core Tech Stack — Pratik's Full Arsenal

Backend:
  Java & Spring Boot - enterprise REST APIs done right
  FastAPI (Python)   - async, blazing-fast endpoints
  Python             - ML pipelines & automation

Frontend:
  React.js & JSX     - UIs that don't make eyes bleed
  JavaScript (ES6+)  - vanilla when it counts

Data Layer:
  SQL / PostgreSQL / MySQL
  Data modeling & schema design
  Query optimization & indexing

AI & Machine Learning:
  ML Model Creation & Training
  Time Series Forecasting (NSE stocks)
  AI/ML integration into full-stack products
  AI automation — automating tasks to automate more tasks

Engineering Mindset:
  Clean Architecture & Scalable System Design
  REST API design patterns
  Git & GitHub - 500+ commits survived alsong with 25+ repos...

  Problem decomposition & systems thinking

Bonus Skills:
  Debugging at 2 AM (unlocked achievement)
  Writing commit messages future-him can read
  Making code clean enough that future-self won't cry
`.trim(),

  java:`
Java & Spring Boot: Pratik's primary backend weapon

What he builds:
  Production-ready REST APIs
  Spring Boot microservices
  Enterprise backend architecture
  Dependency injection & IoC patterns
  JPA / Hibernate for data persistence
  Spring Security for auth (JWT, OAuth2)
  Global exception handling & DTO contracts

Used in real projects:
  SUIS: full backend core & module system
  SEGA: structured emergency governance module

Proficiency: Core Expertise

Fun fact: Has survived more NullPointerExceptions
than he'd like to admit. All became learning moments.
1 Spring Boot bug = 10 beans + 1 existential crisis.
`.trim(),

  python:`
Python & FastAPI: Pratik's AI/ML powerhouse

What he does with it:
  FastAPI: async APIs with actual production speed
  ML model creation, training & evaluation
  Time series forecasting (Kavout project)
  Data preprocessing & feature engineering
  Automation pipelines that run in production

Ecosystem he uses:
  NumPy & Pandas  - data manipulation
  Scikit-learn    - model training & evaluation
  Matplotlib      - visualization
  FastAPI + Uvicorn - async API serving

Used in:
  Kavout - NSE stock time series forecasting engine
  Smart City Solver - ML classification

His quote on FastAPI:
  "Because sometimes Python deserves to be fast too."
`.trim(),

  react:`
React.js: Pratik's frontend weapon of choice

What he builds:
  Component-based UI architectures
  State management (survived Redux, prefers hooks)
  Responsive, clean interfaces
  REST API integration with backend services
  This very portfolio you are looking at!

Hooks he works with:
  useState, useEffect, useRef, useCallback
  Custom hooks for shared logic extraction
  Context API for global state

His approach:
  Makes things look pretty while secretly fighting
  state management issues.
  The eternal frontend developer struggle.

Proficiency: Strong - production-level confident
`.trim(),

  ai_ml:`
AI & Machine Learning - Where it gets exciting

Active AI Projects:
  Kavout   - NSE stock time series forecasting
  SUIS     - AI-powered university workflow automation
  Smart City - urban issue ML classifier

Core ML Skills:
  Model creation & training from scratch
  Time Series Forecasting
  AI integration into full-stack products
  Automation pipelines end-to-end
  Data preprocessing & feature engineering
  Model evaluation & performance tuning

Philosophy:
  "If AI is not solving a real problem,
   what are we even building?"

Mission: Build AI that does not just predict —
         but actually changes how things work.
`.trim(),

  projects_overview:`
Projects: Proof he does not just watch tutorials

1. SUIS: Smart University Intelligent System
   Status: Ongoing
   AI-powered management platform for universities.
   Includes SEGA emergency governance module.

2. Kavout: NSE Stock Forecasting
   Status: Ongoing
   AI-driven time series predictions:
   1-day, 15-day & 30-day windows.

3. AI Smart City Issue Solver
   Status: Completed (MLH Hackathon at KIIT)
   Urban problem detection & ML-based routing.

4. SEGA: Emergency Governance Architecture
   Status: Ongoing (inside SUIS)
   Real-time incident reporting & safety compliance.

Ask me about any specific project for full details!
Try: "Tell me about Kavout" or "What is SUIS?"
`.trim(),

  suis:`
SUIS — Smart University Intelligent System

Status: Ongoing (active development)

Mission: Make universities smarter than their students.
         Starting with the administration system.

What it does:
  AI-powered university management platform
  Automates admin workflows intelligently
  Handles scheduling, compliance & operations
  Role-based access for faculty, students, admins
  SEGA emergency module as core safety layer

Tech stack:
  Spring Boot - backend core
  React.js    - frontend interface
  SQL         - data persistence layer
  AI/ML layers for process automation
  Clean, scalable architecture by design

Ask "What is SEGA?" to learn about its safety module.
`.trim(),

  kavout:`
Kavout: AI-Powered NSE Stock Forecasting for India

Status: Ongoing

The idea:
  Predict NSE stock prices using AI time series models.
  Data-driven analysis instead of pure market vibes.

Prediction windows:
  1-day  - short-term trading signals
  15-day - medium-term trend detection
  30-day - long-term directional forecasting

Tech stack:
  Python + Scikit-learn - ML model core
  Time series algorithms (ARIMA, linear)
  FastAPI              - prediction API serving
  Data pipelines       - real market data

Honest quote:
  "Predicting stocks so I can still be wrong,
   but now with confidence and a model to blame."
`.trim(),

  smartCity:`
AI Smart City Issue Solver - MLH Hackathon

Status: Completed

Built at: MLH Hackathon @ KIIT University

The problem it solves:
  Citizens face urban issues (potholes, broken lights,
  water supply) with no structured reporting channel.
  Authorities receive zero actionable data.

How it works:
  Citizens report issues via the platform
  AI classifies & routes to the right authority
  Pattern recognition spots recurring problems
  Real-time tracking dashboard for accountability

Shipped during the hackathon:
  Working citizen reporting interface
  ML classification & routing engine
  Live tracking dashboard for authorities

Proved: Pratik ships real features under pressure.
`.trim(),

  sega:`
SEGA: Structured Emergency Governance Architecture

Status: Ongoing (module inside SUIS)

What it is:
  Centralized emergency management system
  integrated into the SUIS platform.
  The safety brain of the whole system.

What it handles:
  Real-time incident reporting (students, staff)
  Emergency alert routing to right personnel
  Safety compliance monitoring & documentation
  Audit trails for governance records
  Role-based alert visibility (who sees what)

Technical design:
  Event-driven architecture for real-time alerts
  Workflow: report to triage to response
  Compliance-ready audit logging
  Integrated tightly with SUIS backend core

The vibe:
  "Sounds like a government system.
   Runs like my code — somehow works, consistently."
`.trim(),

  education:`
Education - The Origin Story

B.Tech Computer Science & Engineering
  Institution : KIIT Deemed to be University, India
  CGPA        : 7.44 (still compiling, a work in progress)

  What he genuinely learned:
    How to code, then debug what he coded
    System design, databases, OS & networking
    Data structures & algorithms (clicked eventually)
    Surviving deadlines on willpower + caffeine
    Clean code the hard way (via the wrong way first)

Plus 2 Science
  Institution : Sagarmatha Higher Secondary School, Nepal
  GPA         : 3.59 / 4.0(i.e 89.75%)

  The origin story:
    Before semicolons ruined his life
    When marks still responded to pure effort
    Where curiosity for computers first sparked

The arc:
  Nepal to India to chase Computer Science.
  Proof that passion beats geography every time.
`.trim(),

  contact:`
Contact — Pratik is genuinely reachable

  Email : itspratikpok@gmail.com
  Inbox checked more often than his code compiles.

  Response time : Within 24 hours
  Faster than most APIs he has built — and those are fast.

Open to:
  Internships  : AI/ML, Full-Stack, Backend roles, previously completed an internship at VaultofCodes as a #Web_Dev_Intern
  Freelance    : Real projects with real impact
  Full-time    : Developer positions worth growing in
  Collabs      : Startups, open source, interesting builds

How to reach out:
  1. Send an email with your idea or opportunity
  2. Be specific about what you need
  3. He replies. Genuinely.

If you are building something that matters — reach out.
`.trim(),

  availability:`
Availability: Is Pratik open to work?

Status: OPEN to opportunities

Ideal role types:
  Internship     - especially AI/ML or Full-Stack
  Freelance      - real projects, real impact
  Full-time      - developer role worth growing into
  Collaboration  - startups, open source builds

What he brings:
  Java + Spring Boot backend expertise
  Python + ML model capability
  React frontend proficiency
  System design thinking
  Ships features, does not just plan them

Location: India-based (KIIT), open to remote globally

Contact: itspratikpok@gmail.com
`.trim(),

  personality:`
Who Pratik Is - Beyond the Resume

  Authentic. Driven. Debugging life choices at 2 AM alongside his code.

What defines him:
  Builds things that actually work in the real world
  Writes code so clean, even future-him won't hate it
  From Nepal, studying India, building for the world
  Unapologetically himself, unless the compiler disagrees

What drives him:
  "If it is not solving a real problem, why build it?"
  Coffee + Code + Curiosity = his operating system
  Turns bugs into funny README comments
  Learns from failures, ships from experience

Developer personality:
  Actually finishes side projects (genuinely rare)
  Makes readable commit messages humans understand
  Has very strong opinions about folder structure
  Googles the same Stack Overflow answer 3x a week

#TurningIdeasIntoProducts
#CoffeeIntoCode
#BugsIntoPersonalityDevelopment
`.trim(),

  hackathon:`
Hackathon Experience - Tested Under Pressure

MLH Hackathon @ KIIT University

Project: AI Smart City Issue Solver
  Full working product. Shipped during the event.
  Not a prototype - a real, functioning system.

Built under hackathon pressure:
  Citizen issue reporting interface
  AI classification & authority routing engine
  Real-time tracking dashboard
  Pattern recognition for recurring city problems

What it proved:
  Rapid prototyping under real time constraints
  Ability to scope, prioritize & ship fast
  Executes - does not just plan or present slides
  Works effectively in a team under stress

The Pratik-under-pressure formula:
  Clear problem + time pressure + caffeine =
  Maximum efficiency mode, every time.
`.trim(),

  fun_facts:`
Fun Facts About Pratik — Unfiltered

  1.  Debugs best at 2 AM. Unexplainable. Consistent.
  2.  From Nepal - proof great developers come from everywhere. For eg: Sundar Pichai @ CEO of Google 
  3.  CGPA 7.44 - "still compiling" (always improving).
  4.  Has extremely strong opinions about folder structure.
  5.  Writes commit messages that make sense 6 months later.
  6.  Once spent 3 hours on a bug caused by a missing semicolon.
  7.  Actually finishes side projects. A statistically rare trait.
  8.  Code comments are funnier than most LinkedIn posts.
  9.  Coffee intake has a strong positive correlation with code quality.
  10. Believes: if you cannot explain your architecture simply,
      you do not fully understand it yet.
  11. Traveled from Nepal to India for CS. No shortcuts taken.
  12. His Spring Boot app has more beans than his kitchen pantry.
  13. Takes clean code personally. Bad variable names cause pain.
  14. Has a README for everything, including life decisions (allegedly).
`.trim(),

  architecture:`
System Design & Architecture - Pratik's Engineering Mindset

Principles he follows:
  Clean Architecture (strict separation of concerns)
  SOLID principles applied in actual production code
  Domain-driven design thinking
  Scalable-by-default system structure
  API-first design: contract before implementation

Patterns he applies:
  Repository pattern for data access abstraction
  DTO layer for clean API contracts
  Service layer for encapsulated business logic
  Thin controllers (no logic lives there)
  Event-driven design (used in SEGA module)

His core philosophy:
  "Write code so clean that future-me won't hate
   current-me when maintaining it."

The real test: Can a new developer understand your
              system without a 2-hour walkthrough?
`.trim(),

  sql:`
SQL & Databases — Pratik's Data Layer Expertise

Databases he works with and still learning few:
  PostgreSQL - preferred production database
  MySQL      - solid relational workhorse
  SQL Server - enterprise environments

Core skills:
  Schema design & data normalization
  Complex multi-table joins & subqueries
  Index strategy for query optimization
  Stored procedures & database functions
  JPA/Hibernate ORM with Spring Boot
  Data modeling for scalable application layers

His honest take:
  "Professionally arguing with databases since 2022.
   The database usually wins.
   But I have gotten much better at the arguments."
`.trim(),
};

const INTENTS = [
  { id:"identity",          keys:["who","pratik","yourself","about","introduce","profile","background","tell me about","who is","who are you","what are you","you are"],              data:KB.identity },
  { id:"skills_overview",   keys:["skill","tech","stack","technology","tool","language","framework","backend","frontend","expert","proficient","know","code","programming","develop","what can","what do"], data:KB.skills_overview },
  { id:"java",              keys:["java","spring","spring boot","jpa","hibernate","maven","gradle","bean","microservice","nullpointer"],                                             data:KB.java },
  { id:"python",            keys:["python","fastapi","flask","django","numpy","pandas","scikit","pip","async"],                                                                      data:KB.python },
  { id:"react",             keys:["react","jsx","component","hooks","redux","nextjs","next.js","usestate","useeffect"],                                                              data:KB.react },
  { id:"ai_ml",             keys:["ai","ml","machine learning","artificial intelligence","model","training","forecast","predict","deep learning","neural","automation","automate","data science"], data:KB.ai_ml },
  { id:"suis",              keys:["suis","smart university","intelligent system","university system","university project"],                                                           data:KB.suis },
  { id:"kavout",            keys:["kavout","stock","nse","forecast","time series","trading","market","investment","share","financial","price prediction"],                           data:KB.kavout },
  { id:"smartCity",         keys:["smart city","city","urban","civic","municipality","issue solver","city solver","mlh"],                                                            data:KB.smartCity },
  { id:"sega",              keys:["sega","emergency","governance","incident","safety","compliance","alert","disaster","crisis"],                                                      data:KB.sega },
  { id:"projects_overview", keys:["project","build","work","portfolio","make","create","product","app","system","built","made","developed","all project","show project","list project"], data:KB.projects_overview },
  { id:"education",         keys:["education","study","college","degree","qualification","academic","university","kiit","cgpa","gpa","school","nepal","grade","marks","graduate","btech","b.tech"], data:KB.education },
  { id:"contact",           keys:["contact","email","reach","touch","connect","message","how to reach","get in touch"],                                                              data:KB.contact },
  { id:"availability",      keys:["hire","available","recruit","job","internship","opportunity","role","freelance","fulltime","full time","work with","work for","employ","position","open to work","looking for"], data:KB.availability },
  { id:"personality",       keys:["personality","character","person","human","authentic","vibe","mindset","who really","genuine","real"],                                            data:KB.personality },
  { id:"hackathon",         keys:["hackathon","hack","competition","event","contest","challenge","mlh hackathon"],                                                                   data:KB.hackathon },
  { id:"fun_facts",         keys:["fun","fact","interesting","weird","unique","funny","laugh","joke","quirk","surprising","random"],                                                 data:KB.fun_facts },
  { id:"architecture",      keys:["architecture","design pattern","solid","clean architecture","scalable","system design","structure","domain","pattern"],                           data:KB.architecture },
  { id:"sql",               keys:["sql","database","postgres","postgresql","mysql","db","query","schema","orm","data layer"],                                                        data:KB.sql },
];

const SUGG = {
  initial:          ["What are his skills?","Show me projects","How to hire him?","Who is Pratik?"],
  identity:         ["His tech skills?","Show projects","Education?","How to contact?"],
  skills_overview:  ["Java & Spring Boot","AI & ML details","Show me projects","Contact him"],
  java:             ["Python skills?","React.js work?","SUIS project","All projects"],
  python:           ["Java details?","AI/ML work?","Kavout project","Contact Pratik"],
  react:            ["Backend skills?","AI/ML details?","SUIS project?","All projects"],
  ai_ml:            ["Kavout project","Smart City ML?","His tech stack","How to hire?"],
  projects_overview:["About SUIS","About Kavout","Hackathon project?","His skills"],
  suis:             ["SEGA module?","Kavout project?","Skills used?","Contact Pratik"],
  kavout:           ["SUIS project?","AI/ML skills?","Hackathon work?","Hire him?"],
  smartCity:        ["SUIS project?","Other projects?","His AI skills","Fun facts!"],
  sega:             ["SUIS overview?","All projects?","His tech stack","Contact"],
  education:        ["His tech skills?","His projects?","Who is Pratik?","Contact him"],
  contact:          ["His projects?","Tech skills?","Education?","About Pratik"],
  availability:     ["See projects","Tech skills","Education background","Fun facts!"],
  personality:      ["His skills?","His projects?","Hire him?","Fun facts!"],
  hackathon:        ["Other projects?","His skills?","How to hire?","Who is Pratik?"],
  fun_facts:        ["His skills?","His projects?","Who is Pratik?","Contact him"],
  architecture:     ["His tech stack?","Project examples?","SUIS project?","Contact"],
  sql:              ["Backend skills?","System design?","His projects","Contact"],
  fallback:         ["His skills?","His projects?","Education?","How to contact?"],
};

const GREET_RE=/^(hi+|hello+|hey+|yo+|hola|namaste|sup|howdy|greetings|heya|what'?s up|wassup)\b/i;
const GREETINGS=[
  "Hey! I'm Pratik's AI Assistant, loaded with everything about his work. What would you like to explore?",
  "Hello! Ready to show you everything about Pratik: skills, projects, how to hire him. What's first?",
  "Hi! Think of me as your personal guide through Pratik's portfolio. Ask anything!",
  "Hey there! Ask me about his tech stack, projects, or 'who is Pratik?'- I've got it all covered.",
];
const FALLBACK_LEAD=[
  "Hmm, I didn't quite get that - but here is what I cover:",
  "That is outside my data! But I can definitely help with:",
  "Not sure about that one - but try asking about:",
];
const FALLBACK_BODY=`  His Skills & Full Tech Stack\n  Projects & Real-world Builds\n  Education & Background\n  Contact & Hiring Info\n\nJust ask naturally — I will figure it out!`;

function getNLPResponse(rawInput){
  const q=rawInput.toLowerCase().trim();
  if(GREET_RE.test(q)){
    return{text:GREETINGS[Math.floor(Math.random()*GREETINGS.length)],topic:"initial",suggestions:SUGG.initial};
  }
  let best=null,bestScore=0;
  for(const intent of INTENTS){
    let score=0;
    for(const key of intent.keys){
      if(q.includes(key)) score+=key.length*(key.includes(" ")?2.2:1);
    }
    if(score>bestScore){bestScore=score;best=intent;}
  }
  if(best&&bestScore>0){
    return{text:best.data,topic:best.id,suggestions:SUGG[best.id]||SUGG.fallback};
  }
  const lead=FALLBACK_LEAD[Math.floor(Math.random()*FALLBACK_LEAD.length)];
  return{text:`${lead}\n\n${FALLBACK_BODY}`,topic:"fallback",suggestions:SUGG.initial};
}

function speakText(text,enabled){
  if(!enabled||!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const clean=text
    .replace(/[\u{1F300}-\u{1FAFF}]/gu,"")
    .replace(/[→•✅🟡🟢⭐#:]/g," ")
    .replace(/\s{2,}/g," ")
    .slice(0,600)
    .trim();
  const utt=new SpeechSynthesisUtterance(clean);
  utt.rate=0.94;utt.pitch=1.05;utt.volume=1;
  const voices=window.speechSynthesis.getVoices();
  const pref=voices.find(v=>/Google.*English/i.test(v.name))||
             voices.find(v=>v.lang.startsWith("en")&&v.name.toLowerCase().includes("female"))||
             voices.find(v=>v.lang.startsWith("en"));
  if(pref)utt.voice=pref;
  window.speechSynthesis.speak(utt);
}

const uid=()=>Math.random().toString(36).slice(2,9);
const fmtTime=d=>d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

const WELCOME={
  role:"bot",
  text:"Hey! I'm Pratik's AI Portfolio Assistant.\n\nAsk me anything - his skills, projects, education, or how to get in touch. I know it all!",
};

export default function AIOrb(){
  const[open,setOpen]=useState(false);
  const[messages,setMessages]=useState([{id:"w0",...WELCOME,timestamp:new Date()}]);
  const[input,setInput]=useState("");
  const[isTyping,setIsTyping]=useState(false);
  const[voiceOn,setVoiceOn]=useState(false);
  const[suggestions,setSuggestions]=useState(SUGG.initial);

  const endRef=useRef(null);
  const inputRef=useRef(null);
  const prevOpenRef=useRef(false);
  const shouldReset=useRef(false);
  const typingTRef=useRef(null);
  const intervalRef=useRef(null);
  const voiceRef=useRef(false);

  useEffect(()=>{
    if(!document.getElementById("_aiorb_css")){
      const el=document.createElement("style");
      el.id="_aiorb_css";
      el.textContent=AIORB_CSS;
      document.head.appendChild(el);
    }
    window.speechSynthesis?.getVoices();
    window.speechSynthesis?.addEventListener("voiceschanged",()=>window.speechSynthesis.getVoices());
  },[]);

  useEffect(()=>{voiceRef.current=voiceOn;},[voiceOn]);

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[messages,isTyping]);

  useEffect(()=>{ if(open) setTimeout(()=>inputRef.current?.focus(),80); },[open]);

  // RESET ON CLOSE/REOPEN
  useEffect(()=>{
    const was=prevOpenRef.current;
    prevOpenRef.current=open;
    if(was&&!open){
      shouldReset.current=true;
      window.speechSynthesis?.cancel();
      clearTimeout(typingTRef.current);
      clearInterval(intervalRef.current);
    } else if(!was&&open&&shouldReset.current){
      shouldReset.current=false;
      setMessages([{id:uid(),...WELCOME,timestamp:new Date()}]);
      setSuggestions(SUGG.initial);
      setIsTyping(false);
      setInput("");
    }
  },[open]);

  const processQuery=(text)=>{
    if(!text.trim()||isTyping)return;
    setMessages(prev=>[...prev,{id:uid(),role:"user",text,timestamp:new Date()}]);
    setIsTyping(true);
    const{text:reply,suggestions:newSugs}=getNLPResponse(text);
    setSuggestions(newSugs);
    const delay=550+Math.random()*420;
    typingTRef.current=setTimeout(()=>{
      const botId=uid();
      setIsTyping(false);
      setMessages(prev=>[...prev,{id:botId,role:"bot",text:"",timestamp:new Date()}]);
      let i=0;
      const long=reply.length>350;
      const speed=long?4:12;
      const step=long?6:1;
      intervalRef.current=setInterval(()=>{
        i=Math.min(i+step,reply.length);
        setMessages(prev=>prev.map(m=>m.id===botId?{...m,text:reply.slice(0,i)}:m));
        if(i>=reply.length){
          clearInterval(intervalRef.current);
          speakText(reply,voiceRef.current);
        }
      },speed);
    },delay);
  };

  const sendMessage=()=>{ const t=input.trim(); setInput(""); processQuery(t); };
  const handleChip=s=>processQuery(s);
  const toggleVoice=()=>{ window.speechSynthesis?.cancel(); setVoiceOn(v=>!v); };

  const panelStyle={
    position:"fixed",bottom:84,right:26,width:348,
    background:"rgba(10,12,20,0.97)",
    backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",
    border:"1px solid rgba(255,255,255,0.09)",borderRadius:20,zIndex:199,
    boxShadow:"0 32px 80px rgba(0,0,0,0.65),0 0 0 1px rgba(82,130,255,0.06)",
    display:"flex",flexDirection:"column",
    fontFamily:'"DM Sans",system-ui,sans-serif',
    overflow:"hidden",maxHeight:"88vh",
  };
  const headerStyle={
    padding:"13px 15px",borderBottom:"1px solid rgba(255,255,255,0.07)",
    display:"flex",alignItems:"center",gap:10,
    background:"rgba(255,255,255,0.02)",flexShrink:0,
  };
  const avatarBoxStyle={
    width:36,height:36,borderRadius:10,flexShrink:0,
    background:"linear-gradient(135deg,rgba(82,130,255,0.25),rgba(55,90,200,0.12))",
    border:"1px solid rgba(82,130,255,0.25)",
    display:"flex",alignItems:"center",justifyContent:"center",
  };
  const iconBtnBase={
    width:30,height:30,borderRadius:8,cursor:"pointer",
    display:"flex",alignItems:"center",justifyContent:"center",
    fontSize:14,flexShrink:0,border:"1px solid rgba(255,255,255,0.09)",
  };
  const messagesStyle={
    flex:1,overflowY:"auto",padding:"14px 14px 8px",
    display:"flex",flexDirection:"column",gap:11,minHeight:180,
  };
  const miniAvatarStyle={
    width:24,height:24,borderRadius:7,flexShrink:0,
    background:"linear-gradient(135deg,rgba(82,130,255,0.22),rgba(55,90,200,0.1))",
    border:"1px solid rgba(82,130,255,0.22)",
    display:"flex",alignItems:"center",justifyContent:"center",marginTop:2,
  };
  const botBubble={
    padding:"9px 13px",borderRadius:"5px 15px 15px 15px",
    background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",
    fontSize:12.5,lineHeight:1.75,color:"#cdd4e8",
    whiteSpace:"pre-wrap",wordBreak:"break-word",maxWidth:"82%",
  };
  const userBubble={
    padding:"9px 13px",borderRadius:"15px 5px 15px 15px",
    background:"linear-gradient(135deg,#3b5fd4,#5282ee)",
    fontSize:12.5,lineHeight:1.75,color:"#fff",
    whiteSpace:"pre-wrap",wordBreak:"break-word",maxWidth:"82%",
  };
  const dotStyle={width:6,height:6,borderRadius:"50%",background:"#4ade80",
    display:"inline-block",flexShrink:0,boxShadow:"0 0 5px rgba(74,222,128,0.7)"};
  const typingDot={width:5,height:5,borderRadius:"50%",background:"#5282ee",display:"inline-block"};

  return(
    <>
      {open&&(
        <div className="_aio_panel" style={panelStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={avatarBoxStyle}>
              <img src={aiIcon} alt="AI" style={{width:"78%",height:"78%",objectFit:"contain"}}/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,color:"#e8ecf8",letterSpacing:"-.01em"}}>
                Portfolio AI
              </div>
              <div style={{fontSize:10.5,color:"#5b7ba8",display:"flex",alignItems:"center",gap:5,marginTop:1}}>
                <span style={dotStyle}/>
                Online · Pratik's Assistant
              </div>
            </div>
                    <button
          className={`_aio_iconbtn${voiceOn ? " _aio_voice_on" : ""}`}
          style={{
            ...iconBtnBase,
            background: voiceOn
              ? "rgba(82,130,255,0.18)"
              : "rgba(255,255,255,0.05)",
            color: voiceOn ? "#82a8ff" : "#8892a4",
          }}
          onClick={toggleVoice}
          title={voiceOn ? "Voice On — click to mute" : "Voice Off — click to enable"}
        >
          {voiceOn ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>

        <button
          className="_aio_iconbtn"
          style={{
            ...iconBtnBase,
            background: "rgba(255,255,255,0.05)",
            color: "#8892a4",
          }}
          onClick={() => setOpen(false)}
          title="Close chat"
        >
          ✕
        </button>
          </div>

         
{/* Messages */}
<div
  className="_aio_scroll"
  style={{
    ...messagesStyle,
    overflowY: "auto",
  }}
>
  {messages.map((msg) => (
    <div
      key={msg.id}
      className={msg.role === "bot" ? "_aio_bot_msg" : "_aio_user_msg"}
      style={{
        display: "flex",
        flexDirection: msg.role === "bot" ? "row" : "row-reverse",
        gap: 8,
        alignItems: "flex-start",
        minWidth: 0, 
      }}
    >
      {msg.role === "bot" && (
        <div style={miniAvatarStyle}>
          <img
            src={aiIcon}
            alt=""
            style={{ width: "76%", height: "76%", objectFit: "contain" }}
          />
        </div>
      )}

      {/* WRAPPER */}
      <div style={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            ...(msg.role === "bot" ? botBubble : userBubble),

            
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            whiteSpace: "pre-wrap",

            maxWidth: "100%",  
          }}
        >
          {msg.text || (msg.role === "bot" ? "…" : "")}
        </div>

        <div
          style={{
            fontSize: 10,
            color: "#3a4460",
            marginTop: 3,
            paddingInline: 2,
            textAlign: msg.role === "bot" ? "left" : "right",
          }}
        >
          {fmtTime(msg.timestamp)}
        </div>
      </div>
    </div>
  ))}

  {/* Typing */}
  {isTyping && (
    <div
      className="_aio_bot_msg"
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        minWidth: 0, 
      }}
    >
      <div style={miniAvatarStyle}>
        <img
          src={aiIcon}
          alt=""
          style={{ width: "76%", height: "76%", objectFit: "contain" }}
        />
      </div>

      <div
        style={{
          ...botBubble,
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          whiteSpace: "pre-wrap",
          maxWidth: "100%",

          padding: "11px 15px",
          display: "flex",
          gap: 5,
          alignItems: "center",
        }}
      >
        <span className="_aio_d1" style={typingDot} />
        <span className="_aio_d2" style={typingDot} />
        <span className="_aio_d3" style={typingDot} />
      </div>
    </div>
  )}

  <div ref={endRef} style={{ height: 2 }} />
</div>

{/* Suggestion chips */}
<div
  className="_aio_scroll"
  style={{
    padding: "6px 12px 4px",
    flexShrink: 0,
    display: "flex",
    gap: 6,
    flexWrap: "nowrap",
    overflowX: "auto",
    overflowY: "hidden",
  }}
>
  {suggestions.map((s, i) => (
    <button
      key={i}
      className="_aio_chip"
      onClick={() => handleChip(s)}
      style={{
        flexShrink: 0,
        padding: "4px 10px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        color: "#8892a4",
        fontSize: 11,
        whiteSpace: "nowrap",
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {s}
    </button>
  ))}
</div>

          {/* Input row */}
          <div style={{padding:"8px 13px 14px",display:"flex",gap:8,flexShrink:0,
            borderTop:"1px solid rgba(255,255,255,0.05)"}}>
            <input ref={inputRef} className="_aio_input"
              style={{flex:1,padding:"9px 12px",
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:10,color:"#e0e4f0",fontSize:12.5,
                outline:"none",fontFamily:"inherit"}}
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&sendMessage()}
              placeholder="Ask anything about Pratik…"
              maxLength={400}
            />
            <button className="_aio_send" onClick={sendMessage} disabled={isTyping}
              title="Send"
              style={{width:38,height:38,borderRadius:10,border:"none",color:"#fff",
                fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",
                flexShrink:0,background:isTyping?"rgba(82,130,255,0.3)":"#5282ee",
                cursor:isTyping?"not-allowed":"pointer"}}>
              ↑
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button className="_aio_fab" title="Chat with Pratik's AI Assistant"
        style={{position:"fixed",bottom:26,right:26,width:54,height:54,borderRadius:15,
          background:"linear-gradient(135deg,#5282ee,#3b5fd4)",
          border:"none",cursor:"pointer",zIndex:200,
          display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:"0 8px 28px rgba(82,130,255,.45)"}}
        onClick={()=>setOpen(o=>!o)}>
        {open
          ?<span style={{fontSize:20,color:"#fff",fontWeight:300,lineHeight:1}}>✕</span>
          :<img className="_aio_orb_img" src={aiIcon} alt="AI"
              style={{width:"70%",height:"70%",objectFit:"contain"}}/>
        }
      </button>
    </>
  );
}