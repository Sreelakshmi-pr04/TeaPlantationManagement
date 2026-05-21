import React, {
  useEffect,
  useState
} from "react";

import {
  X,
  Leaf
} from "lucide-react";

import {
  addWorker,
  updateWorker
} from "./workersService";

import toast from "react-hot-toast";

function WorkersForm({
  refreshWorkers,
  editingWorker,
  onClose
}) {

  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("");

  const [wage, setWage] =
    useState("");

  const [
    workerType,
    setWorkerType
  ] = useState("");

  // =========================
  // PREFILL FORM
  // =========================

  useEffect(() => {

    if (editingWorker) {

      setName(
        editingWorker.name || ""
      );

      setRole(
        editingWorker.role || ""
      );

      setWage(
        editingWorker.wage || ""
      );

      setWorkerType(
        editingWorker.workerType || ""
      );

    } else {

      setName("");
      setRole("");
      setWage("");
      setWorkerType("");
    }

  }, [editingWorker]);

  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !name ||
      !role ||
      !wage ||
      !workerType
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {

      const workerData = {
        name,
        role,
        wage,
        workerType
      };

      // UPDATE
      if (editingWorker) {

        await updateWorker(
          editingWorker._id,
          workerData
        );

        toast.success(
          "Worker updated successfully"
        );

      }

      // ADD
      else {

        await addWorker(
          workerData
        );

        toast.success(
          "Worker added successfully"
        );
      }

      // RESET
      setName("");
      setRole("");
      setWage("");
      setWorkerType("");

      refreshWorkers();

    } catch (error) {

      toast.error(
        "Error saving worker"
      );
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="
        relative
        bg-white/80
        backdrop-blur-2xl
        rounded-[40px]
        border
        border-white/30
        p-10
        shadow-2xl
        shadow-emerald-900/20
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          justify-between
          items-start
          mb-10
        "
      >

        {/* LEFT SIDE */}
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
              w-20
              h-20
              rounded-full
              bg-green-100
              flex
              items-center
              justify-center
              shadow-lg
              flex-shrink-0
            "
          >

            <Leaf
              size={38}
              className="
                text-green-800
              "
            />

          </div>

          {/* TEXT */}
          <div>

            <h2
              className="
                text-5xl
                font-bold
                text-green-950
                tracking-tight
                mb-2
              "
            >

              {editingWorker
                ? "Edit Worker"
                : "Add New Worker"}

            </h2>

            <p
              className="
                text-green-900/70
                text-lg
              "
            >
              Manage plantation workforce efficiently
            </p>

          </div>

        </div>

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="
            w-14
            h-14
            rounded-full
            bg-red-500
            text-white
            flex
            items-center
            justify-center
            shadow-xl
            hover:bg-red-600
            hover:scale-110
            hover:rotate-90
            transition-all
            duration-300
          "
        >

          <X size={24} />

        </button>

      </div>

      {/* FORM FIELDS */}
      <div className="space-y-7">

        {/* Worker Name */}
        <div>

          <label
            className="
              block
              mb-3
              text-green-950
              font-semibold
              text-lg
            "
          >
            Worker Name
          </label>

          <input
            type="text"
            placeholder="Enter worker name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              w-full
              px-6
              py-4
              rounded-2xl
              bg-white/90
              border
              border-white/50
              shadow-lg
              outline-none
              text-green-950
              placeholder:text-green-900/40
              focus:ring-4
              focus:ring-green-300/40
              transition-all
            "
          />

        </div>

        {/* Role */}
        <div>

          <label
            className="
              block
              mb-3
              text-green-950
              font-semibold
              text-lg
            "
          >
            Role
          </label>

          <input
            type="text"
            placeholder="Enter role"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            className="
              w-full
              px-6
              py-4
              rounded-2xl
              bg-white/90
              border
              border-white/50
              shadow-lg
              outline-none
              text-green-950
              placeholder:text-green-900/40
              focus:ring-4
              focus:ring-green-300/40
              transition-all
            "
          />

        </div>

        {/* Wage */}
        <div>

          <label
            className="
              block
              mb-3
              text-green-950
              font-semibold
              text-lg
            "
          >
            Daily Wage
          </label>

          <input
            type="number"
            placeholder="Enter daily wage"
            value={wage}
            onChange={(e) =>
              setWage(
                e.target.value
              )
            }
            className="
              w-full
              px-6
              py-4
              rounded-2xl
              bg-white/90
              border
              border-white/50
              shadow-lg
              outline-none
              text-green-950
              placeholder:text-green-900/40
              focus:ring-4
              focus:ring-green-300/40
              transition-all
            "
          />

        </div>

        {/* Worker Type */}
        <div>

          <label
            className="
              block
              mb-3
              text-green-950
              font-semibold
              text-lg
            "
          >
            Worker Type
          </label>

          <select
            value={workerType}
            onChange={(e) =>
              setWorkerType(
                e.target.value
              )
            }
            className="
              w-full
              px-6
              py-4
              rounded-2xl
              bg-white/90
              border
              border-white/50
              shadow-lg
              outline-none
              text-green-950
              focus:ring-4
              focus:ring-green-300/40
              transition-all
            "
          >

           

            <option value="Supervisor">
              Supervisor
            </option>

            <option value="Field Worker">
              Field Worker
            </option>

            <option value="Manager">
              Manager
            </option>

          </select>

        </div>

      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="
          w-full
          mt-10
          py-5
          rounded-full
          bg-gradient-to-r
          from-green-800
          via-green-700
          to-green-500
          text-white
          text-xl
          font-bold
          shadow-2xl
          hover:scale-[1.02]
          hover:shadow-green-500/40
          transition-all
          duration-300
        "
      >

        {editingWorker
          ? "Update Worker"
          : "Add Worker"}

      </button>

    </form>
  );
}

export default WorkersForm;