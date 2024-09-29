import { Text, TextProps } from "@chakra-ui/react";

interface ColorFullTextProps extends TextProps {
  textContent: string;
  gradientColor?: string;
}
export const ColorFullText = ({
  textContent,
  gradientColor,
  ...rest
}: ColorFullTextProps) => {
  return (
    <Text
      px="2px"
      position="relative"
      sx={{
        WebkitTextStroke: "5px transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundImage:
          gradientColor ?? "linear-gradient(to top,#63C6E1,#9227FF)",
        WebkitTextStrokeWidth: "5px",
        WebkitTextStrokeColor:
          gradientColor ?? "linear-gradient(to top,#63C6E1,#9227FF)",
        "-webkit-text-fill-color": "white",
      }}
      fontWeight="700"
      fontFamily="Kanit"
      {...rest}
    >
      {textContent}
    </Text>
  );
};
