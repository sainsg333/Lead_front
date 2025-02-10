import EstimateList from "@/components/EstimateList";
import { Estimate } from "@/types/estimate";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EstimatesPage() {
  const res = await fetch("https://lead-management-79hs.onrender.com/api/estimates", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch estimates");
  const estimates: Estimate[] = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 ">Estimates</h1>
      <div className="flex justify-between">
      <Link href="/estimates/new">
        <Button>Create New Estimate</Button>
      </Link>
      <Link href="/">
        <Button>Leads</Button>
      </Link>
      </div>
      
      <EstimateList estimates={estimates} />
    </div>
  );
}
