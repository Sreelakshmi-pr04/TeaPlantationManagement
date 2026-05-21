import React, {
  useEffect,
  useState
} from "react";

import {
  fetchPayroll
} from "./payrollService";

import PayrollCard from "./payrollCard";

import {
  WalletCards,
  CircleDollarSign,
  ReceiptIndianRupee
} from "lucide-react";

function PayrollList({
  refreshTrigger,
  refreshPayroll,
  setEditingPayroll,
  setShowForm
}) {

  const [
    payrollList,
    setPayrollList
  ] = useState([]);

  // =========================
  // LOAD PAYROLL
  // =========================

  const loadPayroll =
    async () => {

      try {

        const data =
          await fetchPayroll();

        console.log(
          "Fetched payroll:",
          data
        );

        if (
          Array.isArray(data)
        ) {

          setPayrollList(data);

        } else {

          setPayrollList([]);
        }

      } catch (error) {

        console.error(
          "Error fetching payroll:",
          error
        );

        setPayrollList([]);
      }
    };

  useEffect(() => {

    loadPayroll();

  }, [refreshTrigger]);

  // =========================
  // CALCULATIONS
  // =========================

  const totalSalary =
    payrollList.reduce(
      (total, item) =>
        total +
        Number(
          item.totalSalary || 0
        ),
      0
    );

  const totalBonus =
    payrollList.reduce(
      (total, item) =>
        total +
        Number(
          item.bonus || 0
        ),
      0
    );

  return (

    <div>

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* LEFT */}
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
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-white/20
              bg-white/10
              backdrop-blur-xl
              text-emerald-100
              shadow-xl
            "
          >

            <WalletCards
              size={30}
            />

          </div>

          {/* TEXT */}
          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-emerald-100/80
                font-semibold
              "
            >
              Salary Operations
            </p>

            <h2
              className="
                mt-1
                text-4xl
                font-bold
                text-slate-950
              "
            >
              Payroll Records
            </h2>

            <p
              className="
                mt-1
                text-emerald-50/80
              "
            >
              Manage workforce salary processing and payouts
            </p>

          </div>

        </div>

        {/* RIGHT STATS */}
        <div
          className="
            flex
            flex-wrap
            gap-4
          "
        >

          {/* RECORD COUNT */}
          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/20
              bg-white/10
              backdrop-blur-xl
              px-5
              py-4
              shadow-xl
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/20
                text-emerald-100
              "
            >

              <CircleDollarSign
                size={22}
              />

            </div>

            <div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-emerald-100/70
                  font-semibold
                "
              >
                Records
              </p>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-slate-950
                "
              >
                {payrollList.length}
              </h3>

            </div>

          </div>

          {/* TOTAL PAYOUT */}
          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/20
              bg-white/10
              backdrop-blur-xl
              px-5
              py-4
              shadow-xl
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-amber-500/20
                text-amber-100
              "
            >

              <ReceiptIndianRupee
                size={22}
              />

            </div>

            <div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-amber-100/70
                  font-semibold
                "
              >
                Total Payout
              </p>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-slate-950
                "
              >
                ₹{totalSalary}
              </h3>

            </div>

          </div>

          {/* BONUS */}
          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/20
              bg-white/10
              backdrop-blur-xl
              px-5
              py-4
              shadow-xl
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-violet-500/20
                text-violet-100
              "
            >

              <WalletCards
                size={22}
              />

            </div>

            <div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-violet-100/70
                  font-semibold
                "
              >
                Bonus
              </p>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-slate-950
                "
              >
                ₹{totalBonus}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* EMPTY STATE */}
      {/* ========================= */}

      {payrollList.length === 0 ? (

        <div
          className="
            rounded-[36px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            px-10
            py-20
            text-center
            shadow-2xl
            shadow-black/20
          "
        >

          {/* ICON */}
          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-emerald-500/15
              text-emerald-100
              shadow-xl
            "
          >

            <WalletCards
              size={42}
            />

          </div>

          {/* TEXT */}
          <h2
            className="
              mt-8
              text-4xl
              font-bold
              text-slate-950
            "
          >
            No Payroll Records
          </h2>

          <p
            className="
              mt-4
              text-lg
              text-emerald-50/70
            "
          >
            Payroll salary records will appear here once generated.
          </p>

        </div>

      ) : (

        /* ========================= */
        /* GRID */
        /* ========================= */

        <div
          className="
            grid
            gap-7
            sm:grid-cols-1
            lg:grid-cols-2
            2xl:grid-cols-3
          "
        >

          {payrollList.map(
            (payroll) => (

              <PayrollCard
                key={
                  payroll._id
                }
                payroll={payroll}
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

            )
          )}

        </div>

      )}

    </div>
  );
}

export default PayrollList;