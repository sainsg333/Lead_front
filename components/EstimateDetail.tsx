"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Estimate } from "@/types/estimate";
import axios from "axios";

interface EstimateDetailProps {
  estimate: Estimate;
  onStatusUpdate: (id: string, status: string) => void; // Function to update status
}

export default function EstimateDetail({ estimate, onStatusUpdate }: EstimateDetailProps) {
  const [est, setEst] = useState<Estimate>(estimate);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (status: string) => {
    try {
      await axios.put(`https://lead-management-79hs.onrender.com/api/${est._id}`, { status });
      setEst((prev) => ({ ...prev, status })); // Update local state
      onStatusUpdate(est._id, status);
      setIsEditing(false) // Update parent state immediately
    } catch (error) {
      console.error("Failed to update estimate:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-md">
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Items</h3>
            <ul className="border rounded-lg p-2 bg-gray-50">
              {Array.isArray(est.items) ? (
                est.items.map((item, index) => (
                  <li key={index} className="flex justify-between p-2 border-b last:border-none">
                    <span>{item.item_name}</span>
                    <span className="font-medium">₹{item.price} x {item.quantity}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-center p-2">No items available</li>
              )}
            </ul>

            <div className="flex gap-3 mt-4">
              {isEditing ? (
                <>
                  <Button onClick={() => handleUpdate("Approved")} className="bg-green-500 hover:bg-green-600 text-white">
                    Approve
                  </Button>
                  <Button onClick={() => handleUpdate("Rejected")} variant="destructive">
                    Reject
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  Edit Status
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
