"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card } from "@/components/ui/card";
import { Lead } from "@/types/lead";
import { Estimate } from "@/types/estimate";

export default function Calendar() {
  const [events, setEvents] = useState<{ title: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadsRes = await axios.get<Lead[]>("https://lead-management-79hs.onrender.com/api/leads");
        const leads = leadsRes.data;
        const estimatesRes = await axios.get<Estimate[]>("https://lead-management-79hs.onrender.com/api/estimates");
        const estimates = estimatesRes.data;
        const events = [
          ...leads.map((lead) => ({
            title: `Lead: ${lead.name}`,
            date: new Date(lead.createdAt).toISOString().split("T")[0],
          })),
          ...estimates.map((estimate) => ({
            title: `Estimate: ${estimate.lead_id.name}`,
            date: new Date(estimate.createdAt).toISOString().split("T")[0],
          })),
        ];

        setEvents(events);
        setError(null);
      } catch (err) {
        console.error("Error fetching data for calendar:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading calendar...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </Card>
  );
}