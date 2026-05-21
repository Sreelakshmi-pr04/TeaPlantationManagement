import React, {
  useEffect,
  useState
} from "react";

import {
  Users,
  Leaf,
  CalendarCheck,
  BarChart3
} from "lucide-react";

import {
  fetchDashboardData
} from "./dashboardService";

function DashboardAnalytics() {

  const [dashboardData, setDashboardData] =
    useState({
      workers: [],
      sections: [],
      attendance: [],
      payroll: []
    });

  // =========================
  // LOAD DASHBOARD DATA
  // =========================

  useEffect(() => {

    const loadDashboard = async () => {

      const data =
        await fetchDashboardData();

      setDashboardData(data);
    };

    loadDashboard();

  }, []);

  const {
    workers,
    sections,
    attendance,
    payroll
  } = dashboardData;

  // =========================
  // KPI DATA
  // =========================

  const totalWorkers =
    workers.length;

  const totalSections =
    sections.length;

  const totalPayroll =
    payroll.length;

  const totalProductivity =
    attendance.reduce(
      (total, item) =>
        total +
        Number(
          item.quantityCollected || 0
        ),
      0
    );

  // =========================
  // TOP WORKER
  // =========================

  const workerProductivity = {};

  attendance.forEach((item) => {

    if (
      !workerProductivity[
        item.workerName
      ]
    ) {

      workerProductivity[
        item.workerName
      ] = 0;
    }

    workerProductivity[
      item.workerName
    ] += Number(
      item.quantityCollected || 0
    );
  });

  let topWorker = "N/A";

  let highestProductivity = 0;

  Object.entries(
    workerProductivity
  ).forEach(([worker, quantity]) => {

    if (
      quantity >
      highestProductivity
    ) {

      highestProductivity =
        quantity;

      topWorker = worker;
    }
  });

  // =========================
  // PRODUCTIVE SECTION
  // =========================

  const sectionProductivity = {};

  attendance.forEach((item) => {

    if (
      !sectionProductivity[
        item.assignedSection
      ]
    ) {

      sectionProductivity[
        item.assignedSection
      ] = 0;
    }

    sectionProductivity[
      item.assignedSection
    ] += Number(
      item.quantityCollected || 0
    );
  });

  let topSection = "N/A";

  let topSectionValue = 0;

  Object.entries(
    sectionProductivity
  ).forEach(([section, quantity]) => {

    if (
      quantity >
      topSectionValue
    ) {

      topSectionValue =
        quantity;

      topSection = section;
    }
  });

  return (

    <div className="text-white">

      {/* Welcome Section */}
      <div className="text-center mb-8 sm:mb-14">

        <h2
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
            text-white
            mb-3
          "
        >
          Welcome, Admin 🌿
        </h2>

        <p
          className="
            text-lg
            sm:text-xl
            text-green-100
          "
        >
          Manage your plantation
          operations efficiently.
        </p>

      </div>

      {/* KPI Cards */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-4
          sm:gap-6
          md:gap-8
        "
      >

        {/* Workers */}
        <div className={`${cardStyle} flex items-center gap-6`}>

          <div className={iconCircle}>
            <Users
              size={38}
              className="text-green-900"
            />
          </div>

          <div>

            <h3 className={titleStyle}>
              Total Workers
            </h3>

            <h2 className={numberStyle}>
              {totalWorkers}
            </h2>

            <p className={subtitleStyle}>
              Active workers
            </p>

          </div>

        </div>

        {/* Sections */}
        <div className={`${cardStyle} flex items-center gap-6`}>

          <div className={iconCircle}>
            <Leaf
              size={38}
              className="text-green-900"
            />
          </div>

          <div>

            <h3 className={titleStyle}>
              Total Sections
            </h3>

            <h2 className={numberStyle}>
              {totalSections}
            </h2>

            <p className={subtitleStyle}>
              Estate sections
            </p>

          </div>

        </div>

        {/* Payroll */}
        <div className={`${cardStyle} flex items-center gap-6`}>

          <div className={iconCircle}>
            <CalendarCheck
              size={38}
              className="text-green-900"
            />
          </div>

          <div>

            <h3 className={titleStyle}>
              Payroll Records
            </h3>

            <h2 className={numberStyle}>
              {totalPayroll}
            </h2>

            <p className={subtitleStyle}>
              Salary entries
            </p>

          </div>

        </div>

        {/* Productivity */}
        <div className={`${cardStyle} flex items-center gap-6`}>

          <div className={iconCircle}>
            <BarChart3
              size={38}
              className="text-green-900"
            />
          </div>

          <div>

            <h3 className={titleStyle}>
              Total Productivity
            </h3>

            <h2 className={numberStyle}>
              {totalProductivity} kg
            </h2>

            <p className={subtitleStyle}>
              Leaves collected
            </p>

          </div>
        </div>

      </div>

      {/* Analytics Cards */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          sm:gap-6
          md:gap-8
          mt-6
          sm:mt-10
        "
      >

        {/* Top Worker */}
        <div className={cardStyle}>

          <h3 className={titleStyle}>
            Top Worker 🌟
          </h3>

          <h2 className={bigTextStyle}>
            {topWorker}
          </h2>

          <p className="text-green-100">
            {highestProductivity} kg
            collected
          </p>

        </div>

        {/* Top Section */}
        <div className={cardStyle}>

          <h3 className={titleStyle}>
            Most Productive Section 🌱
          </h3>

          <h2 className={bigTextStyle}>
            {topSection}
          </h2>

          <p className="text-green-100">
            {topSectionValue} kg
            collected
          </p>

        </div>

      </div>

    </div>
  );
}

// =========================
// STYLES
// =========================

const cardStyle = `
  bg-green-100/10
  backdrop-blur-md
  border
  border-white/20
  rounded-3xl
  p-4
  sm:p-6
  md:p-8
  shadow-xl
  hover:scale-105
  transition-all
  duration-300
`;

const iconCircle = `
  w-16
  h-16
  rounded-full
  bg-green-100/70
  flex
  items-center
  justify-center
  shadow-lg
`;

const titleStyle = `
  text-xl
  sm:text-2xl
  font-semibold
  text-green-100
  mb-4
`;

const numberStyle = `
  text-3xl
  sm:text-4xl
  md:text-5xl
  font-bold
  text-white
`;

const subtitleStyle = `
  text-base
  sm:text-lg
  text-green-100
  mt-3
`;

const bigTextStyle = `
  text-2xl
  sm:text-3xl
  md:text-4xl
  font-bold
  text-white
  mb-3
`;

export default DashboardAnalytics;