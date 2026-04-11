"use client"

import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="absolute bg-black w-full min-h-screen overflow-hidden">
      {/* Dark Grid Background */}
      <div
        className="z-0 fixed inset-0"
        style={{
          backgroundColor: "#050505",
          backgroundImage: `
linear-gradient(to right, rgba(34,211,238,0.1) 1px, transparent 1px),
linear-gradient(to bottom, rgba(34,211,238,0.1) 1px, transparent 1px),
radial-gradient(circle at 50% 60%, rgba(34,211,238,0.12) 0%, rgba(6,182,212,0.05) 40%, transparent 75%)`,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />

      {/* Content Layer */}
      <div className="z-10 relative">
        {/* Your content here */}
      </div>
    </div>
  );
};