"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Lead } from "@/types/lead"; 

export default function NewEstimatePage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [formData, setFormData] = useState({
    lead_id: "",
    items: [{ item_name: "", price: 0, quantity: 1 }],
    status: "Pending",
  });

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get<Lead[]>("https://lead-management-79hs.onrender.com/api/leads");
        setLeads(res.data);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      }
    };
    fetchLeads();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("https://lead-management-79hs.onrender.com/api/estimates", formData);
    router.push("/estimates");
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { item_name: "", price: 0, quantity: 1 }],
    });
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Estimate</CardTitle>
          <CardDescription>Fill out the form to create a new estimate.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Lead</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.lead_id}
                onChange={(e) => setFormData({ ...formData, lead_id: e.target.value })}
                required
              >
                <option value="">Select a Lead</option>
                {leads.map((lead) => (
                  <option key={lead._id} value={lead._id}>
                    {lead.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Items</Label>
              {formData.items.map((item, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    placeholder="Item Name"
                    value={item.item_name}
                    onChange={(e) => handleItemChange(index, "item_name", e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    value={item.price || ""}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value ? parseFloat(e.target.value) : 0)
                    }
                    required
                  />
                  <Input
                    placeholder="Quantity"
                    type="number"
                    value={item.quantity || ""}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value ? parseInt(e.target.value) : 0)
                    }
                    required
                  />

                </div>
              ))}
              <Button className="mt-4" type="button" onClick={handleAddItem}>
                Add Item
              </Button>
            </div>

            <Button type="submit">Create Estimate</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
