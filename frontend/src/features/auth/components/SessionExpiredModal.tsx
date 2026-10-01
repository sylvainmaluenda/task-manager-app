import { Button } from '@/shared/components/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/shadcn/dialog';

type Props = {
  logout: () => void;
};

export const SessionExpiredModal = ({ logout }: Props) => {
  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          logout();
        }
      }}
    >
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Session expired</DialogTitle>
          <DialogDescription>
            Your session has expired. You can extend your session or close this
            window to login again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Extend my session</Button>
          <Button onClick={logout}>Logout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionExpiredModal;
