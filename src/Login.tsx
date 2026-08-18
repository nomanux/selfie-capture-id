import { useState, useEffect } from "react";
import { useNavigation } from "./NavigationContext";
import Button from "./Button";
import Input from "./Input";
import Checkbox from "./Checkbox";
import { EyeIcon } from "./icons";
import dmciLogo from "./assets/dmci-logo.svg";
import carousel3Cvz1 from "./assets/carousel3-Cvz1Bo5L.jpg";
import carousel4 from "./assets/carousel4-CeaP0fpH.jpg";
import carousel3Cvz2 from "./assets/carousel3-Cvz1Bo5L (1).jpg";
import carousel2 from "./assets/carousel2-CGSvuCMf.jpg";
import carousel5 from "./assets/carousel5-OqOzCcEj.jpg";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const CAROUSEL_IMAGES = [
  carousel3Cvz1,
  carousel4,
  carousel3Cvz2,
  carousel2,
  carousel5,
];

export default function Login() {
  const { navigate } = useNavigation();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (formData.email && formData.password) {
        navigate({ screen: "dashboard" });
      } else {
        setError("Email and password are required");
      }
      setIsLoading(false);
    }, 500);
  }

  return (
    <div className="flex min-h-screen w-full bg-white flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="flex flex-col w-full lg:w-1/2">
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 sm:px-12">
          <div className="w-full max-w-[400px] space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <img src={dmciLogo} alt="DMCI Logo" className="h-10 w-auto" />
            </div>

            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-base text-gray-600">
                Please enter your email and password to access your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email<span className="ml-0.5 text-blue-600">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password<span className="ml-0.5 text-blue-600">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      required
                      clearable={false}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-gray-300" />
              <span className="text-sm font-medium text-gray-500">
                Or Continue With
              </span>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" fill="#F25022" />
                  <rect x="9" y="1" width="6" height="6" fill="#7FBA00" />
                  <rect x="1" y="9" width="6" height="6" fill="#00A4EF" />
                  <rect x="9" y="9" width="6" height="6" fill="#FFB900" />
                </svg>
                Microsoft
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white px-8 py-4 text-center text-xs text-gray-500">
          DMCI Sales @2025 All Rights Reserved
        </div>
      </div>

      {/* Right Side - Carousel */}
      <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-[#FAFAFA] p-5">
        <div className="relative w-[585px] h-[698px] rounded-3xl overflow-hidden bg-white p-5">
          <div className="relative w-full h-full">
            {CAROUSEL_IMAGES.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1500 rounded-2xl overflow-hidden ${index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              >
                <img
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {CAROUSEL_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`transition-all duration-300 rounded-full h-1 ${index === currentImageIndex ? "w-11 bg-white" : "w-8 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
