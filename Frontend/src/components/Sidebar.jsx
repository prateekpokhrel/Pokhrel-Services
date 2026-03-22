import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo.png";
import {
  FaHouse,
  FaCircleInfo,
  FaGraduationCap,
  FaAddressBook,
  FaFile,
  FaScrewdriverWrench,
  FaDiagramProject,
  FaSun, FaMoon , FaStar
} from "react-icons/fa6";

const navItems = [
  { path: "/", icon: <FaHouse size={16} />, label: "Home" },
  { path: "/about", icon: <FaCircleInfo size={16} />, label: "About" },
  { path: "/projects", icon: <FaDiagramProject size={16} />, label: "Projects" },
  { path: "/services", icon: <FaScrewdriverWrench size={16} />, label: "Services" },
  { path: "/education", icon: <FaGraduationCap size={16} />, label: "Education" },
  { path: "/certificates", icon: <FaFile size={16} />, label: "Certificates" },
  { path: "/contact", icon: <FaAddressBook size={16} />, label: "Contact" },
  { path: "/reviews", icon: <FaStar size={16} />, label: "Reviews" },
];

export default function Sidebar({
  collapsed,
  onToggle,
  isNight,
  onModeToggle,
}) {
  const location = useLocation();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isNight ? "dark" : "light"
    );
    localStorage.setItem("theme", isNight ? "dark" : "light");
  }, [isNight]);

  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: collapsed ? "72px" : "240px",
        height: "100vh",
        zIndex: 100,
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--bdr)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.4s ease",
      }}
    >
      {/* BRAND */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "20px",
          borderBottom: "1px solid var(--bdr)",
          position: "relative",
        }}
      >
        <div>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              transition: "all 0.3s ease",
              transform: collapsed ? "rotate(0deg)" : "rotate(360deg)",
            }}
          />
         
        </div> 
        <button
  onClick={onToggle}
  style={{
    position: "absolute",
    right: "-14px",
    top: "50%",
    transform: "translateY(-50%)",
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "1px solid var(--bdr)",
    background: "var(--bg2)",
    color: "var(--t2)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    transition: "all 0.25s var(--ease)",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    zIndex: 120,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = "var(--p)";
    e.currentTarget.style.color = "var(--p)";
    e.currentTarget.style.boxShadow = "0 0 12px rgba(91,141,238,0.5)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = "var(--bdr)";
    e.currentTarget.style.color = "var(--t2)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  <span
    style={{
      transition: "transform 0.3s var(--ease)",
      display: "inline-block",
      transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
    }}
  >
    ›
  </span>
</button>
      </div>

      {/* NAV LINKS */}
      <ul
        style={{
          listStyle: "none",
          padding: "12px",
          flex: 1,
        }}
      >
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px",
                  borderRadius: 8,
                  marginBottom: 6,
                  textDecoration: "none",
                  background: isActive ? "var(--pdim)" : "transparent",
                  color: isActive ? "var(--p)" : "var(--t3)",
                  fontSize: 13,
                }}
              >
                <span style={{ width: 20, textAlign: "center" }}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* FOOTER (FIXED PROPERLY) */}
      <div
        style={{
          padding: 12,
          borderTop: "1px solid var(--bdr)",
          marginTop: "auto",
        }}
      >
       <button
  onClick={onModeToggle}
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: 8,
    border: "1px solid var(--bdr)",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: collapsed ? "center" : "flex-start",
    gap: 10,
    fontSize: 12,
    color: "var(--t2)",
    transition: "all 0.2s var(--ease)",
  }}
>
  <span style={{ display: "flex", alignItems: "center" }}>
    {isNight ? (
      <FaMoon size={14} />
    ) : (
      <FaSun size={14} />
    )}
  </span>

  {!collapsed && (
    <span>{isNight ? "Night Mode" : "Day Mode"}</span>
  )}
</button>
      </div>
    </nav>
  );
}