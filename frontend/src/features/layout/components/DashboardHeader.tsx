import logo from '@/assets/logo.png';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/shared/components/shadcn/dropdown-menu';
import { useUserStore } from '@/features/users/store/user.store';
import { capitalize } from '@/shared/lib/capitalize';
import SessionDatas from '@/features/auth/components/SessionDatas';
import { useSessionCountdown } from '@/features/auth/hooks/useSessionCountdown';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const mode = useAuthStore((s) => s.mode);
  const user = useUserStore((s) => s.user)!;

  const { token } = useAuthStore();
  const session = useSessionCountdown(token);

  if (session.isExpired) {
    navigate('/login?expired');
  }

  return (
    <header className="p-4 border-b border-gray-300 bg-gray-100 flex items-center justify-between">
      <button onClick={() => navigate('/dashboard')} className="cursor-pointer">
        <img className="h-12 inline-block" src={logo} alt="Task Manager" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primary text-2xl h-10 w-10 text-white cursor-pointer">
            {mode === 'guest' ? 'G' : user.name.trim()[0].toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {mode === 'guest' ? 'Guest mode' : capitalize(user.name)}
              {mode !== 'guest' && <SessionDatas />}
            </DropdownMenuLabel>
            <DropdownMenuItem
              disabled={mode === 'guest'}
              onClick={
                mode === 'guest' ? undefined : () => navigate('/dashboard/me')
              }
            >
              Account settings
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={
                mode === 'guest' ? () => navigate('/login') : () => logout()
              }
            >
              Logout
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default DashboardHeader;
