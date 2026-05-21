import React, {
  useEffect,
  useState
} from "react";

import {
  addPayroll,
  updatePayroll
} from "./payrollService";

import {
  fetchWorkers
} from "../workers/workersService";

import {
  fetchAttendance
} from "../attendance/attendanceService";
import toast from "react-hot-toast";
import {
  X,
  Wallet,
  BadgeIndianRupee,
  CircleDollarSign,
  Clock
} from "lucide-react";

function PayrollForm({
  refreshPayroll,
  editingPayroll,
  onClose
}) {

  const [workerName, setWorkerName] =
    useState("");

  const [month, setMonth] =
    useState("");

  const [daysPresent, setDaysPresent] =
    useState(0);

  const [overtimeDays, setOvertimeDays] =
    useState(0);

  const [dailyWage, setDailyWage] =
    useState(0);

  const [bonus, setBonus] =
    useState(0);

  const [totalSalary, setTotalSalary] =
    useState(0);

  const [workers, setWorkers] =
    useState([]);

  const [
    attendanceData,
    setAttendanceData
  ] = useState([]);

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const [
            workerData,
            attendance
          ] = await Promise.all([
            fetchWorkers(),
            fetchAttendance()
          ]);

          setWorkers(
            workerData || []
          );

          setAttendanceData(
            attendance || []
          );

        } catch (error) {

          console.error(
            "Error loading payroll:",
            error
          );
        }
      };

    loadData();

  }, []);

  // =========================
  // PREFILL
  // =========================

  useEffect(() => {

    if (editingPayroll) {

      setWorkerName(
        editingPayroll.workerName || ""
      );

      setMonth(
        editingPayroll.month || ""
      );

      setDaysPresent(
        editingPayroll.daysPresent || 0
      );

      setOvertimeDays(
        editingPayroll.overtimeDays || 0
      );

      setDailyWage(
        editingPayroll.dailyWage || 0
      );

      setBonus(
        editingPayroll.bonus || 0
      );

      setTotalSalary(
        editingPayroll.totalSalary || 0
      );

    } else {

      setWorkerName("");
      setMonth("");
      setDaysPresent(0);
      setOvertimeDays(0);
      setDailyWage(0);
      setBonus(0);
      setTotalSalary(0);
    }

  }, [editingPayroll]);

  // =========================
  // AUTO CALCULATIONS
  // =========================

  useEffect(() => {

    if (!workerName) return;

    const selectedWorker =
      workers.find(
        (worker) =>
          worker.name ===
          workerName
      );

    if (selectedWorker) {

      setDailyWage(
        selectedWorker.wage || 0
      );
    }

    const workerAttendance =
      attendanceData.filter(
        (attendance) =>
          attendance.workerName ===
          workerName
      );

    const presentDays =
      workerAttendance.filter(
        (attendance) =>
          attendance.attendanceStatus ===
            "Present"
          ||
          attendance.attendanceStatus ===
            "Overtime"
      ).length;

    const overtime =
      workerAttendance.filter(
        (attendance) =>
          attendance.attendanceStatus ===
          "Overtime"
      ).length;

    setDaysPresent(
      presentDays
    );

    setOvertimeDays(
      overtime
    );

  }, [
    workerName,
    workers,
    attendanceData
  ]);

  // =========================
  // TOTAL SALARY
  // =========================

  useEffect(() => {

    const overtimeRate = 300;

    const total =
      (daysPresent * dailyWage)
      +
      (overtimeDays * overtimeRate)
      +
      Number(bonus);

    setTotalSalary(total);

  }, [
    daysPresent,
    overtimeDays,
    dailyWage,
    bonus
  ]);

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !workerName ||
        !month
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;
      }

      try {

        const payrollData = {
          workerName,
          month,
          daysPresent,
          overtimeDays,
          dailyWage,
          bonus,
          totalSalary
        };

        if (editingPayroll) {

          await updatePayroll(
            editingPayroll._id,
            payrollData
          );

          toast.success(
            "Payroll updated successfully"
          );

        } else {

          await addPayroll(
            payrollData
          );

          toast.success(
            "Payroll generated successfully"
          );
        }

        refreshPayroll();

      } catch (error) {

        toast.error(
          "Error saving payroll"
        );
      }
    };

  // =========================
  // INPUT STYLE
  // =========================

  const inputStyle = `
    mt-3
    w-full
    rounded-2xl
    border
    border-white/20
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
        bg-white/10
        backdrop-blur-2xl
        p-10
        shadow-2xl
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

            <Wallet size={36} />

          </div>

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
              Financial Processing
            </p>

            <h2
              className="
                mt-2
                text-5xl
                font-bold
                text-slate-950
              "
            >
              {editingPayroll
                ? "Edit Payroll"
                : "Generate Payroll"}
            </h2>

            <p
              className="
                mt-2
                text-emerald-50/80
              "
            >
              Manage salary calculations and workforce payouts
            </p>

          </div>

        </div>

        {/* CLOSE */}
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

      {/* SALARY PREVIEW */}
      <div
        className="
          mb-8
          rounded-[32px]
          border
          border-white/20
          bg-gradient-to-r
          from-emerald-700/70
          to-green-600/70
          p-8
          shadow-2xl
        "
      >

        <p
          className="
            text-sm
            uppercase
            tracking-[0.3em]
            text-emerald-100/80
          "
        >
          Net Salary
        </p>

        <h1
          className="
            mt-3
            text-6xl
            font-black
            text-white
          "
        >
          ₹{totalSalary}
        </h1>

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

          <label className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
            Worker
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

  <option
    value=""
    disabled
  >
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

        {/* MONTH */}
        <div>

          <label className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
            Payroll Month
          </label>

          <input
            type="text"
            placeholder="Eg: May 2026"
            value={month}
            onChange={(e) =>
              setMonth(
                e.target.value
              )
            }
            className={inputStyle}
          />

        </div>

        {/* PRESENT */}
        <MetricInput
          label="Days Present"
          value={daysPresent}
          icon={<BadgeIndianRupee size={18} />}
        />

        {/* OVERTIME */}
        <MetricInput
          label="Overtime Days"
          value={overtimeDays}
          icon={<CircleDollarSign size={18} />}
        />

        {/* DAILY WAGE */}
        <MetricInput
          label="Daily Wage"
          value={`₹${dailyWage}`}
          icon={<Wallet size={18} />}
        />

        {/* BONUS */}
        <div>

          <label className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
            Bonus Amount
          </label>

          <input
            type="number"
            value={bonus}
            onChange={(e) =>
              setBonus(
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
              transition-all
              duration-300
              hover:scale-[1.01]
            "
          >

            {editingPayroll
              ? "Update Payroll"
              : "Generate Payroll"}

          </button>

        </div>

      </form>

    </div>
  );
}

// =========================
// METRIC INPUT
// =========================

function MetricInput({
  label,
  value,
  icon
}) {

  return (

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
        {label}
      </label>

      <div
        className="
          mt-3
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/20
          bg-white/40
          px-5
          py-4
          text-green-950
          shadow-lg
          backdrop-blur-md
        "
      >

        <div className="text-emerald-700">
          {icon}
        </div>

        <span
          className="
            text-lg
            font-bold
          "
        >
          {value}
        </span>

      </div>

    </div>
  );
}

export default PayrollForm;