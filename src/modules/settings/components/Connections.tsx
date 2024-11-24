import {
  Text,
  useToast,
  Box,
  VStack,
  // Switch,
  HStack,
  Divider,
  Button,
} from '@chakra-ui/react';
import { useProfile, useProfileDispatch } from '../hooks';
import { CardSection } from './CardSection';
import { ConnectionCard } from './ConnectionCard';
import Image from 'next/image';
import { axiosClient } from '@/configs/axios';
import { handleApiError } from '@/utils';
import { colors } from '@/theme/colors';
import {
  FC,
  //  useEffect,
  useState,
} from 'react';
import { RemoveConnectionCard } from './RemoveConnectionCard';

export const getTwitterOAuthUrlApi = async (): Promise<string> => {
  const res = await axiosClient.get('/auth/twitter/');
  return res.data.url as string;
};

export const Connections = () => {
  const [focusedConnection, setFocusedConnection] = useState({
    name: '',
    url: '',
  });

  return (
    <CardSection>
      <Text fontWeight="bold" color="gray.10" fontSize="xl">
        Socials
      </Text>

      <VStack w="full" gap="16px">
        <TelegramConnection />

        <Divider borderColor="gray.600" />

        <TwitterConnection onRemove={setFocusedConnection} />
        <FarcasterConnection onRemove={setFocusedConnection} />
        <DiscordConnection onRemove={setFocusedConnection} />

        <RemoveConnectionCard
          isOpen={!!focusedConnection.name}
          name={focusedConnection.name}
          onClose={() => setFocusedConnection({ name: '', url: '' })}
          url={focusedConnection.url}
        />
      </VStack>
    </CardSection>
  );
};

export type OnPromptRemove = (arg: { url: string; name: string }) => void;

export const TelegramConnection = () => {
  const { connections } = useProfile();
  const dispatch = useProfileDispatch();
  // const [isPrivate, setIsPrivate] = useState(connections.Telegram.isPrivate);
  const toast = useToast();

  const onToggle = () => {
    axiosClient
      .patch('/auth/telegram/private/', {
        isPrivate: !connections.Telegram.isPrivate,
      })
      .then(() => {
        dispatch(undefined);
        toast({
          description: 'Telegram privacy updated sucecssfully',
          status: 'success',
        });
      });
  };

  // useEffect(() => {
  //   setIsPrivate(connections.Telegram.isPrivate);
  // }, [connections]);

  console.log({ connections });

  if (connections.Telegram)
    return (
      <CardSection
        borderLeft="4px solid #6E81EE"
        overflow="hidden"
        position={'relative'}
        background={colors.glassBackground}
      >
        <HStack
          alignItems="center"
          width="full"
          px="12px"
          gap="8px"
          justifyContent="space-between"
        >
          <HStack flex={1} gap="8px" justifyContent="start">
            <Image
              src="/assets/images/connections/telegram.svg"
              width={24}
              height={24}
              alt="Telegram"
            />
            <span>{connections.Telegram.username}</span>
          </HStack>
          {/* 
          <HStack>
            <Text>{isPrivate ? 'Private' : 'Public'}</Text>
            <Switch
              onToggle={() => onToggle()}
              checked={!isPrivate}
              style={{ backgroundColor: '#6E81EE', borderRadius: '12px' }}
            />
          </HStack> */}
          <Button
            onClick={onToggle}
            ml="auto"
            background={colors.glassBackground}
            _before={{
              background: colors.glassBackground,
            }}
            borderRadius="12px"
            size="sm"
            fontWeight="normal"
            variant="solid"
            gap="8px"
          >
            <Box gap={1} display="flex" alignItems="center">
              {connections.Telegram.isPrivate ? 'Make Public' : 'Make Private'}
            </Box>
          </Button>
        </HStack>
      </CardSection>
    );

  return (
    <CardSection background={colors.glassBackground}>
      <Box display="flex" gap={3} alignItems="center" width="full">
        <Image
          src="/assets/images/connections/telegram.svg"
          width={24}
          height={24}
          alt="Telegram"
        />
        <span>Telegram</span>
        <small className="ml-auto">
          Login with telegram widget to continue
        </small>
      </Box>
    </CardSection>
  );
};

export const TwitterConnection: FC<{ onRemove: OnPromptRemove }> = ({
  onRemove,
}) => {
  const { connections } = useProfile();

  const onConnect = () => {
    getTwitterOAuthUrlApi().then((res) => (window.location.href = res));
  };

  return (
    <ConnectionCard
      onConnect={onConnect}
      onDisconnect={() => onRemove({ name: 'Twitter', url: '/auth/twitter' })}
      connectedText={
        <>
          <Image
            src="/assets/images/connections/x.svg"
            width={24}
            height={24}
            alt="Telegram"
          />
          <span>{connections.Twitter?.username}</span>
        </>
      }
      isConnected={!!connections.Twitter && connections.Twitter.isConnected}
    >
      <Image
        src="/assets/images/connections/x.svg"
        width={24}
        height={24}
        alt="Twitter"
      />
      <span>Twitter</span>
    </ConnectionCard>
  );
};

export const DiscordConnection: FC<{ onRemove: OnPromptRemove }> = ({
  onRemove,
}) => {
  const { connections } = useProfile();

  const onConnect = async () => {
    try {
      const response = await axiosClient.get('/auth/discord/');

      window.location.href = response.data.data;
    } catch (error) {
      console.error('Error making API request:', error);
    }
  };

  return (
    <ConnectionCard
      onDisconnect={() => onRemove({ name: 'Discord', url: '/auth/discord/' })}
      onConnect={onConnect}
      connectedText={
        <>
          <Image
            src="/assets/images/connections/discord.svg"
            width={24}
            height={24}
            alt="Discord"
          />
          <span>{connections.Discord?.username}</span>
        </>
      }
      isConnected={!!connections.Discord && connections.Discord.isConnected}
    >
      <Image
        src="/assets/images/connections/discord.svg"
        width={24}
        height={24}
        alt="Discord"
      />
      <span>Discord</span>
    </ConnectionCard>
  );
};

export const FarcasterConnection: FC<{ onRemove: OnPromptRemove }> = ({
  onRemove,
}) => {
  const { connections, profile } = useProfile();
  const setState = useProfileDispatch();

  const toast = useToast();

  const onConnect = async () => {
    if (!profile.wallets.length) {
      toast({
        description: 'Connect your wallet first!',
        status: 'error',
      });
      return;
    }

    axiosClient
      .post('/auth/user/connect/farcaster/', {
        userWalletAddress: profile.wallets.at(0).walletAddress,
      })
      .then(() => {
        setState(undefined);
      })
      .catch((e) => {
        handleApiError(e, toast);
      });
  };

  return (
    <ConnectionCard
      onDisconnect={() =>
        onRemove({ name: 'Farcaster', url: '/auth/user/disconnect/farcaster/' })
      }
      onConnect={onConnect}
      connectedText={
        <>
          <Image
            src="/assets/images/connections/farcaster.svg"
            width={24}
            height={24}
            alt="Telegram"
          />
          <span>Connected </span>
        </>
      }
      isConnected={!!connections.Farcaster && connections.Farcaster.isConnected}
    >
      <Image
        src="/assets/images/connections/farcaster.svg"
        width={24}
        height={24}
        alt="Farcaster"
      />
      <span>Farcaster</span>
    </ConnectionCard>
  );
};
