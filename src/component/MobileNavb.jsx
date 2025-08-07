import React from "react";

const navItems = [
  {
    label: "WP",
    icon: (
      <div
        style={{
          width: 35,
          height: 35,
          background: "#111",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          fontWeight: "bold",
          fontSize: 14,
        }}
      >
        WP
      </div>
    ),
    active: true,
    notification: false,
  },
  {
    label: "Products",
    icon: <span style={{ fontSize: 24 }}>💄</span>,
    active: false,
    notification: false,
  },
  {
    label: "Services",
    icon: (
      <div
        style={{
          width: 28,
          height: 28,
          background: "#f1f1f1",
          borderRadius: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg width="15" height="15">
          <rect x="1" y="4" width="13" height="10" fill="gray" />
          <rect x="3" y="2" width="12" height="3" fill="white" />
        </svg>
      </div>
    ),
    active: false,
    notification: true,
  },
  {
    label: "Profile",
    icon: (
      <div
        style={{
          width: 35,
          height: 35,
          backgroundColor: "#eee",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
        }}
      >
        👤
      </div>
    ),
    active: false,
    notification: false,
  },
];

const MobileNavbar = () => (
  <nav
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 70,
      backgroundColor: "#ffffff",
      borderTop: "1px solid #ddd",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      zIndex: 1000,
      boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.05)",
    }}
  >
    {navItems.map((item) => (
      <div
        key={item.label}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          minWidth: 60,
        }}
      >
        <div style={{ position: "relative" }}>
          {item.icon}
          {item.notification && (
            <span
              style={{
                position: "absolute",
                top: 0,
                right: -2,
                width: 10,
                height: 10,
                backgroundColor: "red",
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />
          )}
        </div>
        <div
          style={{
            fontSize: 12,
            color: item.active ? "#000" : "#888",
            marginTop: 5,
            fontWeight: item.active ? 600 : 400,
          }}
        >
          {item.label}
        </div>
      </div>
    ))}
  </nav>
);

export default MobileNavbar;
