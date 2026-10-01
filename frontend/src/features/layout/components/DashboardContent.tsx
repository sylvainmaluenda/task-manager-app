import { useAuthStore } from '@/features/auth/store/auth.store';
import { ActionWarning } from '@/shared/components/messages/ActionWarning';
import { Link, Outlet } from 'react-router-dom';

const DashboardContent = () => {
  const mode = useAuthStore((s) => s.mode);

  return (
    <main className="py-4 px-8 max-w-[820px]">
      {mode === 'guest' && (
        <ActionWarning>
          <p>
            Guest mode: demo data will be restored if you refresh the page.{' '}
            <Link to="/register" className="underline">
              Create an account
            </Link>{' '}
            to persist your data.
          </p>
        </ActionWarning>
      )}
      <Outlet />
    </main>
  );
};

export default DashboardContent;
