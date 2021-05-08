import { useEffect, useState } from 'react';

import { User } from 'global';

export default function useAuthListener() {
  const [user, setUser] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem('login') || 'null')
  );

  const checkToken = () => {
    const login: User = JSON.parse(localStorage.getItem('login') || '{}');
    if (login?.token) setUser(login);
    else setUser(null);
  };

  useEffect(() => {
    window.addEventListener('storage', checkToken);
  }, []);

  return { user };
}
