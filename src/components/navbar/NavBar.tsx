import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import Logo from '../../assets/logo.svg';

export const NavBar = () => (
  <header className="fixed bg-white text-black inset-x-0 top-0 z-50 backdrop-blur-lg border-b shadow-lg">
    <nav className="mx-auto max-w-[1600px] px-6 h-20">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <a href="/" className="group">
            <img src={Logo} alt="Reclaim Logo" className="w-[140px]" />
          </a>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          <a
            href="#features"
            className="relative text-sm font-medium text-gray-900 hover:text-white transition-all duration-200 group py-2"
          >
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white rounded-full transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a
            href="#how-it-works"
            className="relative text-sm font-medium text-gray-900 hover:text-white transition-all duration-200 group py-2"
          >
            How it Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white rounded-full transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a
            href="#who-is-it-for"
            className="relative text-sm font-medium text-gray-900 hover:text-white transition-all duration-200 group py-2"
          >
            Who is it For?
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white rounded-full transition-all duration-200 group-hover:w-full"></span>
          </a>
          <div className="h-6 w-px bg-white/20"></div>
        </div>

        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/90 hover:text-white hover:bg-white/20 rounded-lg border border-white/20 backdrop-blur-sm"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  </header>
);
