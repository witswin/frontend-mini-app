import { BottomModal } from '@/components/BottomModal';
import {
  Button,
  Center,
  HStack,
  useClipboard,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { Copy } from 'solar-icon-set';

interface ShareModalProps extends UseDisclosureProps {}
export const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const sharableLink = window.location.href;

  const [isShareSupport, setShareSupport] = useState(false);
  const { hasCopied, onCopy } = useClipboard(sharableLink);

  useEffect(() => {
    if (navigator.share) {
      setShareSupport(true);
    }
  }, []);

  return (
    <BottomModal title="Share quiz" isOpen={isOpen} onClose={onClose}>
      <Center>
        <QRCodeSVG size={230} value={sharableLink} />
      </Center>
      <HStack mb="24px" columnGap="16px" mt="24px" width="full">
        <Button
          onClick={onCopy}
          width="full"
          leftIcon={<Copy iconStyle="Linear" />}
          variant="outline"
        >
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
        {isShareSupport && (
          <Button
            onClick={() => {
              navigator
                .share({
                  title: 'Share quiz',
                  text: 'Check out this quiz!',
                  url: sharableLink,
                })
                .catch((err) => console.warn('Error sharing', err));
            }}
            width="full"
            leftIcon={<Copy iconStyle="Linear" />}
            variant="outline"
          >
            Share Link
          </Button>
        )}
      </HStack>
    </BottomModal>
  );
};
