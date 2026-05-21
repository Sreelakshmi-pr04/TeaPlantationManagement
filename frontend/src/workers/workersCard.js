import React, { useState } from "react";

import {
  User,
  MoreVertical,
  Pencil,
  Trash2,
  Eye
} from "lucide-react";

import {
  deleteWorker
} from "./workersService";

import toast from "react-hot-toast";

function WorkersCard({
  worker,
  refreshWorkers,
  setEditingWorker,
  setShowForm
}) {

  const [
    showMenu,
    setShowMenu
  ] = useState(false);

  // =========================
  // DELETE WORKER
  // =========================

  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this worker?"
      );

    if (!confirmDelete) return;

    try {

      await deleteWorker(
        worker._id
      );

      toast.success(
        "Worker deleted successfully"
      );

      refreshWorkers();

    } catch (error) {

      toast.error(
        "Error deleting worker"
      );
    }
  };

  // =========================
  // EDIT WORKER
  // =========================

  const handleEdit = () => {

    setEditingWorker(worker);

    setShowForm(true);

    setShowMenu(false);
  };

  return (

    <div
      className="
        relative
        bg-white/10
        backdrop-blur-2xl
        border
        border-white/20
        rounded-[35px]
        p-7
        shadow-2xl
        hover:scale-[1.03]
        hover:-translate-y-1
        transition-all
        duration-300
        overflow-hidden
      "
    >

      {/* Top Glow */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-1
          bg-gradient-to-r
          from-green-400
          to-green-700
        "
      />

      {/* Menu Button */}
      <button
        onClick={() =>
          setShowMenu(!showMenu)
        }
        className="
          absolute
          top-5
          right-5
          w-11
          h-11
          rounded-full
          bg-white/20
          flex
          items-center
          justify-center
          hover:bg-white/30
          transition-all
          duration-300
        "
      >

        <MoreVertical
          size={20}
          className="
            text-green-950
          "
        />

      </button>

      {/* Dropdown Menu */}
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

      {/* Worker Content */}
      <div
        className="
          flex
          items-start
          gap-5
        "
      >

        {/* Avatar */}
        <div
          className="
            min-w-[90px]
            h-[90px]
            rounded-full
            bg-green-100/70
            flex
            items-center
            justify-center
            shadow-xl
          "
        >

          <User
            size={40}
            className="
              text-green-900
            "
          />

        </div>

        {/* Worker Info */}
        <div className="flex-1">

          {/* Name */}
          <h2
            className="
              text-3xl
              font-bold
              text-green-950
              mb-2
            "
          >
            {worker.name}
          </h2>

          {/* Role */}
          <p
            className="
              text-green-900/80
              text-lg
              mb-5
            "
          >
            {worker.role}
          </p>

          {/* Badges */}
          <div
            className="
              flex
              flex-wrap
              gap-3
              mb-5
            "
          >

            {/* Wage Badge */}
            <div
              className="
                px-4
                py-2
                rounded-full
                bg-green-200/60
                text-green-950
                font-semibold
                shadow-md
                text-sm
              "
            >
              ₹{worker.wage}/day
            </div>

            {/* Worker Type */}
            <div
              className={`
                px-4
                py-2
                rounded-full
                font-semibold
                shadow-md
                text-sm

                ${
                  worker.workerType ===
                  "Supervisor"

                    ? `
                      bg-green-800
                      text-white
                    `

                    : `
                      bg-green-100
                      text-green-950
                    `
                }
              `}
            >

              {worker.workerType}

            </div>

            {/* Status */}
            <div
              className="
                px-4
                py-2
                rounded-full
                bg-emerald-100
                text-emerald-800
                font-semibold
                shadow-md
                text-sm
                flex
                items-center
                gap-2
              "
            >

              <div
                className="
                  w-2.5
                  h-2.5
                  rounded-full
                  bg-emerald-500
                  animate-pulse
                "
              />

              Active

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default WorkersCard;