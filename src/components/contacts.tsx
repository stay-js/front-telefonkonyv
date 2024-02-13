'use client';

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { ContactsTable } from './contacts-table';
import { contactSchema } from './contact';

export const Contacts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/contacts');
      if (!res.ok) throw new Error(res.statusText);
      return z.array(contactSchema).parse(await res.json());
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Error</div>;

  return <ContactsTable data={data} />;
};
