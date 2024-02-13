import { Contacts } from '~/components/contacts';

const Page = () => (
  <main className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12">
    <h1 className="bold text-3xl">Telefonkönyv</h1>

    <Contacts />
  </main>
);

export default Page;
