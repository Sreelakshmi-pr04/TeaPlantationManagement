const API_URL =
  "http://localhost:5000/attendance";

// =========================
// Fetch attendance
// =========================
export const fetchAttendance =
  async () => {

    const res = await fetch(API_URL);

    return await res.json();
  };

// =========================
// Add attendance
// =========================
export const addAttendance =
  async (attendanceData) => {

    const res = await fetch(
      API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(
          attendanceData
        )
      }
    );

    return await res.json();
  };

// =========================
// Delete attendance
// =========================
export const deleteAttendance =
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
// Update attendance
// =========================
export const updateAttendance =
  async (
    id,
    attendanceData
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
          attendanceData
        )
      }
    );

    return await res.json();
  };