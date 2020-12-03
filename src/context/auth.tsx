import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';
import ICredentialsDev from './credentialsDev';

interface IUser {
  id: string;
  name: string;
  email: string;
  active: string;
  created_at: Date | string;
  updated_at: Date | string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface IAuthContextState {
  user: IUser;
  signInDev(credentials: ICredentialsDev): Promise<void>;
}

export const AuthContext = createContext<IAuthContextState>(
  {} as IAuthContextState,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('ControleMerendaToken');
    const user = localStorage.getItem('ControleMerendaUser');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signInDev = useCallback(async (credentials: ICredentialsDev) => {
    const response = await api.post('/sessions', credentials);

    const { token, user } = response.data;

    localStorage.setItem('ControleMerendaToken', token);
    localStorage.setItem('ControleMerendaUser', JSON.stringify(user));
    localStorage.setItem('name', user.name);

    setData({
      token,
      user,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signInDev, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
};
