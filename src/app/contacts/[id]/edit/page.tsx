'use client';

import { useQuery } from '@tanstack/react-query';
import { EditPage } from '~/components/edit-page';
import { contactSchema } from '~/utils/contact';

const Page: React.FC<{ params: { id: string } }> = ({ params: { id } }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['contact', id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:285/contacts/${id}`);
      if (!res.ok) throw new Error(res.statusText);
      return contactSchema.parse(await res.json());
    },
  });

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12">
      {isLoading && <div>Loading...</div>}
      {!isLoading && !data && <div>Error</div>}

      {data && (
        <>
          <h1 className="text-3xl font-semibold">{data.name} szerkesztése</h1>
          <EditPage id={data.id} initialValues={{ ...data, birth: new Date(data.birth) }} />
        </>
      )}
    </main>
  );
};

export default Page;
