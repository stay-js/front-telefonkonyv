'use client';

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { contactSchema } from '~/utils/contact';
import { ContactsTable } from '~/components/contacts-table';

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const res = await fetch('http://localhost:285/contacts');
      if (!res.ok) throw new Error(res.statusText);
      return z.array(contactSchema).parse(await res.json());
    },
  });

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12">
      <h1 className="text-3xl font-semibold">Telefonkönyv</h1>

      {isLoading && <div>Loading...</div>}
      {!isLoading && !data && <div>Error</div>}

      {data && <ContactsTable data={data} />}
    </main>
  );
};

export default Page;
