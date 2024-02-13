import { Contacts } from '~/components/contacts';

const Page = () => (
  <main className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12">
    <h1 className="text-3xl font-semibold">Telefonkönyv</h1>

    <Contacts />
  </main>
);

export default Page;
