'use client';

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const contactSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  birth: z.string(),
  company: z.string(),
  role: z.string(),
  address: z.string(),
  notes: z.string(),
});

export const Contacts: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/contacts/${id}`);
      if (!res.ok) throw new Error(res.statusText);
      return contactSchema.parse(await res.json());
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Error</div>;

  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
};
