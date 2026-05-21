import React, { useState } from "react";

import {
  Leaf,
  User,
  Mail,
  LockKeyhole
} from "lucide-react";

import teaBg from "./assets/tea-bg.avif";

function Signup() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async () => {

    const res = await fetch(
      "http://localhost:5000/signup",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );

    const data =
      await res.json();

    console.log(data);

    if (data.message) {

      alert(
        "Signup successful"
      );

      window.location.href =
        "/";

    } else {

      alert("Signup failed");
    }
  };

  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
        flex
        items-center
        justify-center
        px-6
      "
      style={{
        backgroundImage:
          `url(${teaBg})`
      }}
    >

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/45
          backdrop-blur-[2px]
        "
      />

      {/* SIGNUP CARD */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-xl
          overflow-hidden
          rounded-[32px]
          sm:rounded-[40px]
          border
          border-white/20
          bg-white/10
          p-6
          sm:p-8
          md:p-10
          shadow-2xl
          backdrop-blur-2xl
        "
      >

        {/* TOP GLOW */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-1
            bg-gradient-to-r
            from-emerald-400
            via-green-500
            to-emerald-400
          "
        />

        {/* HEADER */}
        <div className="text-center">

          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-emerald-100/90
              text-emerald-900
              shadow-2xl
            "
          >

            <Leaf size={42} />

          </div>

          <p
            className="
              mt-6
              text-xs
              font-semibold
              uppercase
              tracking-[0.35em]
              text-emerald-100
            "
          >
            Tea Plantation ERP
          </p>

          <h1
            className="
              mt-4
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              text-white
            "
          >
            Create Account
          </h1>

          <p
            className="
              mt-3
              text-base
              text-emerald-50/80
            "
          >
            Workforce & Estate Management System
          </p>

        </div>

        {/* FORM */}
        <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">

          {/* NAME */}
          <div>

            <label
              className="
                mb-2
                block
                text-xs
                sm:text-sm
                font-semibold
                uppercase
                tracking-[0.15em]
                text-white
              "
            >
              Full Name
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/20
                bg-white/70
                px-5
                py-4
                shadow-lg
                backdrop-blur-md
              "
            >

              <User
                size={20}
                className="
                  text-emerald-700
                "
              />

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-transparent
                  text-green-950
                  outline-none
                  placeholder:text-green-700/60
                "
              />

            </div>

          </div>

          {/* EMAIL */}
          <div>

            <label
              className="
                mb-2
                block
                text-xs
                sm:text-sm
                font-semibold
                uppercase
                tracking-[0.15em]
                text-white
              "
            >
              Email Address
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/20
                bg-white/70
                px-5
                py-4
                shadow-lg
                backdrop-blur-md
              "
            >

              <Mail
                size={20}
                className="
                  text-emerald-700
                "
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-transparent
                  text-green-950
                  outline-none
                  placeholder:text-green-700/60
                "
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div>

            <label
              className="
                mb-2
                block
                text-xs
                sm:text-sm
                font-semibold
                uppercase
                tracking-[0.15em]
                text-white
              "
            >
              Password
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/20
                bg-white/70
                px-5
                py-4
                shadow-lg
                backdrop-blur-md
              "
            >

              <LockKeyhole
                size={20}
                className="
                  text-emerald-700
                "
              />

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-transparent
                  text-green-950
                  outline-none
                  placeholder:text-green-700/60
                "
              />

            </div>

          </div>

          <button
            onClick={handleSignup}
            className="
              mt-6
              sm:mt-8
              w-full
              rounded-xl
              sm:rounded-2xl
              bg-gradient-to-r
              from-emerald-700
              to-green-500
              px-6
              py-3
              sm:py-4
              text-base
              sm:text-lg
              font-bold
              text-white
              shadow-2xl
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-emerald-500/30
            "
          >
            Create ERP Account
          </button>

          <p
            className="
              text-center
              text-xs
              sm:text-sm
              text-emerald-50/80
            "
          >
            Already have an account?{" "}

            <span
              onClick={() =>
                window.location.href =
                  "/"
              }
              className="
                cursor-pointer
                font-semibold
                text-emerald-200
                hover:text-white
              "
            >
              Login Here
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;