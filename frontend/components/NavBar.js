"use client";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Creative Platform", hasDropdown: true },
    { name: "Agents Platform", hasDropdown: true },
    { name: "Developers", hasDropdown: true },
    { name: "Resources", hasDropdown: true },
    { name: "Enterprise", hasDropdown: false },
    { name: "Pricing", hasDropdown: false },
  ];

  return (
    <nav className="w-full border-b border-gray-100 bg-white font-inter">
      {/* Wrapper */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-xl font-bold text-black">llElevenLabs</div>

        {/* Center Menu - Desktop */}
        <div className="hidden lg:flex space-x-5 text-sm font-bold">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-black transition-colors"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(index)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          ))}
        </div>

        {/* Right Auth Buttons (hidden on mobile) */}
        <div className="hidden sm:flex items-center space-x-4 text-sm font-medium">
          <button className="text-gray-700 hover:text-black transition-colors">
            Log in
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
            Sign up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-700 hover:text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-3 text-sm font-medium">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                className="flex items-center justify-between w-full text-gray-700 hover:text-black transition-colors"
                onClick={() =>
                  setOpenDropdown(openDropdown === index ? null : index)
                }
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </button>
              {/* Simple dropdown placeholder */}
              {openDropdown === index && item.hasDropdown && (
                <div className="ml-4 mt-1 text-gray-500 text-xs">
                  Dropdown content here...
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 flex flex-col space-y-2">
            <button className="text-gray-700 hover:text-black transition-colors">
              Log in
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
