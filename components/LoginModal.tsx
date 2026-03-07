import { MOCK_USERS } from '../constants';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (user: (typeof MOCK_USERS)[number]) => void;
}

export default function LoginModal({ open, onClose, onLogin }: LoginModalProps) {
  if (!open) return null;

  const handleSelectRole = (index: number) => {
    onLogin(MOCK_USERS[index] ?? MOCK_USERS[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-80">
        <h3 className="font-semibold mb-3">Choose a mock user</h3>
        <div className="space-y-2">
          <button onClick={() => handleSelectRole(0)} className="w-full rounded-lg border p-2 text-left">Login as Citizen</button>
          <button onClick={() => handleSelectRole(1)} className="w-full rounded-lg border p-2 text-left">Login as Organizer</button>
        </div>
      </div>
    </div>
  );
}
