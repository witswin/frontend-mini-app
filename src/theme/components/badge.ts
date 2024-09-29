export const Badge = {
  sizes: {
    xs: {
      height: "7px",
      lineHeight: "7px",
      fontSize: "1px",
      fontWight: 600,
    },
    sm: {
      height: "20px",
      lineHeight: "20px",
      fontSize: "13px",
      fontWight: 600,
    },
    md: {
      height: "24px",
      lineHeight: "24px",
      fontSize: "15px",
      fontWight: 600,
    },
  },
  variants: {
    primary: {
      rounded: "full",
      bg: "var(--chakra-colors-primaryRadial)",
      color: "gray.0",
    },
    ghost: {
      color: "gray.0",
    },
    red: {
      rounded: "full",
      bg: "var(--chakra-colors-redRadial)",
      color: "gray.0",
    },
    green: {
      rounded: "full",
      bg: "var(--chakra-colors-greenRadial)",
      color: "gray.0",
    },
  },
};
