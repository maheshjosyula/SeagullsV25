"use client";  // Needed for React state in Next.js App Router
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Metrics = () => {
  // Mock data for incidents
  const data = {
    labels: ["Incidents Created", "Incidents Self-Healed", "Manual Intervention"],
    datasets: [
      {
        data: [40, 35, 25], // Mock values
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      <h2>Incident Metrics</h2>
      <Pie data={data} />
    </div>
  );
};

export default Metrics;
