'use client';

import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { cn } from '~/utils/cn';
import Link from 'next/link';
import { Button, buttonVariants } from '~/components/ui/button';

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

const Card: React.FC<{
  title: string;
  body: string;
  className?: string;
}> = ({ title, body, className }) => (
  <div className={cn('overflow-hidden rounded-md border', className)}>
    <div className="bg-blue-400 px-3 py-2 text-sm font-light text-white">{title}</div>
    <pre className="p-3 font-sans">{body}</pre>
  </div>
);

const Page: React.FC<{ params: { id: string } }> = ({ params: { id } }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/contacts/${id}`);
      if (!res.ok) throw new Error(res.statusText);
      return contactSchema.parse(await res.json());
    },
  });

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12">
      {isLoading && <div>Loading...</div>}
      {!isLoading && !data && <div>Error</div>}

      {data && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold">{data.name}</h1>

            <div className="flex gap-2">
              <Link href={`/contacts/${id}/edit`} className={buttonVariants()}>
                Módosítás
              </Link>
              <Button variant="destructive">Törlés</Button>
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            <Card title="Név" body={data.name} />
            <Card title="Email" body={data.email} />
            <Card title="Születésnap" body={data.birth} />
            <Card title="Cím" body={data.address} />
            <Card title="Vállalat" body={data.company} className="col-span-2" />
            <Card title="Beosztás" body={data.role} className="col-span-2" />
            <Card title="Jegyzetek" body={data.notes} className="col-span-full" />
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
