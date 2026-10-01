import { useSessionCountdown } from '../hooks/useSessionCountdown';
import { useAuthStore } from '@/features/auth/store/auth.store';

const SessionDatas = () => {
  const { token } = useAuthStore();
  const session = useSessionCountdown(token);

  const s = session.secondsLeft;
  // const days = Math.floor(s / 86400);
  // const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  return (
    <>
      {s > 0 ? (
        <div>
          Session: {minutes} {minutes > 1 ? 'minutes ' : 'minute '}
          {seconds} s
        </div>
      ) : (
        <div>Session: expired</div>
      )}
    </>
  );
};

export default SessionDatas;
