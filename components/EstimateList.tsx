"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Estimate } from "@/types/estimate";
import EstimateDetail from "./EstimateDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "./Calendar";

interface EstimateListProps {
  estimates: Estimate[];
}

export default function EstimateList({ estimates }: EstimateListProps) {
  const [localEstimates, setLocalEstimates] = useState<Estimate[]>(estimates);

  useEffect(() => {
    async function fetchEstimates() {
      try {
        const res = await axios.get(`https://lead-management-79hs.onrender.com/api/estimates`);
        setLocalEstimates(res.data);
      } catch (error) {
        console.error("Failed to fetch estimates:", error);
      }
    }

    fetchEstimates();
  }, []);

  const updateEstimateStatus = (id: string, status: string) => {
    setLocalEstimates((prevEstimates) =>
      prevEstimates.map((est) =>
        est._id === id ? { ...est, status } : est
      )
    );
  };

  return (
    <div className="mt-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
              {localEstimates.map((estimate) => (
        <Card key={estimate._id} className="mb-4">
          <CardHeader>
            <CardTitle>Estimate for {estimate.lead_id?.name || "Unknown"}</CardTitle>
            <CardDescription>Status: {estimate.status}</CardDescription>
            <EstimateDetail estimate={estimate} onStatusUpdate={updateEstimateStatus} />
          </CardHeader>
        </Card>
      ))}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 ml-4">Calendar</h2>
                <Calendar />
              </div>
            </div>
    </div>
  );
}
