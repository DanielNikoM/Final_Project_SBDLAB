import React from 'react';
import { Navbar}  from '../components/Navbar';
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div>
          <Navbar />
          <div className="flex flex-col items-center mt-6 lg:mt-28  ">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center font-bold tracking-wide">
              Plan and organize together
            </h1>
            <p className="mt-10 text-lg text-center text-black max-w-4xl">
              Start your journey with SecondBrain by creating a team and inviting your team members.
            </p>
            <div className="flex justify-center my-10">
              <Link
                to="/create_team"
                href="#"
                className="bg-black text-white py-3 px-4 mx-3 rounded-md"
              >
                Create a team
              </Link>
            </div>
          </div>
        </div>
      );
};

