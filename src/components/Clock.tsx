import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const Clock: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = format(date, "EEEE d MMMM yyyy", { locale: fr });
  const formattedTime = format(date, "HH:mm:ss");

  return (
    <div className="text-right">
      <div className="inline-block px-8 py-4 bg-gradient-to-r from-teal-700 to-teal-500 rounded-xl shadow-2xl">
        <time
          className="text-5xl md:text-6xl font-extrabold tracking-widest text-white font-mono"
          dateTime={date.toISOString()}
        >
          {formattedTime}
        </time>
      </div>
      <div className="mt-3">
        <time
          className="text-2xl md:text-3xl font-semibold text-teal-800 capitalize"
          dateTime={date.toISOString()}
        >
          {formattedDate}
        </time>
      </div>
    </div>
  );
};
