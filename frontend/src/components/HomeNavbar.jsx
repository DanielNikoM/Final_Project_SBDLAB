import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Link } from 'react-router-dom';

export function HomeNavbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b bg-gray-100">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <span className="text-xl font-bold tracking-tight">SecondBrain</span>
            <ul className="hidden lg:flex ml-8 space-x-12">
              <Link to="/home">
                Home
              </Link>
              <Link to="/teams">
                Teams
              </Link>
            </ul>
          </div>
          <div className="hidden lg:flex items-center space-x-12">
            <Link to="/profile" className="py-2 px-3 border rounded-md flex items-center space-x-2">
              <User /> {/* Add the User icon */}
              <span>Profile</span>
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-gray-400 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              <li className="py-4">
                <Link to="/home">Home</Link>
              </li>
              <li className="py-4">
                <Link to="/about">About</Link>
              </li>
              <li className="py-4">
                <Link to="/teams">Teams</Link>
              </li>
            </ul>
            <div className="flex space-x-6">
              <Link to="/profile" className="py-2 px-3 border rounded-md flex items-center space-x-2">
                <User /> {/* Add the User icon */}
                <span>Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
