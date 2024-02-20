'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { TbCalendar } from 'react-icons/tb';
import { z } from 'zod';
import { toast } from 'sonner';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';

const dateFormatter = new Intl.DateTimeFormat('fr-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Kérjük töltse ki a mezőt!' })
    .max(25, { message: 'A név maximum 25 karakter lehet!' }),
  phone: z
    .string()
    .regex(/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]{8,14}$/g, {
      message: 'Kérjük adjon meg egy valós telefonszámot!',
    })
    .max(20, { message: 'A telefonszám maximum 20 karakter lehet!' }),
  email: z.string().email({ message: 'Kérjük adjon meg egy valós e-mail címet!' }),
  address: z
    .string()
    .min(20, { message: 'A cím minimum 20 karakterből kell álljon!' })
    .max(125, { message: 'A cím maximum 125 karakter lehet!' })
    .nullable(),
  birth: z
    .date()
    .min(new Date(1920, 0, 1), { message: 'A születésnap nem lehet 1920.01.01 előtti!' })
    .max(new Date(2020, 0, 1), { message: 'A születésnap nem lehet 2020.01.01 utáni!' }),
  company: z.string().max(40, { message: 'A cég maximum 40 karakter lehet!' }).optional(),
  role: z.string().max(20, { message: 'A beosztás maximum 20 karakter lehet!' }).optional(),
  notes: z.string().max(200, { message: 'A jegyzet maximum 200 karakter lehet!' }).optional(),
});

type FormSchema = z.infer<typeof formSchema>;
type Data = Omit<FormSchema, 'birth'> & { birth: string };

const defaultValues: FormSchema = {
  name: '',
  phone: '',
  email: '',
  address: '',
  birth: new Date(),
  company: '',
  role: '',
  notes: '',
};

export const EditPage: React.FC<{
  id?: number;
  initialValues?: FormSchema;
}> = ({ id, initialValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? defaultValues,
  });

  const [date, setDate] = useState<Date>(getValues('birth'));

  const { mutate, status } = useMutation({
    mutationFn: async (data: Data) => {
      return fetch(`http://localhost:285/${id ? `contacts/${id}` : 'contacts'}`, {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify({ ...data, id }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      });
    },
    onError: (error) => toast.error('Hiba történt', { description: error.message }),
    onSuccess: () => {
      toast.success('Névjegy mentve', { description: 'A névjegy sikeresen mentésre került.' });
    },
  });

  const onSubmit = (data: FormSchema) => {
    mutate({ ...data, birth: dateFormatter.format(data.birth) });

    if (!id) {
      reset(defaultValues);
      setDate(defaultValues.birth);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">
          Teljes név <span className="text-red-500">*</span>
        </Label>
        <Input type="text" id="name" placeholder="Minta János" {...register('name')} />
        {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">
          Telefonszám <span className="text-red-500">*</span>
        </Label>
        <Input type="text" id="phone" placeholder="+36-30-111-11-11" {...register('phone')} />
        {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">
          Email cím <span className="text-red-500">*</span>
        </Label>
        <Input type="text" id="email" placeholder="example@example.com" {...register('email')} />
        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="address">
          Cím <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="address"
          placeholder="1000 Budapest, Minta utca 2."
          {...register('address')}
        />
        {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="birth">
          Születésnap <span className="text-red-500">*</span>
        </Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex w-full items-center justify-start gap-2">
              <TbCalendar size={16} />
              {dateFormatter.format(date)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={getValues('birth')}
              onSelect={(date) => {
                if (!date) return;

                setDate(date);
                setValue('birth', date);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {errors.birth && <span className="text-xs text-red-500">{errors.birth.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="company">Vállalat</Label>
        <Input type="company" id="company" placeholder="Minta Zrt." {...register('company')} />
        {errors.company && <span className="text-xs text-red-500">{errors.company.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="role">Beosztás</Label>
        <Input type="role" id="role" placeholder="Műszakvezető" {...register('role')} />
        {errors.role && <span className="text-xs text-red-500">{errors.role.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Jegyzetek</Label>
        <Textarea id="notes" {...register('notes')} />
        {errors.notes && <span className="text-xs text-red-500">{errors.notes.message}</span>}
      </div>

      <Button type="submit" className="w-fit" disabled={status === 'pending'}>
        {status === 'pending' ? 'Folyamatban...' : 'Mentés'}
      </Button>
    </form>
  );
};
