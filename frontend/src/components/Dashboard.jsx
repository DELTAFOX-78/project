import React from "react";
import Navbar from "../components/Navbar";
import StatsRow from "../components/StatsRow";
import GridSection from "../components/GridSection";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {/* Header */}
      <header className="pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold px-6 py-4">Dashboard</h1>
      </header>

      {/* Body */}
      <main className="pt-4">
        <StatsRow />
        <GridSection />
      </main>
    </div>
  );
}
