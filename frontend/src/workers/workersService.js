const API_URL = "http://localhost:5000/workers";

// Get all workers
export const fetchWorkers = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

// Add new worker
export const addWorker = async (workerData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(workerData)
  });

  return await res.json();
};

// Delete worker
export const deleteWorker = async (id) => {
  const res = await fetch(
    `http://localhost:5000/workers/${id}`,
    {
      method: "DELETE"
    }
  );

  return await res.json();
};

// Update worker
export const updateWorker = async (id, workerData) => {
  const res = await fetch(
    `http://localhost:5000/workers/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workerData)
    }
  );

  return await res.json();
};