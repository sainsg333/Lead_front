import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lead } from "@/types/lead";

interface LeadListProps {
  leads: Lead[];
}

export default function LeadList({ leads }: LeadListProps) {
  return (
    <div className="mt-4">
      {leads.map((lead) => (
        <Card key={lead._id} className="mb-4">
          <CardHeader>
            <CardTitle>{lead.name}</CardTitle>
            <CardDescription>Status: {lead.status}</CardDescription>
            <Link href={`/leads/${lead._id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}