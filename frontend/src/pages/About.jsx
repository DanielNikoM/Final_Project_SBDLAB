import React from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

export function About() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
          About Us
        </h1>
        <p className="mt-10 text-lg text-center text-black max-w-4xl">
          SecondBrain is a task management application designed to streamline
          team collaboration and project organization. With SecondBrain, teams
          can efficiently create tasks, assign responsibilities, and track
          progress, all within one platform.
          <br />
          <br />
          Created by:
          <br/>
          Darmawan Hanif
          <br/>
          Daniel Niko
          <br/>
          Louis Benedict
          <br/>
        </p>

        <div className="flex justify-center my-10">
          <Link
            to="/register"
            href="#"
            className="bg-black text-white py-3 px-4 mx-3 rounded-md"
          >
            Start for free
          </Link>
        </div>
      </div>
    </div>
  );
}
