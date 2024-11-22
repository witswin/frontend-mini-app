import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { Integrations, UserConnection } from './types';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/configs/axios';
import { UserProfile } from '@/types';
import { useAuth } from '@/hooks/useAuthorization';

export type ProfileContextProps = {
  profile: UserProfile | null;
  connections: Integrations | null;
};

export const ProfileContext = createContext<ProfileContextProps>({
  profile: null,
  connections: null,
});

export const ProfileDispatchContext =
  createContext<Dispatch<SetStateAction<undefined>>>(undefined);

export const getAllConnections = async (token?: string) => {
  const { data } = await axiosClient.get<UserConnection[]>(
    '/auth/user/all-connections/',
    {
      headers: {
        Authorization: `TOKEN ${token}`,
      },
    },
  );

  const transformedData = data.reduce((prev, curr) => {
    const name = Object.keys(curr)[0];

    // if (!curr[name].isConnected) return prev

    prev[name] = curr[name];
    return prev;
  }, {} as UserConnection);

  return transformedData;
};

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const authInfo = useAuth();

  const { data, refetch } = useQuery({
    initialData: undefined,
    queryFn: () =>
      axiosClient
        .get('/auth/info/', {
          headers: {
            Authorization: `TOKEN ${authInfo?.token}`,
          },
        })
        .then((res) => res.data as UserProfile),
    queryKey: ['profile', authInfo?.token],
  });

  const connectionPage = useQuery({
    initialData: undefined,
    queryKey: ['connections', authInfo?.token],
    queryFn: () => getAllConnections(authInfo?.token),
  });

  return (
    <ProfileContext.Provider
      value={{ profile: data, connections: connectionPage.data ?? {} }}
    >
      <ProfileDispatchContext.Provider
        value={() => {
          connectionPage.refetch();
          refetch();
        }}
      >
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
};
