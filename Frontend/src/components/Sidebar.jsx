import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaHouse,
  FaCircleInfo,
  FaGraduationCap,
  FaAddressBook,
  FaFile,
  FaScrewdriverWrench,
  FaDiagramProject,
  FaStar
} from "react-icons/fa6";

// Restored labels ONLY for native hover tooltips
const navItems = [
  { path: "/", icon: <FaHouse size={18} />, label: "Home" },
  { path: "/about", icon: <FaCircleInfo size={18} />, label: "About" },
  { path: "/projects", icon: <FaDiagramProject size={18} />, label: "Projects" },
  { path: "/services", icon: <FaScrewdriverWrench size={18} />, label: "Services" },
  { path: "/education", icon: <FaGraduationCap size={18} />, label: "Education" },
  { path: "/certificates", icon: <FaFile size={18} />, label: "Certificates" },
  { path: "/contact", icon: <FaAddressBook size={18} />, label: "Contact" },
  { path: "/review", icon: <FaStar size={18} />, label: "Review" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      <style>{`
        /* Core Sidebar Architecture */
        .app-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 90px; /* Fixed desktop width */
          z-index: 100;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--bdr);
          display: flex;
          flex-direction: column;
          align-items: center; /* Perfectly centers everything horizontally */
          transition: width 0.3s ease;
        }

        /* Brand / Logo Area */
        .brand-section {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 80px;
          border-bottom: 1px solid var(--bdr);
          flex-shrink: 0;
        }

        .brand-logo {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .brand-logo:hover {
          transform: scale(1.08);
        }

        /* Nav Links Area */
        .nav-list {
          list-style: none;
          padding: 24px 0;
          margin: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          overflow-x: hidden;
          overflow-y: auto;
          /* Hide scrollbar for a sleek dock look */
          -ms-overflow-style: none;  
          scrollbar-width: none;  
        }
        .nav-list::-webkit-scrollbar { 
          display: none; 
        }

        .nav-item-li {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          text-decoration: none;
          color: var(--t3);
          transition: all 0.25s ease;
        }

        .nav-link:hover {
          background: var(--surf);
          color: var(--t1);
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: var(--pdim);
          color: var(--p);
          box-shadow: inset 0 0 0 1px rgba(91,141,238,0.15); /* Premium active glow */
        }

        /* ========================================================= */
        /* AUTO-SHRINK: Tablet, iPad & Mobile (Below 1024px)         */
        /* ========================================================= */
        @media (max-width: 1024px) {
          .app-sidebar {
            width: 72px; /* Slimmer on smaller screens */
          }
          .nav-link {
            width: 44px;
            height: 44px;
            border-radius: 12px;
          }
          .brand-logo {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>

      <nav className="app-sidebar">
        
        {/* BRAND */}
        <div className="brand-section">
          <img src={logo} alt="Logo" className="brand-logo" />
        </div>

        {/* NAV LINKS */}
        <ul className="nav-list">
          {navItems.map((item) => {
            const isActive = item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

            return (
              <li key={item.path} className="nav-item-li">
                <NavLink
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  title={item.label} /* Crucial: Restored so users see "Home", "About" on hover */
                >
                  {item.icon}
                </NavLink>
              </li>
            );
          })}
        </ul>

      </nav>
    </>
  );
}