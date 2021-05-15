import { User } from 'global';

import { createContext } from 'react';

type ContextType = {
  user: User | null;
};

const UserContext = createContext<ContextType | null>(null);
export default UserContext;
