"use client";

import { useEffect, useState } from "react";
import LeadList from "../../components/LeadList";
import Calendar from "../../components/Calendar";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { Lead } from "@/types/lead";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  let source = "https://lead-management-79hs.onrender.com/api"
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  useEffect(() => {
    async function fetchLeads() {
      try {
        console.log(process.env.source);
        const res = await fetch(`${source}/leads`,{
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
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
        <div>
          <LeadList leads={leads} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 ml-4">Calendar</h2>
          <Calendar />
        </div>
      </div>

    </div>
  );
}