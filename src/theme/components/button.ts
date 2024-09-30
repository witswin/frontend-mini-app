export const Button = {
  defaultProps: {
    fontFamily: "Montserrat",
  },
  sizes: {
    sm: {
      fontSize: "sm",
      fontWeight: "600",
      lineHeight: "20px",
      borderRadius: "8px",
      height: "36px",
      _before: {
        borderRadius: "8px",
      },
    },
    md: {
      fontSize: "15px",
      fontWeight: "600",
      lineHeight: "22px",
      borderRadius: "12px",
      _before: {
        borderRadius: "12px",
      },
      height: "42px",
    },
    lg: {
      fontSize: "17px",
      fontWeight: "600",
      lineHeight: "26px",
      borderRadius: "12px",
      _before: {
        borderRadius: "12px",
      },
      height: "50px",
    },
  },
  variants: {
    outline: {
      backgroundColor: "gray.900",
      color: "gray.20",
      position: "relative",
      border: "none",
      _before: {
        content: "''",
        position: "absolute",
        top: "-1px",
        left: "-1px",
        right: "-1px",
        height: "calc(100% + 3px)",
        width: "calc(100% + 2px)",
        background: "var(--chakra-colors-primaryRadial)",
        zIndex: -1,
      },
    },
    solid: {
      bg: "var(--chakra-colors-primaryRadial)",
      color: "gray.20",
      _before: {
        content: "''",
        position: "absolute",
        top: "-0px",
        left: "-1px",
        right: "-1px",
        height: "calc(100% + 2px)",
        width: "calc(100% + 2px)",
        background: "var(--chakra-colors-cyan)",
        zIndex: -1,
      },
    },
    gray: {
      backgroundColor: "gray.500",
      color: "gray.20",
      position: "relative",
      border: "none",
      _before: {
        content: "''",
        position: "absolute",
        top: "-1px",
        left: "-1px",
        right: "-1px",
        height: "calc(100% + 3px)",
        width: "calc(100% + 2px)",
        background: "gray.400",
        zIndex: -1,
      },
    },
    ghost: {
      background: "transparent",
      backgroundImage: "var(--chakra-colors-primaryLinear)",
      backgroundClip: "text",
    },
  },
};
