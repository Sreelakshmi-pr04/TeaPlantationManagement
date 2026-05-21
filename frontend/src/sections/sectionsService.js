const API_URL = "http://localhost:5000/sections";

// =========================
// Fetch all sections
// =========================
export const fetchSections = async () => {

  const res = await fetch(API_URL);

  return await res.json();
};

// =========================
// Add section
// =========================
export const addSection = async (sectionData) => {

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sectionData)
  });

  return await res.json();
};

// =========================
// Delete section
// =========================
export const deleteSection = async (id) => {

  const res = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE"
    }
  );

  return await res.json();
};

// =========================
// Update section
// =========================
export const updateSection = async (
  id,
  sectionData
) => {

  const res = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sectionData)
    }
  );

  return await res.json();
};