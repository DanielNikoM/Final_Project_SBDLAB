import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

export function Navbar() {
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
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="hidden lg:flex items-center space-x-12">
            <Link to="/login" className="py-2 px-3 border rounded-md">
              Log in
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
                <a href="#home">Home</a>
              </li>
              <li className="py-4">
                <a href="#about">About</a>
              </li>
              <li className="py-4">
                <a href="#services">Services</a>
              </li>
              <li className="py-4">
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <div className="flex space-x-6">
              <Link to="/login" className="py-2 px-3 border rounded-md">
                Log in
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
