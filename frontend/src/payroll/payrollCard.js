import React, {
  useState
} from "react";

import {
  deletePayroll
} from "./payrollService";
import toast from "react-hot-toast";

import {
  MoreVertical,
  Wallet,
  Calendar,
  BadgeIndianRupee,
  CircleDollarSign,
  UserRound,
  Clock,
  Pencil,
  Trash2
} from "lucide-react";

function PayrollCard({
  payroll,
  refreshPayroll,
  setEditingPayroll,
  setShowForm
}) {

  const [showMenu, setShowMenu] =
    useState(false);

  // =========================
  // DELETE
  // =========================

  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Delete payroll record?"
      );

    if (!confirmDelete) return;

    try {

      await deletePayroll(
        payroll._id
      );

      refreshPayroll();

    } catch (error) {

      toast.error(
        "Error deleting payroll"
      );
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = () => {

    setEditingPayroll(
      payroll
    );

    setShowForm(true);

    setShowMenu(false);
  };

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        p-6
        shadow-2xl
        shadow-black/20
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-emerald-900/30
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

      {/* MENU */}
      <div className="absolute right-5 top-5">

        <button
          onClick={() =>
            setShowMenu(!showMenu)
          }
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/10
            text-white
            transition
            hover:bg-white/20
          "
        >

          <MoreVertical
            size={20}
          />

        </button>

        {/* DROPDOWN */}
      {showMenu && (

        <div
          className="
            absolute
            top-20
            right-5
            bg-white/90
            backdrop-blur-md
            rounded-2xl
            shadow-2xl
            border
            border-white/30
            overflow-hidden
            z-50
            w-44
          "
        >

          {/* Edit */}
          <button
            onClick={handleEdit}
            className="
              w-full
              flex
              items-center
              gap-3
              px-5
              py-4
              hover:bg-green-100
              transition-all
              duration-300
              text-green-950
              font-medium
            "
          >

            <Pencil size={18} />

            Edit

          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="
              w-full
              flex
              items-center
              gap-3
              px-5
              py-4
              hover:bg-red-100
              transition-all
              duration-300
              text-red-600
              font-medium
            "
          >

            <Trash2 size={18} />

            Delete

          </button>

          

        </div>

      )}

      </div>

      {/* TOP SECTION */}
      <div className="flex gap-5">

        {/* AVATAR */}
        <div
          className="
            flex
            h-20
            w-20
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-emerald-100
            text-emerald-900
            shadow-xl
          "
        >

          <UserRound
            size={36}
          />

        </div>

        {/* CONTENT */}
        <div className="flex-1">

          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-emerald-100/80
              font-semibold
            "
          >
            Payroll Record
          </p>

          <h2
            className="
              mt-1
              text-3xl
              font-bold
              text-slate-950
            "
          >
            {payroll.workerName}
          </h2>

          <div
            className="
              mt-3
              flex
              items-center
              gap-2
              rounded-full
              bg-emerald-500
              px-4
              py-2
              w-fit
              text-sm
              font-semibold
              text-white
              shadow-lg
            "
          >

            <CircleDollarSign
              size={16}
            />

            Paid

          </div>

        </div>

      </div>

      {/* SALARY */}
      <div className="mt-7">

        <p
          className="
            text-sm
            uppercase
            tracking-[0.25em]
            text-emerald-100/70
          "
        >
          Net Salary
        </p>

        <h1
          className="
            mt-2
            text-6xl
            font-black
            text-white
          "
        >
          ₹{payroll.totalSalary}
        </h1>

      </div>

      {/* MONTH */}
      <div
        className="
          mt-5
          flex
          items-center
          gap-2
          text-emerald-50/80
        "
      >

        <Calendar size={18} />

        {payroll.month}

      </div>

      {/* METRICS */}
      <div
        className="
          mt-7
          grid
          grid-cols-2
          gap-4
        "
      >

        {/* DAYS */}
        <MetricCard
          icon={<Wallet size={18} />}
          label="Days Present"
          value={payroll.daysPresent}
        />

        {/* DAILY WAGE */}
        <MetricCard
          icon={
            <BadgeIndianRupee
              size={18}
            />
          }
          label="Daily Wage"
          value={`₹${payroll.dailyWage}`}
        />

        {/* OVERTIME */}
        <MetricCard
          icon={<Clock size={18} />}
          label="Overtime"
          value={payroll.overtimeDays}
        />

        {/* BONUS */}
        <MetricCard
          icon={
            <CircleDollarSign
              size={18}
            />
          }
          label="Bonus"
          value={`₹${payroll.bonus}`}
        />

      </div>

    </div>
  );
}

// =========================
// METRIC CARD
// =========================

function MetricCard({
  icon,
  label,
  value
}) {

  return (

    <div
      className="
        rounded-2xl
        bg-white/10
        border
        border-white/10
        p-4
        backdrop-blur-xl
      "
    >

      <div
        className="
          flex
          items-center
          gap-2
          text-emerald-100
        "
      >

        {icon}

        <p
          className="
            text-xs
            uppercase
            tracking-[0.2em]
          "
        >
          {label}
        </p>

      </div>

      <h3
        className="
          mt-3
          text-2xl
          font-bold
          text-slate-950
        "
      >
        {value}
      </h3>

    </div>
  );
}

export default PayrollCard;