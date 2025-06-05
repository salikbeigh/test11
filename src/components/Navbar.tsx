import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";
import {
  Bus,
  Home,
  Menu,
  X,
  Bell,
  Settings,
  MapPin,
  UserCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isDriverPortal = location.pathname === "/driver-portal";

  const renderAuthButton = () => {
    if (isDriverPortal) return null;

    return isSignedIn ? (
      <UserButton
        afterSignOutUrl="/"
        appearance={{ elements: { avatarBox: "w-8 h-8" } }}
      />
    ) : (
      <SignInButton mode="modal">
        <button className="text-gray-500 hover:text-indigo-600 transition-colors">
          <UserCircle className="h-5 w-5" />
        </button>
      </SignInButton>
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-white shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Bus className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  SpeckT
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {[
                  {
                    to: "/",
                    label: "Home",
                    icon: <Home className="h-4 w-4 mr-1" />,
                  },
                  {
                    to: "/dashboard",
                    label: "Dashboard",
                    icon: <MapPin className="h-4 w-4 mr-1" />,
                  },
                  {
                    to: "/live-tracking",
                    label: "Live Tracking",
                    icon: <Bus className="h-4 w-4 mr-1" />,
                  },
                  {
                    to: "/driver-portal",
                    label: "Driver Portal",
                    icon: <UserCircle className="h-4 w-4 mr-1" />,
                  },
                ].map(({ to, label, icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive(to)
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-900 hover:border-indigo-600 hover:text-indigo-600"
                    }`}
                  >
                    {icon}
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
              <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              {renderAuthButton()}
            </div>
            <div className="flex items-center sm:hidden">
              {renderAuthButton()}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {[
                {
                  to: "/",
                  label: "Home",
                  icon: <Home className="h-4 w-4 mr-1" />,
                },
                {
                  to: "/dashboard",
                  label: "Dashboard",
                  icon: <MapPin className="h-4 w-4 mr-1" />,
                },
                {
                  to: "/live-tracking",
                  label: "Live Tracking",
                  icon: <Bus className="h-4 w-4 mr-1" />,
                },
                {
                  to: "/driver-portal",
                  label: "Driver Portal",
                  icon: <UserCircle className="h-4 w-4 mr-1" />,
                },
              ].map(({ to, label, icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center px-3 py-2 text-base font-medium ${
                    isActive(to)
                      ? "bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700"
                      : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {icon}
                  <span className="ml-2">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
