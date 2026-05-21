import React, {
  useState,
  useEffect
} from "react";

import {
  Home,
  Plus,
  Wallet,
  BadgeIndianRupee,
  CircleDollarSign,
  Users
} from "lucide-react";

import PayrollForm from "./payrollForm";
import PayrollList from "./payrollList";

import {
  fetchPayroll
} from "./payrollService";

import teaBg from "../assets/tea-bg.jpg";

function PayrollPage() {

  const [
    refreshTrigger,
    setRefreshTrigger
  ] = useState(0);

  const [
    showForm,
    setShowForm
  ] = useState(false);

  const [
    editingPayroll,
    setEditingPayroll
  ] = useState(null);

  // =========================
  // PAYROLL DATA
  // =========================

  const [
    payrollData,
    setPayrollData
  ] = useState([]);

  // =========================
  // LOAD PAYROLL
  // =========================

  useEffect(() => {

    const loadPayroll =
      async () => {

        try {

          const data =
            await fetchPayroll();

          if (
            Array.isArray(data)
          ) {

            setPayrollData(
              data
            );
          }

        } catch (error) {

          console.error(
            "Error loading payroll:",
            error
          );
        }
      };

    loadPayroll();

  }, [refreshTrigger]);

  // =========================
  // REFRESH
  // =========================

  const refreshPayroll = () => {

    setRefreshTrigger(
      refreshTrigger + 1
    );

    setShowForm(false);

    setEditingPayroll(null);
  };

  // =========================
  // DYNAMIC ANALYTICS
  // =========================

  const totalPayroll =
    payrollData.reduce(
      (total, item) =>
        total +
        Number(
          item.totalSalary || 0
        ),
      0
    );

  const totalWorkersPaid =
    payrollData.length;

  const totalBonus =
    payrollData.reduce(
      (total, item) =>
        total +
        Number(
          item.bonus || 0
        ),
      0
    );

  const overtimeWorkers =
    payrollData.filter(
      (item) =>
        Number(
          item.overtimeDays || 0
        ) > 0
    ).length;

  return (

    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        relative
      "
      style={{
        backgroundImage:
          `url(${teaBg})`
      }}
    >

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/30
          backdrop-blur-[2px]
        "
      />

      {/* MAIN CONTENT */}
      <div
        className="
          relative
          z-10
          px-6
          py-10
        "
      >

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center
            gap-6
            mb-12
          "
        >

          {/* LEFT */}
          <div>

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
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-100
                  text-emerald-900
                  shadow-2xl
                "
              >

                <Wallet size={38} />

              </div>

              {/* TEXT */}
              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.35em]
                    text-emerald-100/80
                    font-semibold
                  "
                >
                  Financial Operations
                </p>

                <h1
                  className="
                    mt-2
                    text-5xl
                    font-bold
                    text-slate-950
                  "
                >
                  Payroll Management
                </h1>

                <p
                  className="
                    mt-3
                    text-lg
                    text-emerald-50/80
                  "
                >
                  Manage salary processing,
                  payouts and workforce payroll operations
                </p>

              </div>

            </div>

          </div>

          {/* BUTTONS */}
          <div
            className="
              flex
              flex-wrap
              gap-4
            "
          >

            {/* DASHBOARD */}
            <button
                                     onClick={() =>
                                       window.location.href =
                                         "/dashboard"
                                     }
                                     className="
                                       flex
                                       items-center
                                       gap-3
                                       px-8
                                       py-4
                                       rounded-2xl
                                       bg-white/30
                                       backdrop-blur-md
                                       border
                                       border-white/30
                                       shadow-lg
                                       hover:scale-105
                                       hover:bg-white/40
                                       transition-all
                                       duration-300
                                       text-green-950
                                       font-semibold
                                       text-lg
                                     "
                                   >
                       
                                     <Home size={22} />
                       
                                     Dashboard
                       
                                   </button>

            {/* GENERATE PAYROLL */}
            <button
              onClick={() => {

                setEditingPayroll(
                  null
                );

                setShowForm(true);
              }}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-emerald-700
                to-green-600
                px-7
                py-4
                text-lg
                font-semibold
                text-white
                shadow-2xl
                shadow-emerald-900/30
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-emerald-500/30
              "
            >

              <Plus size={22} />

              Generate Payroll

            </button>

          </div>

        </div>

        {/* ========================= */}
        {/* ANALYTICS */}
        {/* ========================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-12
          "
        >

          {/* TOTAL PAYROLL */}
          <AnalyticsCard
            title="Total Payroll"
            value={`₹${totalPayroll}`}
            description="Total salary processed"
            icon={
              <BadgeIndianRupee
                size={28}
              />
            }
            iconBg="bg-emerald-500/20"
          />

          {/* WORKERS PAID */}
          <AnalyticsCard
            title="Workers Paid"
            value={totalWorkersPaid}
            description="Employees with payroll"
            icon={<Users size={28} />}
            iconBg="bg-cyan-500/20"
          />

          {/* BONUS */}
          <AnalyticsCard
            title="Total Bonus"
            value={`₹${totalBonus}`}
            description="Bonus amount distributed"
            icon={
              <CircleDollarSign
                size={28}
              />
            }
            iconBg="bg-amber-500/20"
          />

          {/* OVERTIME */}
          <AnalyticsCard
            title="Overtime Workers"
            value={overtimeWorkers}
            description="Workers with overtime"
            icon={<Wallet size={28} />}
            iconBg="bg-violet-500/20"
          />

        </div>

        {/* ========================= */}
        {/* PAYROLL LIST */}
        {/* ========================= */}

        <PayrollList
          refreshTrigger={
            refreshTrigger
          }
          refreshPayroll={
            refreshPayroll
          }
          setEditingPayroll={
            setEditingPayroll
          }
          setShowForm={
            setShowForm
          }
        />

      </div>

      {/* ========================= */}
      {/* MODAL */}
      {/* ========================= */}

      {showForm && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-md
            px-4
            py-8
            overflow-y-auto
          "
        >

          <div
            className="
              relative
              w-full
              max-w-3xl
            "
          >

            <PayrollForm
              refreshPayroll={
                refreshPayroll
              }
              editingPayroll={
                editingPayroll
              }
              onClose={() => {

                setShowForm(false);

                setEditingPayroll(
                  null
                );
              }}
            />

          </div>

        </div>

      )}

    </div>
  );
}

// =========================
// ANALYTICS CARD
// =========================

function AnalyticsCard({
  title,
  value,
  description,
  icon,
  iconBg
}) {

  return (

    <div
      className="
        rounded-[30px]
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        p-6
        shadow-2xl
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              uppercase
              tracking-[0.25em]
              text-white/70
              font-semibold
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-3
              text-5xl
              font-bold
              text-white
            "
          >
            {value}
          </h2>

        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            text-white
            ${iconBg}
          `}
        >

          {icon}

        </div>

      </div>

      <p
        className="
          mt-4
          text-white/70
        "
      >
        {description}
      </p>

    </div>
  );
}

export default PayrollPage;