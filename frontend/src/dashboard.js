import React from "react";

import {
  Users,
  Leaf,
  CalendarDays,
  DollarSign,
  LogOut,
  Sprout
} from "lucide-react";

import DashboardAnalytics
  from "./dashboard/dashboardAnalytics";

import teaBg
  from "./assets/tea-bg.jpg";

function Dashboard() {

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  return (

    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        relative
        overflow-hidden
      "
      style={{
        backgroundImage:
          `url(${teaBg})`
      }}
    >

      {/* Background Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-white/20
          backdrop-blur-[3px]
        "
      />

      {/* Main Content */}
      <div
        className="
          relative
          z-10
          px-6
          py-6
          sm:py-10
        "
      >

        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-14">

          {/* Leaf Icon */}
          <div
  className="
    flex
    justify-center
    mb-4
  "
>

  

</div>
          {/* Main Heading */}
          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              text-green-950
              tracking-wide
              drop-shadow-lg
            "
            style={{
              fontFamily:
                "Georgia, serif"
            }}
          >
            TEA PLANTATION
            MANAGEMENT
          </h1>

          {/* Decorative Line */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              mt-5
              mb-10
            "
          >

            <div
              className="
                h-[2px]
                w-16
                sm:w-24
                md:w-32
                bg-green-900/40
              "
            />

            <div className="text-2xl">
              🌿
            </div>

            <div
              className="
                h-[2px]
                w-16
                sm:w-24
                md:w-32
                bg-green-900/40
              "
            />

          </div>

          {/* Navigation */}
          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-4
              sm:gap-6
            "
          >

            <button
              onClick={() =>
                window.location.href =
                  "/workers"
              }
              className={navBtn}
            >
              <Users size={22} />
              Workers
            </button>

            <button
              onClick={() =>
                window.location.href =
                  "/sections"
              }
              className={navBtn}
            >
              <Leaf size={22} />
              Estate Sections
            </button>

            <button
              onClick={() =>
                window.location.href =
                  "/attendance"
              }
              className={navBtn}
            >
              <CalendarDays size={22} />
              Attendance
            </button>

            <button
              onClick={() =>
                window.location.href =
                  "/payroll"
              }
              className={navBtn}
            >
              <DollarSign size={22} />
              Payroll
            </button>

            <button
              onClick={handleLogout}
              className={logoutBtn}
            >
              <LogOut size={22} />
              Logout
            </button>

          </div>

        </div>

        {/* Dashboard Analytics */}
        <div
  className="
    bg-black/10
    backdrop-blur-2xl
    border
    border-white/20
    rounded-[40px]
    p-4
    sm:p-6
    md:p-8
    shadow-2xl
  "
>

          <DashboardAnalytics />

        </div>

      </div>

    </div>
  );
}

// =========================
// BUTTON STYLES
// =========================

const navBtn = `
  flex
  items-center
  gap-3
  px-8
  py-4
  rounded-full
  bg-gradient-to-r
  from-green-800
  to-green-600
  text-white
  font-semibold
  text-lg
  shadow-xl
  hover:scale-105
  hover:from-green-700
  hover:to-green-500
  transition-all
  duration-300
`;

const logoutBtn = `
  flex
  items-center
  gap-3
  px-8
  py-4
  rounded-full
  bg-gradient-to-r
  from-red-500
  to-red-400
  text-white
  font-semibold
  text-lg
  shadow-xl
  hover:scale-105
  transition-all
  duration-300
`;

export default Dashboard;