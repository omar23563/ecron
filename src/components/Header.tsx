import React from "react";
import { Clock } from "@/components/Clock";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  greeting?: string;
}

const Header: React.FC<HeaderProps> = ({ greeting = "Nom de l'atelier" }) => {
  return (
    <div className="mb-12 px-6">
      <div className="flex justify-between items-center bg-gradient-to-r from-[#E0F7F5] to-[#F0FCFB] p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Sparkles className="text-teal-500 w-8 h-8 animate-pulse" />
            <h1 className="text-5xl font-extrabold text-teal-800">Bienvenue !</h1>
          </div>
          <div className="text-2xl font-medium text-teal-700 ml-11">
            {greeting}
          </div>
        </div>
        <Clock />
      </div>
    </div>
  );
};

export default Header;
