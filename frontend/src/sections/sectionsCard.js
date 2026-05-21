import React, { useState } from "react";

import { deleteSection } from "./sectionsService";

import {
  MoreVertical,
  Leaf,
  Trees,
  MapPinned,
  UserRound
} from "lucide-react";
import toast from "react-hot-toast";

function SectionsCard({
  section,
  refreshSections,
  setEditingSection,
  setShowForm
}) {

  const [showMenu, setShowMenu] =
    useState(false);

  // =========================
  // STATUS STYLING
  // =========================

  const statusClass =
    section.status
      ?.toLowerCase()
      .includes("active")

      ? `
        bg-emerald-500/20
        text-emerald-900
        border
        border-emerald-500/20
        shadow-lg
        shadow-emerald-500/10
      `

      : section.status
          ?.toLowerCase()
          .includes("inactive")

      ? `
        bg-slate-500/20
        text-slate-800
        border
        border-slate-500/20
      `

      : `
        bg-yellow-500/20
        text-yellow-900
        border
        border-yellow-500/20
      `;

  // =========================
  // DELETE SECTION
  // =========================

  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this section?"
      );

    if (!confirmDelete) return;

    try {

      await deleteSection(
        section._id
      );

      toast.success(
        "Section deleted successfully"
      );

      refreshSections();

    } catch (error) {

      toast.error(
        "Error deleting section"
      );
    }
  };

  // =========================
  // EDIT SECTION
  // =========================

  const handleEdit = () => {

    setEditingSection(
      section
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
        border-t-4
        border-emerald-500
        bg-gradient-to-br
        from-white/30
        to-emerald-50/10
        backdrop-blur-xl
        border
        border-white/30
        p-6
        shadow-2xl
        shadow-emerald-900/10
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-emerald-500/20
        hover:scale-[1.01]
      "
    >

      {/* ========================= */}
      {/* MENU BUTTON */}
      {/* ========================= */}

      <div
        className="
          absolute
          right-5
          top-5
        "
      >

        <button
          onClick={() =>
            setShowMenu(
              !showMenu
            )
          }
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white/50
            text-green-950
            shadow-lg
            backdrop-blur-md
            transition-all
            hover:bg-white
            hover:scale-110
          "
        >

          <MoreVertical
            size={20}
          />

        </button>

      </div>

      {/* ========================= */}
      {/* DROPDOWN MENU */}
      {/* ========================= */}

      {showMenu && (

        <div
          className="
            absolute
            right-5
            top-20
            z-20
            w-44
            rounded-3xl
            border
            border-white/20
            bg-white/80
            backdrop-blur-xl
            p-3
            shadow-2xl
          "
        >

          <button
            onClick={handleEdit}
            className="
              w-full
              rounded-2xl
              px-4
              py-3
              text-left
              font-semibold
              text-green-950
              transition-all
              hover:bg-green-100
            "
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="
              mt-2
              w-full
              rounded-2xl
              px-4
              py-3
              text-left
              font-semibold
              text-red-600
              transition-all
              hover:bg-red-100
            "
          >
            Delete
          </button>

          

        </div>
      )}

      {/* ========================= */}
      {/* TOP SECTION */}
      {/* ========================= */}

      <div
        className="
          flex
          items-start
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
            shadow-emerald-500/10
            flex-shrink-0
          "
        >

          <Leaf
            size={34}
          />

        </div>

        {/* CONTENT */}
        <div className="flex-1">

          {/* SMALL LABEL */}
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.28em]
              text-emerald-700/70
            "
          >
            Estate Section
          </p>

          {/* TITLE */}
          <div
            className="
              mt-1
              flex
              items-center
              gap-3
              flex-wrap
            "
          >

            <h3
              className="
                text-3xl
                font-bold
                text-green-950
              "
            >
              {section.sectionName ||
                "Unknown Section"}
            </h3>

            {/* STATUS */}
            <span
              className={`
                rounded-full
                px-4
                py-1.5
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                ${statusClass}
              `}
            >

              {section.status ||
                "Status"}

            </span>

          </div>

          {/* ========================= */}
          {/* METADATA GRID */}
          {/* ========================= */}

          <div
            className="
              mt-5
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
            "
          >

            {/* Crop Type */}
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                bg-white/40
                px-4
                py-3
                shadow-md
              "
            >

              <Trees
                size={20}
                className="
                  text-emerald-700
                "
              />

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-green-900/50
                    font-semibold
                  "
                >
                  Crop Type
                </p>

                <p
                  className="
                    font-bold
                    text-green-950
                  "
                >
                  {section.cropType ||
                    "N/A"}
                </p>

              </div>

            </div>

            {/* Area Size */}
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                bg-white/40
                px-4
                py-3
                shadow-md
              "
            >

              <MapPinned
                size={20}
                className="
                  text-emerald-700
                "
              />

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-green-900/50
                    font-semibold
                  "
                >
                  Area Size
                </p>

                <p
                  className="
                    font-bold
                    text-green-950
                  "
                >
                  {section.areaSize ||
                    "N/A"}
                </p>

              </div>

            </div>

            {/* Supervisor */}
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                bg-white/40
                px-4
                py-3
                shadow-md
              "
            >

              <UserRound
                size={20}
                className="
                  text-emerald-700
                "
              />

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-green-900/50
                    font-semibold
                  "
                >
                  Supervisor
                </p>

                <p
                  className="
                    font-bold
                    text-green-950
                  "
                >
                  {section.supervisor ||
                    "N/A"}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SectionsCard;