import type { NextPage } from 'next';
import { EditPage } from '~/components/edit-page';

const Page: NextPage = () => (
  <main className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12">
    <h1 className="text-3xl font-semibold">Új kontakt létrehozása</h1>
    <EditPage />
  </main>
);

export default Page;
