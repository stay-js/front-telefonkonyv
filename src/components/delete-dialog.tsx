import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';

export const DeleteDialog: React.FC<{ action: () => void }> = ({ action }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive">Törlés</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Névjegy törlése</AlertDialogTitle>
        <AlertDialogDescription>
          Biztosan törölni szeretné a névjegyet? Ez a művelet <b>végleges és nem vissza vonható</b>.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Mégsem</AlertDialogCancel>
        <AlertDialogAction onClick={action}>Törlés</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
