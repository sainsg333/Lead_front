"use client";
import { useParams } from "next/navigation"; 
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lead } from "@/types/lead";

export default function LeadDetails() {
  const params = useParams(); 
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (!params?.id) return; 
    async function fetchLead() {
      try {
        const res = await fetch(`https://lead-management-79hs.onrender.com/api/leads/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch lead");
        const data = await res.json();
        setLead(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLead();
  }, [params.id]);

  const handleUpdate = async (status: string) => {
    if (!lead) return;
    try {
      await axios.put(`https://lead-management-79hs.onrender.com/api/leads/${lead._id}`, { status });
      setLead((prev) => prev ? { ...prev, status } : prev);
    } catch (error) {
      console.error("Failed to update lead", error);
    }
  };

  if (!lead) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{lead.name}</CardTitle>
          <CardDescription>Contact: {lead.contact}</CardDescription>
          <CardDescription>Status: {lead.status}</CardDescription>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => handleUpdate("In Progress")}>Mark as In Progress</Button>
            <Button onClick={() => handleUpdate("Closed")}>Mark as Closed</Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
