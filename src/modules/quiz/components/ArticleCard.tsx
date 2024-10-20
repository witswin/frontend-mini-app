import { Card } from "@/components/Card";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { DoubleAltArrowRight } from "solar-icon-set";

interface ArticleCardProps {
  header?: {
    img: string;
    title: string;
    CTAText: string;
    CTAAction: () => void;
  };
  banner: string;
  link: string;
  linkText: string;
  articleTitle: string;
  content: string;
}
export const ArticleCard = ({
  header,
  banner,
  link,
  linkText,
  articleTitle,
  content,
}: ArticleCardProps) => {
  return (
    <VStack
      width="full"
      as="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card rowGap="16px">
        {!!header && (
          <HStack width="full" justifyContent="space-between">
            <HStack>
              <Image
                src={header.img}
                alt=""
                width={32}
                height={32}
                style={{
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: "gray.400",
                }}
              />
              <Text fontWeight="700" fontSize="sm" color="gray.20">
                {header.title}
              </Text>
            </HStack>
            <Button
              onClick={(e) => {
                e.preventDefault();
                header.CTAAction();
              }}
              rightIcon={
                <DoubleAltArrowRight
                  iconStyle="LineDuotone"
                  color="var(--chakra-colors-blue)"
                  size={16}
                />
              }
              variant="ghost"
              size="mini"
            >
              {header.CTAText}
            </Button>
          </HStack>
        )}
        <Image src={banner} width={380} height={250} alt="" />
        <VStack width="full" rowGap="8px">
          <Text width="full" textAlign="left" color="gray.60" fontSize="sm">
            {linkText}
          </Text>
          <Text
            width="full"
            textAlign="left"
            color="gray.20"
            fontSize="lg"
            fontWeight="700"
          >
            {articleTitle}
          </Text>
          <Text
            noOfLines={2}
            color="gray.60"
            fontSize="md"
            lineHeight="22px"
            fontWeight="500"
            width="full"
          >
            {content}
          </Text>
        </VStack>
      </Card>
    </VStack>
  );
};
