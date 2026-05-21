import React from "react";

import {
  Leaf,
  ShieldCheck,
  Users,
  BadgeIndianRupee,
  Trees
} from "lucide-react";

import teaBg from "./assets/tea-bg.avif";

function HomePage() {

  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage:
          `url(${teaBg})`
      }}
    >

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/55
          backdrop-blur-[2px]
        "
      />

      {/* MAIN CONTENT */}


      <div
  className="
    absolute
    top-8
    left-1/2
    z-20
    -translate-x-1/2
    text-center
  "
>

  <h1
    className="
      text-4xl
      md:text-6xl
      font-black
      tracking-[0.15em]
      text-white
      drop-shadow-2xl
    "
  >
    TeaSphere
  </h1>

  <p
    className="
      mt-2
      text-sm
      md:text-base
      uppercase
      tracking-[0.45em]
      text-emerald-200
    "
  >
    Management
  </p>

</div>
      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          px-6
          py-12
        "
      >

        <div
          className="
            grid
            w-full
            
            grid-cols-1
            gap-10
            lg:grid-cols-2
            lg:items-center
          "
        >

          {/* LEFT SIDE */}
          <div>

            

            {/* TITLE */}
            <h1
  className="
    mt-8
    text-3xl
    font-black
    leading-[1.1]
    text-white
    lg:text-6xl
  "
>
              Smart Plantation
              <span className="block text-emerald-300">
                Workforce Management
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-8
                max-w-2xl
                text-lg
                leading-8
                text-emerald-50/80
              "
            >
              Streamline plantation operations with a modern enterprise
              management platform for workforce tracking, attendance,
              estate sections, payroll processing and operational analytics.
            </p>

            {/* FEATURES */}
            <div
              className="
                mt-10
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
              "
            >

              <FeatureCard
                icon={<Users size={24} />}
                title="Workers Management"
                description="Track supervisors, field workers and estate workforce efficiently."
              />

              <FeatureCard
                icon={<Trees size={24} />}
                title="Estate Sections"
                description="Manage tea plantation sections and field operations."
              />

              <FeatureCard
                icon={<ShieldCheck size={24} />}
                title="Attendance Tracking"
                description="Daily attendance, task monitoring and productivity tracking."
              />

              <FeatureCard
                icon={<BadgeIndianRupee size={24} />}
                title="Payroll Automation"
                description="Salary generation, overtime calculation and payout management."
              />

            </div>

          </div>

          {/* RIGHT SIDE CARD */}
          <div
  className="
    relative
    mt-20
    overflow-hidden
    rounded-[40px]
    border
    border-white/20
    bg-white/10
    p-10
    shadow-2xl
    backdrop-blur-2xl
  "
>

            {/* TOP GLOW */}
            <div
              className="
                absolute
                inset-x-0
                top-0
                h-1
                bg-gradient-to-r
                from-emerald-400
                via-green-500
                to-emerald-400
              "
            />

            {/* ICON */}
            <div
              className="
                mx-auto
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-full
                bg-emerald-100/90
                text-emerald-900
                shadow-2xl
              "
            >

              <Leaf size={48} />

            </div>

            {/* CONTENT */}
            <div className="text-center">

              <p
                className="
                  mt-8
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-emerald-100
                "
              >
                Enterprise Resource Planning
              </p>

              <h2
                className="
                  mt-5
                  text-5xl
                  font-black
                  text-white
                "
              >
                Welcome
              </h2>

              <p
                className="
                  mt-5
                  text-lg
                  leading-8
                  text-emerald-50/80
                "
              >
                Access the Tea Plantation Management System to manage
                workforce operations, attendance, payroll and estate analytics.
              </p>

            </div>

            {/* BUTTONS */}
            <div className="mt-10 space-y-5">

              {/* LOGIN */}
              <button
                onClick={() =>
                  window.location.href = "/login"
                }
                className="
                  w-full
                  rounded-2xl
                  bg-gradient-to-r
                  from-emerald-700
                  to-green-500
                  px-6
                  py-5
                  text-lg
                  font-bold
                  text-white
                  shadow-2xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-emerald-500/30
                "
              >
               Access Plantation Hub
              </button>

              {/* SIGNUP */}
              <button
                onClick={() =>
                  window.location.href = "/signup"
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/10
                  px-6
                  py-5
                  text-lg
                  font-bold
                  text-white
                  shadow-xl
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:bg-white/20
                "
              >
                Create Plantation Account
              </button>

            </div>

            {/* FOOTER */}
            <p
              className="
                mt-8
                text-center
                text-sm
                text-emerald-50/70
              "
            >
              Secure workforce operations and smart plantation management.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

/* FEATURE CARD */
function FeatureCard({
  icon,
  title,
  description
}) {

  return (

    <div
      className="
        rounded-3xl
        border
        border-white/20
        bg-white/10
        p-5
        shadow-xl
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white/15
      "
    >

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-emerald-500/20
          text-emerald-100
        "
      >
        {icon}
      </div>

      <h3
        className="
          mt-5
          text-xl
          font-bold
          text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3
          text-sm
          leading-7
          text-emerald-50/75
        "
      >
        {description}
      </p>

    </div>
  );
}

export default HomePage;