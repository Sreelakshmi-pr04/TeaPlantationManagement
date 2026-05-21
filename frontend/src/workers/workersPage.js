import React, { useState } from "react";

import {
  Home,
  Plus,
  X,
  Sprout
} from "lucide-react";

import WorkersForm from "./workersForm";
import WorkersList from "./workersList";

import teaBg from "../assets/tea-bg.jpg";

function WorkersPage() {

  const [
    refreshTrigger,
    setRefreshTrigger
  ] = useState(0);

  const [
    showForm,
    setShowForm
  ] = useState(false);

  const [
    editingWorker,
    setEditingWorker
  ] = useState(null);

  // =========================
  // REFRESH WORKERS
  // =========================

  const refreshWorkers = () => {

    setRefreshTrigger(
      refreshTrigger + 1
    );

    setShowForm(false);

    setEditingWorker(null);
  };

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
          `url(${teaBg})`
      }}
    >

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/20
          backdrop-blur-[2px]
        "
      />

      {/* Main Content */}
      <div
        className="
          relative
          z-10
          px-6
          py-10
        "
      >

        {/* Header */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center
            gap-4
            mb-8
          "
        >

          {/* Left Side */}
          <div>

            {/* Title */}
            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-green-100/70
                  flex
                  items-center
                  justify-center
                  shadow-xl
                "
              >

                <Sprout
                  size={40}
                  className="
                    text-green-900
                  "
                />

              </div>

              <div>

                <h1
                  className="
                    text-5xl
                    font-bold
                    text-green-950
                  "
                >
                  Workers Management
                </h1>

                <p
                  className="
                    text-green-900/80
                    mt-2
                    text-lg
                  "
                >
                  Manage your plantation
                  workforce efficiently
                </p>

              </div>

            </div>

          </div>

          {/* Right Buttons */}
          <div
            className="
              flex
              gap-4
              flex-wrap
            "
          >

            {/* Dashboard Button */}
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

            {/* Add Worker */}
            <button
              onClick={() => {

                setEditingWorker(null);

                setShowForm(true);
              }}
              className="
                flex
                items-center
                gap-3
                px-8
                py-4
                rounded-2xl
                bg-green-700
                shadow-xl
                hover:scale-105
                hover:bg-green-800
                transition-all
                duration-300
                text-white
                font-semibold
                text-lg
              "
            >

              <Plus size={22} />

              Add Worker

            </button>

          </div>
        </div>

          {/* Decorative Divider */}
          <div
            className="
              flex
              justify-center
              items-center
              gap-4
              mb-12
            "
          >

            <div
              className="
                w-40
                h-[2px]
                bg-green-700/40
              "
            />

            <Sprout
              size={24}
              className="
                text-green-700
              "
            />

            <div
              className="
                w-40
                h-[2px]
                bg-green-700/40
              "
            />

          </div>

          {/* Workers List */}
          <WorkersList
            refreshTrigger={refreshTrigger}
            refreshWorkers={refreshWorkers}
            setEditingWorker={setEditingWorker}
            setShowForm={setShowForm}
          />

      </div>

      {/* MODAL */}
      {showForm && (

  <div
    className="
      fixed
      inset-0
      bg-black/50
      backdrop-blur-md
      flex
      justify-center
      items-center
      z-50
      px-4
      py-8
      overflow-y-auto
    "
  >

    {/* Modal Wrapper */}
    <div
      className="
        relative
        w-full
        max-w-3xl
      "
    >

      {/* Form */}
      <WorkersForm
        refreshWorkers={refreshWorkers}
        editingWorker={editingWorker}
        onClose={() => {
          setShowForm(false);
          setEditingWorker(null);
        }}
      />

    </div>

  </div>

)}

    </div>
  );
}

export default WorkersPage;