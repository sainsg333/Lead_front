"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card } from "@/components/ui/card";
import { Estimate } from "@/types/estimate";

type Event = {
  title: string;
  date: string;
  id: string;
  color: string;
};

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const estimatesRes = await fetch("https://lead-management-79hs.onrender.com/api/estimates");
        const estimates = await estimatesRes.json();

        const events: Event[] = estimates.map((estimate: Estimate) => {
          const createdDate = new Date(estimate.createdAt);
          const today = new Date();
          const diffDays = Math.ceil((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

          let color = 'green';
          if (diffDays >= 7) {
            color = 'red';
          } else if (diffDays >= 5) {
            color = 'orange';
          }

          return {
            title: `Estimate: ${estimate.lead_id.name}`,
            date: createdDate.toISOString().split("T")[0],
            id: estimate._id,
            color,
          };
        });

        setEvents(events);
      } catch (err) {
        console.error("Error fetching data for calendar:", err);
      }
    };

    fetchData();
  }, []);

  const handleFollowUp = async (eventId: string) => {
    try {
      await fetch("https://lead-management-79hs.onrender.com/api/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });
      alert("Follow-up email sent!");
    } catch (error) {
      console.error("Error sending follow-up:", error);
    }
  };

  return (
    <Card className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({ ...event, backgroundColor: event.color }))}
        eventContent={(info) => (
          <div
            className="flex items-center justify-between"
            onMouseEnter={() => setHoveredEventId(info.event.id as string)}
            onMouseLeave={() => setHoveredEventId(null)}
          >
            <span className="overflow-hidden">{info.event.title}</span>
            {info.event.backgroundColor === 'red' && hoveredEventId === info.event.id && (
              <button
                className=" bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleFollowUp(info.event.id as string)}
                title="Send follow-up reminder"
              >
            <span className="overflow-hidden">{info.event.title}</span>

                <span className="bg-green-500">Follow Up</span>
              </button>
            )}
          </div>
        )}
      />
    </Card>
  );
}
