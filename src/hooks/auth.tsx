import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User | null;
  signIn(): Promise<void>;
  logout(): Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const userStorageKey = '@gofinances:user';
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function logout(){
    await GoogleSignin.signOut();
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const storagedUser = await AsyncStorage.getItem(userStorageKey);
      if(storagedUser){
        const loggedUserInfo = JSON.parse(storagedUser) as User;
        setUser(loggedUserInfo);
      }
      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

  GoogleSignin.configure();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const formattedUser = {
        id: userInfo.user.id || '',
        name: userInfo.user.name || '',
        email: userInfo.user.email || '',
        photo: userInfo.user.photo || '',
      }
      setUser(formattedUser);
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(formattedUser));

    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // Usuário cancelou o fluxo de login
            break;
          case statusCodes.IN_PROGRESS:
            // Operação (ex: login) já está em progresso
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Play Services não disponível ou desatualizado
            break;
          default:
            // Outro erro ocorreu
        }
      } else {
        // Erro não relacionado ao Google Sign-In
      }
    }
  };

  return (
    <AuthContext.Provider value={{
        user,
        signIn,
        logout,
        userStorageLoading
      }
      }>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
