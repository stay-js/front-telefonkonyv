'use client';

import type { contactSchema } from '~/app/contacts/[id]/page';
import type { z } from 'zod';
import Link from 'next/link';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

type Contacts = z.infer<typeof contactSchema>;

export const ContactsTable: React.FC<{ data: Contacts[] }> = ({ data }) => {
  const table = useReactTable({
    data,
    columns: [
      {
        accessorKey: 'name',
        header: 'Név',
        cell: ({ row }) => (
          <Link href={`/contacts/${row.original.id}`} className="text-blue-400 underline">
            {row.original.name}
          </Link>
        ),
      },
      {
        accessorKey: 'phone',
        header: 'Telefonszám',
      },
      {
        accessorKey: 'email',
        header: 'Email cím',
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
