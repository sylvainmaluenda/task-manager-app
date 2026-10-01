import logo from '@/assets/logo.png';
import AuthForm from '@/features/auth/components/AuthForm';
import { useLocation } from 'react-router-dom';

const AuthPage = () => {
  const { pathname } = useLocation();

  const mode = pathname === '/login' ? 'login' : 'register';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="mb-6 flex justify-center">
        <img src={logo} alt="Logo" className="w-50 object-contain" />
      </div>
      <AuthForm mode={mode} />
    </div>
  );
};

export default AuthPage;
