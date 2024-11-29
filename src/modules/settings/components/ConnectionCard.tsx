import { FC, PropsWithChildren, ReactNode } from 'react';
import { CardSection } from './CardSection';
import { Box, Button } from '@chakra-ui/react';
import { colors } from '@/theme/colors';
import { TrashBinTrash } from 'solar-icon-set';

export const ConnectionCard: FC<
  {
    isConnected: boolean;
    onConnect?: () => void;
    onDisconnect?: () => void;
    connectedText?: ReactNode;
    preventRemove?: boolean;
    preventAdd?: boolean;
    disabled?: boolean;
  } & PropsWithChildren
> = ({
  isConnected,
  children,
  onConnect,
  onDisconnect,
  connectedText,
  preventRemove,
  preventAdd,
  disabled,
}) => {
  if (isConnected) {
    return (
      <CardSection
        borderLeft="4px solid #6E81EE"
        overflow="hidden"
        position={'relative'}
        background={colors.glassBackground}
        py="0"
        px="12px"
      >
        <Box display="flex" gap={3} alignItems="center" width="full">
          {connectedText}

          {preventRemove || (
            <Button
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
              onClick={onDisconnect}
            >
              <Box gap={1} display="flex" alignItems="center">
                <TrashBinTrash />
                <span>Remove</span>
              </Box>
            </Button>
          )}
        </Box>
      </CardSection>
    );
  }

  return (
    <CardSection
      background={colors.glassBackground}
      h="60px"
      p="0"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        zIndex={1}
        display="flex"
        gap={3}
        alignItems="center"
        width="full"
        px="12px"
        h="full"
      >
        {children}
        {preventAdd || (
          <Button
            ml="auto"
            disabled={disabled}
            size="mini"
            variant="outline"
            gap="8px"
            onClick={onConnect}
          >
            Connect
          </Button>
        )}
      </Box>
    </CardSection>
  );
};
