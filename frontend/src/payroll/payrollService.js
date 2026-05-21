const API_URL =
  "http://localhost:5000/payroll";

// =========================
// Fetch payroll
// =========================
export const fetchPayroll =
  async () => {

    const res = await fetch(API_URL);

    return await res.json();
  };

// =========================
// Add payroll
// =========================
export const addPayroll =
  async (payrollData) => {

    const res = await fetch(
      API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(
          payrollData
        )
      }
    );

    return await res.json();
  };

// =========================
// Delete payroll
// =========================
export const deletePayroll =
  async (id) => {

    const res = await fetch(
      `${API_URL}/${id}`,
      {
        method: "DELETE"
      }
    );

    return await res.json();
  };

// =========================
// Update payroll
// =========================
export const updatePayroll =
  async (
    id,
    payrollData
  ) => {

    const res = await fetch(
      `${API_URL}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(
          payrollData
        )
      }
    );

    return await res.json();
  };