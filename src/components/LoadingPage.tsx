import { useEffect, useState } from "react";
import { CgPokemon } from "react-icons/cg";

const LoadingPage = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 backdrop-blur-md text-white z-50">
      <CgPokemon size={48} className="animate-spin" />
      <div className="text-2xl font-bold mt-4">Loading{dots}</div>
    </div>
  );
};

export default LoadingPage;
