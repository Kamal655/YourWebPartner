import { Link } from 'react-router-dom';
import logoFinal from '../assets/logo-final.png';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-4 group cursor-pointer relative z-50 pointer-events-auto">
      {/* Premium Logo Container */}
      <div className="relative z-50 group-hover:scale-110 transition-transform duration-500">
        <div className="w-[74px] h-[56px] flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10 overflow-hidden relative z-10">
          <img
            src={logoFinal}
            alt="YourWebPartner Logo"
            className="w-full h-full object-fill p-0 mix-blend-screen filter brightness-90 contrast-200 saturate-150"
          />
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      </div>

      {/* Enhanced Brand Text with better visibility */}
      <div className="flex flex-col relative z-50">
        {/* Main brand name with gradient text */}
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-500 tracking-tight">
          YourWebPartner
        </h1>

        {/* Tagline */}
        <div className="text-[10px] sm:text-sm text-gray-400 group-hover:text-white font-medium tracking-wide transition-colors duration-300">
          Your Website, Our Passion
        </div>
      </div>

      {/* Floating particles around logo - more visible */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-80 animate-float transition-opacity duration-500 animation-delay-100 shadow-lg"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-80 animate-float-reverse transition-opacity duration-500 animation-delay-300 shadow-lg"></div>
        <div className="absolute top-1/2 right-2 w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-0 group-hover:opacity-80 animate-sparkle transition-opacity duration-500 animation-delay-500 shadow-lg"></div>
      </div>
    </Link>
  );
};

export default Logo;
