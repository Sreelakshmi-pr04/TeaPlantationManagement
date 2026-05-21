import React, {
  useEffect,
  useState
} from "react";

import {
  fetchWorkers
} from "./workersService";

import WorkersCard
  from "./workersCard";

function WorkersList({
  refreshTrigger,
  refreshWorkers,
  setEditingWorker,
  setShowForm
}) {

  const [workers, setWorkers] =
    useState([]);

  // =========================
  // LOAD WORKERS
  // =========================

  const loadWorkers = async () => {

    try {

      const data =
        await fetchWorkers();

      console.log(
        "Fetched workers:",
        data
      );

      if (Array.isArray(data)) {

        setWorkers(data);

      } else {

        setWorkers([]);
      }

    } catch (error) {

      console.error(
        "Error fetching workers:",
        error
      );

      setWorkers([]);
    }
  };

  useEffect(() => {

    loadWorkers();

  }, [refreshTrigger]);

  return (

    <div>

      {/* Section Heading */}
      <div className="mb-10">

        <h2
          className="
            text-4xl
            font-bold
            text-green-950
            mb-3
          "
        >
          Plantation Workforce 🌿
        </h2>

        <p
          className="
            text-green-900/80
            text-lg
          "
        >
          View and manage all
          plantation workers
        </p>

      </div>

      {/* Empty State */}
      {
        workers.length === 0 ? (

          <div
            className="
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              rounded-3xl
              p-10
              text-center
              shadow-xl
            "
          >

            <p
              className="
                text-white
                text-xl
              "
            >
              No workers added yet.
            </p>

          </div>

        ) : (

          /* Workers Grid */
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >

            {
              workers.map((worker) => (

                <WorkersCard
                  key={worker._id}
                  worker={worker}
                  refreshWorkers={refreshWorkers}
                  setEditingWorker={setEditingWorker}
                  setShowForm={setShowForm}
                />

              ))
            }

          </div>

        )
      }

    </div>
  );
}

export default WorkersList;