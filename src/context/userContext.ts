import { User } from 'global';

import { createContext } from 'react';

type ContextType = {
  user: User;
};

const UserContext = createContext<ContextType | null>(null);
export default UserContext;
