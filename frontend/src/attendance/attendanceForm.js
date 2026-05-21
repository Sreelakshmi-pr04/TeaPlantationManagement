import React, {
  useEffect,
  useState
} from "react";

import {
  addAttendance,
  updateAttendance
} from "./attendanceService";

import {
  fetchWorkers
} from "../workers/workersService";

import {
  fetchSections
} from "../sections/sectionsService";

import {
  X,
  Clock3
} from "lucide-react";

import toast from "react-hot-toast";

function AttendanceForm({
  refreshAttendance,
  editingAttendance,
  onClose
}) {

  const [workerName, setWorkerName] =
    useState("");

  const [date, setDate] =
    useState("");

  const [
    attendanceStatus,
    setAttendanceStatus
  ] = useState("");

  const [
    assignedSection,
    setAssignedSection
  ] = useState("");

  const [task, setTask] =
    useState("");

  const [
    quantityCollected,
    setQuantityCollected
  ] = useState("");

  const [workers, setWorkers] =
    useState([]);

  const [sections, setSections] =
    useState([]);

  // LOAD DATA
  useEffect(() => {

    const loadOptions =
      async () => {

        try {

          const [
            workerData,
            sectionData
          ] = await Promise.all([
            fetchWorkers(),
            fetchSections()
          ]);

          setWorkers(
            workerData || []
          );

          setSections(
            sectionData || []
          );

        } catch (error) {

          console.error(
            "Error loading options:",
            error
          );
        }
      };

    loadOptions();

  }, []);

  // PREFILL
  useEffect(() => {

    if (editingAttendance) {

      setWorkerName(
        editingAttendance.workerName || ""
      );

      setDate(
        editingAttendance.date || ""
      );

      setAttendanceStatus(
        editingAttendance.attendanceStatus || ""
      );

      setAssignedSection(
        editingAttendance.assignedSection || ""
      );

      setTask(
        editingAttendance.task || ""
      );

      setQuantityCollected(
        editingAttendance.quantityCollected || ""
      );

    } else {

      setWorkerName("");
      setDate("");
      setAttendanceStatus("");
      setAssignedSection("");
      setTask("");
      setQuantityCollected("");
    }

  }, [editingAttendance]);

  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !workerName ||
        !date ||
        !attendanceStatus ||
        !assignedSection ||
        !task
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;
      }

      try {

        const attendanceData = {
          workerName,
          date,
          attendanceStatus,
          assignedSection,
          task,
          quantityCollected
        };

        // UPDATE
        if (editingAttendance) {

          await updateAttendance(
            editingAttendance._id,
            attendanceData
          );

          toast.success(
  "Attendance updated successfully"
);

        }

        // ADD
        else {

          await addAttendance(
            attendanceData
          );

          toast.success(
  "Attendance added successfully"
);
        }

        refreshAttendance();

      } catch (error) {

        toast.error(
          "Error saving attendance"
        );
      }
    };

  // INPUT STYLE
  const inputStyle = `
    mt-3
    w-full
    rounded-2xl
    border
    border-white/30
    bg-white/70
    px-5
    py-4
    text-green-950
    shadow-lg
    backdrop-blur-md
    outline-none
    transition-all
    duration-300
    focus:border-emerald-500
    focus:ring-4
    focus:ring-emerald-500/20
  `;

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-[40px]
        border
        border-white/20
        bg-white/15
        backdrop-blur-2xl
        p-10
        shadow-2xl
        shadow-black/20
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

      {/* HEADER */}
      <div
        className="
          mb-10
          flex
          items-start
          justify-between
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
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-emerald-100
              text-emerald-900
              shadow-xl
            "
          >

            <Clock3 size={36} />

          </div>

          {/* TEXT */}
          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-emerald-100
                font-semibold
              "
            >
              Workforce Tracking
            </p>

            <h2
              className="
                mt-2
                text-5xl
                font-bold
                text-white
              "
            >

              {editingAttendance
                ? "Edit Attendance"
                : "Add Attendance"}

            </h2>

            <p
              className="
                mt-2
                text-emerald-50/80
              "
            >
              Manage daily worker attendance records
            </p>

          </div>

        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:scale-110
            hover:rotate-90
            hover:bg-red-600
          "
        >

          <X size={22} />

        </button>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        {/* WORKER */}
        <div>

          <label
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
            "
          >
            Worker Name
          </label>

          <select
            value={workerName}
            onChange={(e) =>
              setWorkerName(
                e.target.value
              )
            }
            className={inputStyle}
          >

            <option value="">
              Select Worker
            </option>

            {workers.map((worker) => (

              <option
                key={worker._id}
                value={worker.name}
              >
                {worker.name}
              </option>

            ))}

          </select>

        </div>

        {/* DATE */}
        <div>

          <label
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
            "
          >
            Attendance Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className={inputStyle}
          />

        </div>

        {/* STATUS */}
        <div>

          <label
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
            "
          >
            Attendance Status
          </label>

          <select
            value={attendanceStatus}
            onChange={(e) =>
              setAttendanceStatus(
                e.target.value
              )
            }
            className={inputStyle}
          >

            <option value="">
              Select Status
            </option>

            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

            <option value="Half Day">
              Half Day
            </option>

            <option value="Sick Leave">
              Sick Leave
            </option>

            <option value="Overtime">
              Overtime
            </option>

          </select>

        </div>

        {/* SECTION */}
        <div>

          <label
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
            "
          >
            Assigned Section
          </label>

          <select
            value={assignedSection}
            onChange={(e) =>
              setAssignedSection(
                e.target.value
              )
            }
            className={inputStyle}
          >

            <option value="">
              Select Section
            </option>

            {sections.map((section) => (

              <option
                key={section._id}
                value={section.sectionName}
              >
                {section.sectionName}
              </option>

            ))}

          </select>

        </div>

        {/* TASK */}
        <div>

          <label
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
            "
          >
            Assigned Task
          </label>

          <select
            value={task}
            onChange={(e) =>
              setTask(
                e.target.value
              )
            }
            className={inputStyle}
          >

            <option value="">
              Select Task
            </option>

            <option value="Tea Plucking">
              Tea Plucking
            </option>

            <option value="Fertilizing">
              Fertilizing
            </option>

            <option value="Irrigation">
              Irrigation
            </option>

            <option value="Weeding">
              Weeding
            </option>

            <option value="Harvesting">
              Harvesting
            </option>

          </select>

        </div>

        {/* QUANTITY */}
        <div>

          <label
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
            "
          >
            Quantity Collected
          </label>

          <input
            type="number"
            placeholder="Enter quantity"
            value={quantityCollected}
            onChange={(e) =>
              setQuantityCollected(
                e.target.value
              )
            }
            className={inputStyle}
          />

        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2">

          <button
            type="submit"
            className="
              mt-4
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-emerald-700
              to-green-600
              px-8
              py-5
              text-lg
              font-bold
              text-white
              shadow-2xl
              shadow-emerald-900/30
              transition-all
              duration-300
              hover:scale-[1.01]
              hover:shadow-emerald-500/30
            "
          >

            {editingAttendance
              ? "Update Attendance"
              : "Add Attendance"}

          </button>

        </div>

      </form>

    </div>
  );
}

export default AttendanceForm;