import React, {
  useEffect,
  useState
} from "react";

import {
  fetchAttendance
} from "./attendanceService";

import AttendanceCard from "./attendanceCard";

import {
  ClipboardList,
  Activity
} from "lucide-react";

function AttendanceList({
  refreshTrigger,
  refreshAttendance,
  setEditingAttendance,
  setShowForm
}) {

  const [
    attendanceList,
    setAttendanceList
  ] = useState([]);

  // =========================
  // LOAD ATTENDANCE
  // =========================

  const loadAttendance =
    async () => {

      try {

        const data =
          await fetchAttendance();

        console.log(
          "Fetched attendance:",
          data
        );

        if (
          Array.isArray(data)
        ) {

          setAttendanceList(data);

        } else {

          setAttendanceList([]);
        }

      } catch (error) {

        console.error(
          "Error fetching attendance:",
          error
        );

        setAttendanceList([]);
      }
    };

  useEffect(() => {

    loadAttendance();

  }, [refreshTrigger]);

  return (

    <div>

      {/* ========================= */}
      {/* SECTION HEADER */}
      {/* ========================= */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* LEFT */}
        <div
          className="
            flex
            items-center
            gap-5
          "
        >

          {/* ICON */}
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              text-emerald-100
              shadow-xl
            "
          >

            <ClipboardList
              size={30}
            />

          </div>

          {/* TEXT */}
          <div >
 
  <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold">
    Workforce Records
  </p>

  
  <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 antialiased">
    Attendance Logs
  </h2>


  <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-2xl">
    Monitor workforce activity and plantation productivity with real-time data synchronization.
  </p>
</div>

        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          {/* TOTAL RECORDS */}
          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/20
              bg-white/10
              backdrop-blur-xl
              px-6
              py-4
              shadow-xl
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/20
                text-emerald-100
              "
            >

              <Activity
                size={22}
              />

            </div>

            <div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-emerald-100/70
                  font-semibold
                "
              >
                Total Records
              </p>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-slate-950
                "
              >
                {
                  attendanceList.length
                }
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* GRID */}
      {/* ========================= */}

      {attendanceList.length === 0 ? (

        <div
          className="
            rounded-[36px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            px-10
            py-20
            text-center
            shadow-2xl
            shadow-black/20
          "
        >

          {/* ICON */}
          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-emerald-500/15
              text-emerald-100
              shadow-xl
            "
          >

            <ClipboardList
              size={42}
            />

          </div>

          {/* TEXT */}
          <h2
            className="
              mt-8
              text-4xl
              font-bold
              text-white
            "
          >
            No Attendance Records
          </h2>

          <p
            className="
              mt-4
              text-lg
              text-emerald-50/70
            "
          >
            Attendance logs will appear here once workers are tracked.
          </p>

        </div>

      ) : (

        <div
          className="
            grid
            gap-7
            sm:grid-cols-1
            lg:grid-cols-2
            2xl:grid-cols-3
          "
        >

          {attendanceList.map(
            (attendance) => (

              <AttendanceCard
                key={
                  attendance._id
                }
                attendance={
                  attendance
                }
                refreshAttendance={
                  refreshAttendance
                }
                setEditingAttendance={
                  setEditingAttendance
                }
                setShowForm={
                  setShowForm
                }
              />

            )
          )}

        </div>

      )}

    </div>
  );
}

export default AttendanceList;