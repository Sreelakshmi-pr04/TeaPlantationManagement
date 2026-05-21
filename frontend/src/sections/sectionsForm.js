import React, {
  useEffect,
  useState
} from "react";

import {
  addSection,
  updateSection
} from "./sectionsService";

import { fetchWorkers } from "../workers/workersService";

import { X } from "lucide-react";
import toast from "react-hot-toast";

function SectionsForm({
  refreshSections,
  editingSection,
  onClose
}) {

  const [sectionName, setSectionName] =
    useState("");

  const [cropType, setCropType] =
    useState("");

  const [areaSize, setAreaSize] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [supervisor, setSupervisor] =
    useState("");

  const [workers, setWorkers] = useState([]);

  // Load workers for supervisor dropdown
  useEffect(() => {
    const loadWorkers = async () => {
      try {
        const workerData = await fetchWorkers();
        setWorkers(workerData || []);
      } catch (error) {
        console.error("Error loading workers:", error);
        setWorkers([]);
      }
    };

    loadWorkers();
  }, []);

  // Prefill form when editing
  useEffect(() => {

    if (editingSection) {

      setSectionName(
        editingSection.sectionName || ""
      );

      setCropType(
        editingSection.cropType || ""
      );

      setAreaSize(
        editingSection.areaSize || ""
      );

      setStatus(
        editingSection.status || ""
      );

      setSupervisor(
        editingSection.supervisor || ""
      );

    } else {

      setSectionName("");
      setCropType("");
      setAreaSize("");
      setStatus("");
      setSupervisor("");
    }

  }, [editingSection]);

  // Submit form
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !sectionName ||
      !cropType ||
      !areaSize ||
      !status ||
      !supervisor
    ) {

      toast.error("Please fill all fields");

      return;
    }

    try {

      const sectionData = {
        sectionName,
        cropType,
        areaSize,
        status,
        supervisor
      };

      // Update section
      if (editingSection) {

        await updateSection(
          editingSection._id,
          sectionData
        );

        toast.success(
          "Section updated successfully"
        );

      }

      // Add section
      else {

        await addSection(sectionData);

        toast.success(
          "Section added successfully"
        );
      }

      // Clear form
      setSectionName("");
      setCropType("");
      setAreaSize("");
      setStatus("");
      setSupervisor("");

      // Refresh list
      refreshSections();

    } catch (error) {

      toast.error("Error saving section");
    }
  };

  return (

    <div className="rounded-3xl border border-white/20 bg-green-50/90 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-slate-600 transition hover:bg-white/15"
        aria-label="Close form"
      >
        <X size={20} />
      </button>

      {/* Heading */}
      <h2 className="mb-6 text-3xl font-bold text-green-900">
        {editingSection
          ? "Edit Estate Section"
          : "Add Estate Section"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Section Name */}
        <div>

          <label className="block text-sm font-semibold text-green-900">
            Section Name
          </label>

          <input
            type="text"
            placeholder="Enter section name"
            value={sectionName}
            onChange={(e) =>
              setSectionName(e.target.value)
            }
            className="mt-2 w-full rounded-xl border border-green-200 bg-white/50 px-4 py-3 text-green-900 placeholder-green-600 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />

        </div>

        {/* Crop Type */}
        <div>

          <label className="block text-sm font-semibold text-green-900">
            Crop Type
          </label>

          <select
            value={cropType}
            onChange={(e) =>
              setCropType(e.target.value)
            }
            className="mt-2 w-full rounded-xl border border-green-200 bg-white/50 px-4 py-3 text-green-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          >
           

            <option value="Tea">
              Tea
            </option>

            <option value="Coffee">
              Coffee
            </option>

            <option value="Spices">
              Spices
            </option>

          </select>

        </div>

        {/* Area Size */}
        <div>

          <label className="block text-sm font-semibold text-green-900">
            Area Size
          </label>

          <input
            type="text"
            placeholder="Eg: 12 Acres"
            value={areaSize}
            onChange={(e) =>
              setAreaSize(e.target.value)
            }
            className="mt-2 w-full rounded-xl border border-green-200 bg-white/50 px-4 py-3 text-green-900 placeholder-green-600 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />

        </div>

        {/* Status */}
        <div>

          <label className="block text-sm font-semibold text-green-900">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="mt-2 w-full rounded-xl border border-green-200 bg-white/50 px-4 py-3 text-green-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          >
 
            <option value="Ready for Plucking">
              Ready for Plucking
            </option>

            <option value="Growing">
              Growing
            </option>

            <option value="Under Maintenance">
              Under Maintenance
            </option>

          </select>

        </div>

        {/* Supervisor */}
        <div>

          <label className="block text-sm font-semibold text-green-900">
            Supervisor
          </label>

          <select
            value={supervisor}
            onChange={(e) =>
              setSupervisor(e.target.value)
            }
            className="mt-2 w-full rounded-xl border border-green-200 bg-white/50 px-4 py-3 text-green-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          >
            
            {workers.filter(worker => worker.workerType === "Supervisor").length === 0 && (
              <option value="" disabled>
                No supervisors available
              </option>
            )}
            {workers.filter(worker => worker.workerType === "Supervisor").map((worker) => (
              <option
                key={worker._id || worker.id || worker.name}
                value={worker.name}
              >
                {worker.name}
              </option>
            ))}
          </select>

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-green-800 hover:shadow-xl"
        >
          {editingSection
            ? "Update Section"
            : "Add Section"}
        </button>

      </form>

    </div>
  );
}

export default SectionsForm;