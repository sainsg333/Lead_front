"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';

export default function NewLead() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    source: '',
    status: 'New',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('https://lead-management-79hs.onrender.com/api/leads', formData);
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Lead</CardTitle>
          <CardDescription>Fill out the form to create a new lead.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Contact</Label>
              <Input
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Source</Label>
              <Input
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Create Lead</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}