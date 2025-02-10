"use client";

import { useEffect, useState } from "react";
import LeadList from "../components/LeadList";
import Calendar from "../components/Calendar";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { Lead } from "@/types/lead";
import { Estimate } from "@/types/estimate";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);


  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("https://lead-management-79hs.onrender.com/api/leads");
        if (!res.ok) throw new Error("Failed to fetch leads");
        const data = await res.json();
        setLeads(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLeads();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>
      <div className="flex justify-between">
      <Link href="/leads/new">
        <Button>Create New Lead</Button>
      </Link>
      <Link href="/estimates">
        <Button>Estimates</Button>
      </Link>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Lead List Section */}
        <div>
          <LeadList leads={leads} />
        </div>

        {/* Calendar Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2 ml-4">Calendar</h2>
          <Calendar />
        </div>
      </div>

    </div>
  );
}