import {
  fetchWorkers
} from "../workers/workersService";

import {
  fetchSections
} from "../sections/sectionsService";

import {
  fetchAttendance
} from "../attendance/attendanceService";

import {
  fetchPayroll
} from "../payroll/payrollService";

// =========================
// Fetch dashboard data
// =========================
export const fetchDashboardData =
  async () => {

    try {

      const [
        workers,
        sections,
        attendance,
        payroll
      ] = await Promise.all([

        fetchWorkers(),

        fetchSections(),

        fetchAttendance(),

        fetchPayroll()
      ]);

      return {
        workers,
        sections,
        attendance,
        payroll
      };

    } catch (error) {

      console.error(
        "Dashboard fetch error:",
        error
      );

      return {
        workers: [],
        sections: [],
        attendance: [],
        payroll: []
      };
    }
  };