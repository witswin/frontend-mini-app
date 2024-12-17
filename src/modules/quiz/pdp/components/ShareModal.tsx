import { BottomModal } from '@/components/BottomModal';
import { axiosClient } from '@/configs/axios';
import {
  Button,
  Center,
  HStack,
  Img,
  Spinner,
  useClipboard,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Copy } from 'solar-icon-set';
import { useSelectedQuiz } from '../../hooks';

interface ShareModalProps extends UseDisclosureProps {}
export const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const { query } = useRouter();

  const sharableLink = `https://t.me/Witswinbot/WebApp?startapp=page_quiz_${query?.id}`;

  const [isShareSupport, setShareSupport] = useState(false);
  const { hasCopied, onCopy } = useClipboard(sharableLink);
  const [qrCodeImg, setQrCodeImg] = useState('');

  const data = useSelectedQuiz();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      axiosClient
        .get(`/quiz/competition/${query?.id}/qr-code/`, {
          responseType: 'blob',
        })
        .then((res) => res.data)
        .then((res) => {
          const imageUrl = URL.createObjectURL(res);
          console.log({ imageUrl, res });

          setQrCodeImg(imageUrl);
          const file = new File([res], 'qrcode.png', { type: 'image/png' });

          if (navigator.share) {
            navigator.share({
              title: data?.title,
              url: sharableLink,
              files: [file],
            });
            setShareSupport(true);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  return (
    <BottomModal title="Share quiz" isOpen={isOpen} onClose={onClose}>
      <Center>
        {isLoading ? (
          <Spinner />
        ) : (
          <Img src={qrCodeImg} width="276px" height="276px" />
        )}
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
