import React, {
  useState,
  useEffect
} from "react";

import {
  Home,
  Plus,
  Clock,
  Users,
  Activity,
  Leaf
} from "lucide-react";

import AttendanceForm from "./attendanceForm";
import AttendanceList from "./attendanceList";

import {
  fetchAttendance
} from "./attendanceService";

import teaBg from "../assets/tea-bg.jpg";

function AttendancePage() {

  const [
    refreshTrigger,
    setRefreshTrigger
  ] = useState(0);

  const [
    showForm,
    setShowForm
  ] = useState(false);

  const [
    editingAttendance,
    setEditingAttendance
  ] = useState(null);

  // =========================
  // ATTENDANCE DATA
  // =========================

  const [
    attendanceData,
    setAttendanceData
  ] = useState([]);

  // =========================
  // LOAD ATTENDANCE
  // =========================

  useEffect(() => {

    const loadAttendance =
      async () => {

        try {

          const data =
            await fetchAttendance();

          if (
            Array.isArray(data)
          ) {

            setAttendanceData(
              data
            );
          }

        } catch (error) {

          console.error(
            "Error loading attendance:",
            error
          );
        }
      };

    loadAttendance();

  }, [refreshTrigger]);

  // =========================
  // REFRESH ATTENDANCE
  // =========================

  const refreshAttendance = () => {

    setRefreshTrigger(
      refreshTrigger + 1
    );

    setShowForm(false);

    setEditingAttendance(null);
  };

  // =========================
  // DYNAMIC ANALYTICS
  // =========================

  const presentWorkers =
    attendanceData.filter(
      (item) =>
        item.attendanceStatus
          ?.toLowerCase()
          .includes("present")
    ).length;

  const absentWorkers =
    attendanceData.filter(
      (item) =>
        item.attendanceStatus
          ?.toLowerCase()
          .includes("absent")
    ).length;

  const totalProductivity =
    attendanceData.reduce(
      (total, item) =>
        total +
        Number(
          item.quantityCollected || 0
        ),
      0
    );

  const activeSections =
    new Set(
      attendanceData.map(
        (item) =>
          item.assignedSection
      )
    ).size;

  return (

    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        relative
      "
      style={{
        backgroundImage:
          `url(${teaBg})`,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/20
          backdrop-blur-[2px]
        "
      />

      {/* MAIN CONTENT */}
      <div
        className="
          relative
          z-10
          px-6
          py-10
        "
      >

        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center
            gap-6
            mb-10
          "
        >

          {/* LEFT */}
          <div>

            <div
              className="
                flex
                items-center
                gap-5
              "
            >

              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-100/80
                  text-emerald-900
                  shadow-2xl
                "
              >

                <Clock size={38} />

              </div>

              <div>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl antialiased">
  Attendance Management
</h1>
                <p
                  className="
                    mt-2
                    text-lg
                    text-emerald-50/90
                  "
                >
                  Track workforce attendance
                  and plantation productivity
                </p>

                

              </div>

            </div>

          </div>

          {/* BUTTONS */}
          <div
            className="
              flex
              flex-wrap
              gap-4
            "
          >

            {/* DASHBOARD */}
            <button
                         onClick={() =>
                           window.location.href =
                             "/dashboard"
                         }
                         className="
                           flex
                           items-center
                           gap-3
                           px-8
                           py-4
                           rounded-2xl
                           bg-white/30
                           backdrop-blur-md
                           border
                           border-white/30
                           shadow-lg
                           hover:scale-105
                           hover:bg-white/40
                           transition-all
                           duration-300
                           text-green-950
                           font-semibold
                           text-lg
                         "
                       >
           
                         <Home size={22} />
           
                         Dashboard
           
                       </button>
            {/* ADD BUTTON */}
            <button
              onClick={() => {

                setEditingAttendance(null);

                setShowForm(true);
              }}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-emerald-700
                to-green-600
                px-7
                py-4
                text-lg
                font-semibold
                text-white
                shadow-2xl
                transition-all
                duration-300
                hover:scale-105
              "
            >

              <Plus size={22} />

              Add Attendance

            </button>

          </div>

        </div>

        {/* OVERVIEW CARDS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-12
          "
        >

          {/* PRESENT */}
          <AnalyticsCard
            title="Present Today"
            value={presentWorkers}
            description="Workers currently active"
            icon={<Users size={28} />}
            iconBg="bg-emerald-500/20"
          />

          {/* ABSENT */}
          <AnalyticsCard
            title="Absent Workers"
            value={absentWorkers}
            description="Workers unavailable today"
            icon={<Activity size={28} />}
            iconBg="bg-rose-500/20"
          />

          {/* PRODUCTIVITY */}
          <AnalyticsCard
            title="Productivity"
            value={`${totalProductivity}kg`}
            description="Leaves collected today"
            icon={<Leaf size={28} />}
            iconBg="bg-amber-500/20"
          />

          {/* ACTIVE SECTIONS */}
          <AnalyticsCard
            title="Active Sections"
            value={activeSections}
            description="Operating plantation blocks"
            icon={<Clock size={28} />}
            iconBg="bg-cyan-500/20"
          />

        </div>

        {/* ATTENDANCE LIST */}
        <AttendanceList
          refreshTrigger={refreshTrigger}
          refreshAttendance={refreshAttendance}
          setEditingAttendance={setEditingAttendance}
          setShowForm={setShowForm}
        />

      </div>

      {/* MODAL */}
      {showForm && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-md
            px-4
            py-8
            overflow-y-auto
          "
        >

          <div
            className="
              relative
              w-full
              max-w-3xl
            "
          >

            <AttendanceForm
              refreshAttendance={refreshAttendance}
              editingAttendance={editingAttendance}
              onClose={() => {

                setShowForm(false);

                setEditingAttendance(null);
              }}
            />

          </div>

        </div>

      )}

    </div>
  );
}

// =========================
// ANALYTICS CARD COMPONENT
// =========================

function AnalyticsCard({
  title,
  value,
  description,
  icon,
  iconBg
}) {

  return (

    <div
      className="
        rounded-[30px]
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        p-6
        shadow-2xl
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              uppercase
              tracking-[0.25em]
              text-white/70
              font-semibold
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-3
              text-5xl
              font-bold
              text-white
            "
          >
            {value}
          </h2>

        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            text-white
            ${iconBg}
          `}
        >

          {icon}

        </div>

      </div>

      <p
        className="
          mt-4
          text-white/70
        "
      >
        {description}
      </p>

    </div>
  );
}

export default AttendancePage;