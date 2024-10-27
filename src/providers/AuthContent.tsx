import { createContext, useState } from 'react';

export const AuthContext = createContext<any>([]);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<any>({
    isLoggedIn: false,
  });

  return (
    <AuthContext.Provider value={[authInfo, setAuthInfo]}>
      {children}
    </AuthContext.Provider>
  );
};
