import React, {
  useEffect,
  useState
} from "react";

import {
  fetchSections
} from "./sectionsService";

import SectionsCard from "./sectionsCard";

function SectionsList({
  refreshTrigger,
  refreshSections,
  setEditingSection,
  setShowForm
}) {

  const [sections, setSections] =
    useState([]);

  const loadSections = async () => {

    try {

      const data =
        await fetchSections();

      console.log(
        "Fetched sections:",
        data
      );

      if (Array.isArray(data)) {

        setSections(data);

      } else {

        setSections([]);
      }

    } catch (error) {

      console.error(
        "Error fetching sections:",
        error
      );

      setSections([]);
    }
  };

  useEffect(() => {

    loadSections();

  }, [refreshTrigger]);

  return (

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {sections.length === 0 ? (

        <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/10 backdrop-blur-xl">

          No sections added yet.

        </div>

      ) : (

        sections.map((section) => (

          <SectionsCard
            key={section._id}
            section={section}
            refreshSections={refreshSections}
            setEditingSection={
              setEditingSection
            }
            setShowForm={setShowForm}
          />

        ))
      )}

    </div>
  );
}

export default SectionsList;