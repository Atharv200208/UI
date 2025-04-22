import { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [openPrimary, setOpenPrimary] = useState("🎓 Student View");
  const [openSection, setOpenSection] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const contentRefs = useRef({});
  const sectionRefs = useRef({});

  const togglePrimary = (section) => {
    setOpenPrimary(openPrimary === section ? null : section);
    setOpenSection(null);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const chevronStyle = (section, primary = false) => ({
    transition: "transform 0.3s ease",
    transform: section === (primary ? openPrimary : openSection)
      ? "rotate(90deg)"
      : "rotate(0deg)",
  });

  const sectionStyle = (section, primary = false) => {
    const isOpen = section === (primary ? openPrimary : openSection);
    return {
      overflow: "hidden",
      transition: "max-height 0.4s ease",
      maxHeight: isOpen ? "1000px" : "0px",
    };
  };

  const linkStyle = (name, path) => {
    const isActive = location.pathname === path;
    const isHovered = hoveredLink === name;

    return {
      display: "block",
      padding: "8px 12px",
      borderRadius: "8px",
      backgroundColor: isActive
        ? "#e0f0ff"
        : isHovered
        ? "#1f2d3d"
        : "transparent",
      color: isActive || isHovered ? "#0d6efd" : "#f8f9fa", // ✅ White by default
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: isActive ? "bold" : "normal",
      borderLeft: isActive ? "4px solid #0d6efd" : "4px solid transparent",
      transition: "all 0.3s ease",
    };
  };

  const primaryViews = [
    {
      title: "🎓 Student View",
      sections: [
        {
          title: "🧭 Dashboards",
          links: [
            { name: "home", label: "Home", path: "/home" },
            { name: "history", label: "History", path: "/history" },
            { name: "deposit", label: "Deposit", path: "/Deposit" },
          ],
        },
        {
          title: "📁 Datasets",
          links: [{ name: "reports", label: "Report", path: "/Reports" }],
        },
        {
          title: "📊 Reports",
          links: [
            {
              name: "monthly-view",
              label: "Monthly Statement View",
              path: "/Student-History-Table",
            },
            {
              name: "verification-feedback",
              label: "Verification Feedback Report",
              path: "/Verification-Feedback-Report",
            },
            {
              name: "fine-payment",
              label: "Fine Payment Report",
              path: "/FinePaymentReport",
            },
          ],
        },
      ],
    },
    {
      title: "🛠️ Admin View",
      sections: [
        {
          title: "🧭 Dashboards",
          links: [
            { name: "home", label: "Home", path: "/home" },
            { name: "history", label: "History", path: "/history" },
            { name: "deposit", label: "Deposit", path: "/Deposit" },
          ],
        },
        {
          title: "📁 Datasets",
          links: [{ name: "reports", label: "Report", path: "/Reports" }],
        },
        {
          title: "📊 Reports",
          links: [
            {
              name: "charts",
              label: " Charts",
              path: "/Charts",
            },
            {
              name: "yearly-summary-report",
              label: "Yearly Summary Report",
              path: "/Yearly-Summary-Report",
            },
            {
              name: "add-report-form ",
              label: "Add Report Form",
              path: "/Add-Report-Form",
            },
            {
              name: "yearly-report",
              label: "Yearly Report",
              path: "/Yearly-Report"
            }
          ],
        },
      ],
    },
  ];

  return (
    <div className="bg-dark text-white vh-auto" style={{ width: "250px" }}>
      <div className="text-center mb-4 py-2 border-bottom border-secondary">
        <img
          src="/header-logo.png"
          alt="Logo"
          style={{ width: "200px", objectFit: "contain" }}
        />
      </div>

      {primaryViews.map(({ title, sections }) => (
        <div key={title} className="mb-2 px-3">
          <div
            className="d-flex justify-content-between align-items-center mb-2 text-uppercase fw-semibold"
            style={{ color: "#f8f9fa" }}
            role="button"
            onClick={() => togglePrimary(title)}
          >
            <span>{title}</span>
            <ChevronRight size={16} style={chevronStyle(title, true)} />
          </div>

          <div
            style={sectionStyle(title, true)}
            ref={(el) => (sectionRefs.current[title] = el)}
          >
            {sections.map(({ title: subTitle, links }) => (
              <div key={subTitle} className="mb-3 ps-2">
                <div
                  className="d-flex justify-content-between align-items-center mb-1 mt-2 mb-2 text-uppercase small"
                  style={{ color: "#f8f9fa" }}
                  role="button"
                  onClick={() => toggleSection(subTitle)}
                >
                  <span>{subTitle}</span>
                  <ChevronRight size={14} style={chevronStyle(subTitle)} />
                </div>

                <div
                  style={sectionStyle(subTitle)}
                  ref={(el) => (contentRefs.current[subTitle] = el)}
                >
                  <ul className="list-unstyled">
                    {links.map(({ name, label, path }) => (
                      <li className="mb-1" key={name}>
                        <Link
                            to={path}
                            style={linkStyle(name, path)}
                            onMouseEnter={() => setHoveredLink(name)}
                            onMouseLeave={() => setHoveredLink(null)}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor: location.pathname === path ? "#0d6efd" : "#6c757d",
                                display: "inline-block",
                                marginRight: "10px",
                              }}
                            ></span>
                            {label}
                          </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
