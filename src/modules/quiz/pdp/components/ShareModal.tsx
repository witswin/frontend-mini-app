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
import { useEffect, useState } from 'react';
import { Copy } from 'solar-icon-set';
import { quizType } from '@/globalTypes';

interface ShareModalProps extends UseDisclosureProps {
  quiz: quizType;
}
export const ShareModal = ({ isOpen, onClose, quiz }: ShareModalProps) => {
  const sharableLink = `https://t.me/Witswinbot/WebApp?startapp=page_quiz_${quiz?.id}`;

  const [isShareSupport, setShareSupport] = useState(false);
  const { hasCopied, onCopy } = useClipboard(sharableLink);
  const [qrCodeImg, setQrCodeImg] = useState('');
  const [imageBlob, setImageBlob] = useState('');

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.share) {
      setShareSupport(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      axiosClient
        .get(`/quiz/competition/${quiz?.id}/qr-code/`, {
          responseType: 'blob',
        })
        .then((res) => res.data)
        .then((res) => {
          const imageUrl = URL.createObjectURL(res);

          setQrCodeImg(imageUrl);
          setImageBlob(res);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  const handleShare = () => {
    const file = new File([imageBlob], 'qrcode.png', { type: 'image/png' });

    if (navigator.canShare({ files: [file] })) {
      const shareData = {
        text: `${quiz?.title} ${quiz?.details} ${sharableLink}`,
        files: [file],
      };

      navigator.share(shareData);
    } else {
      const shareData = {
        text: `${quiz?.title} ${quiz?.details} ${sharableLink}`,
      };

      navigator.share(shareData);
    }
  };

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
              handleShare();
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
