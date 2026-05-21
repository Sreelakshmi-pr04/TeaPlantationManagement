import React, { useState } from "react";

import { deleteAttendance } from "./attendanceService";
import toast from "react-hot-toast";

import {
  MoreVertical,
  Clock3,
  CalendarDays,
  Leaf,
  BadgeCheck,
  UserRound,
  Pencil,
  Trash2,
  Eye
} from "lucide-react";

function AttendanceCard({
  attendance,
  refreshAttendance,
  setEditingAttendance,
  setShowForm
}) {

  const [showMenu, setShowMenu] =
    useState(false);

  // STATUS COLORS
  const statusClass =
    attendance.attendanceStatus
      ?.toLowerCase()
      .includes("present")

      ? "bg-emerald-500 text-white"

      : attendance.attendanceStatus
          ?.toLowerCase()
          .includes("absent")

      ? "bg-rose-500 text-white"

      : "bg-amber-500 text-white";

  // DELETE
  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Delete attendance record?"
      );

    if (!confirmDelete) return;

    try {

      await deleteAttendance(
        attendance._id
      );

      refreshAttendance();

    } catch (error) {

      toast.error(
        "Error deleting attendance"
      );
    }
  };

  // EDIT
  const handleEdit = () => {

    setEditingAttendance(
      attendance
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
        shadow-2xl
        shadow-black/20
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-emerald-900/30
      "
    >

      {/* TOP GREEN GLOW */}
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

      {/* MENU BUTTON */}
      <div className="absolute top-5 right-5">

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
            bg-white/10
            border
            border-white/20
            text-white
            hover:bg-white/20
            transition
          "
        >
          <MoreVertical size={20} />
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

      {/* MAIN CONTENT */}
      <div className="flex gap-5">

        {/* LEFT AVATAR */}
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
            shadow-lg
            shadow-emerald-900/20
          "
        >
          <UserRound size={36} />
        </div>

        {/* CENTER */}
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
            Attendance Record
          </p>

          <h2
            className="
              mt-1
              text-3xl
              font-bold
              text-slate-950
            "
          >
            {attendance.workerName ||
              "Unknown Worker"}
          </h2>

          <p
            className="
              mt-1
              text-emerald-50/80
              text-sm
            "
          >
            {attendance.task ||
              "Tea Plucking"} Worker
          </p>

          {/* INFO ROW */}
          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-3
            "
          >

            {/* DATE */}
            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white/10
                px-4
                py-2
                text-sm
                text-white
              "
            >
              <CalendarDays size={16} />

              {attendance.date ||
                "Date"}
            </div>

            {/* SECTION */}
            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-emerald-500/20
                px-4
                py-2
                text-sm
                text-emerald-100
              "
            >
              <Leaf size={16} />

              {attendance.assignedSection ||
                "Section"}
            </div>

            {/* PRODUCTIVITY */}
            <div
              className="
                rounded-full
                bg-white/10
                px-4
                py-2
                text-sm
                font-semibold
                text-white
              "
            >
              {attendance.quantityCollected || 0} kg
              Collected
            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM STATUS */}
      <div
        className="
          mt-6
          flex
          flex-wrap
          items-center
          gap-3
        "
      >

        {/* STATUS */}
        <div
          className={`
            flex
            items-center
            gap-2
            rounded-full
            px-4
            py-2
            text-sm
            font-semibold
            shadow-lg
            ${statusClass}
          `}
        >

          <BadgeCheck size={16} />

          {attendance.attendanceStatus ||
            "Status"}

        </div>

        {/* SHIFT */}
        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-white/10
            px-4
            py-2
            text-sm
            text-white
          "
        >
          <Clock3 size={16} />

          Full Day Shift
        </div>

        {/* TASK */}
        <div
          className="
            rounded-full
            bg-emerald-100
            px-4
            py-2
            text-sm
            font-semibold
            text-emerald-900
          "
        >
          {attendance.task ||
            "Tea Plucking"}
        </div>

      </div>

    </div>
  );
}

export default AttendanceCard;