export const Tag = {
  sizes: {
    sm: {
      container: {
        fontWeight: 600,
        fontSize: "10px",
        height: "24px",
        borderRadius: "4px",
        _before: {
          borderRadius: "4px",
        },
      },
    },
    md: {
      container: {
        fontWeight: 600,
        fontSize: "13px",
        height: "32px",
        borderRadius: "6px",
        _before: {
          borderRadius: "6px",
        },
      },
    },
    lg: {
      container: {
        fontWeight: 600,
        fontSize: "16px",
        height: "40px",
        borderRadius: "8px",
        _before: {
          borderRadius: "8px",
        },
      },
    },
  },
  variants: {
    gray: {
      container: {
        border: "1px solid",
        color: "gray.40",
        borderColor: "gray.400",
      },
    },
    colored: {
      container: {
        color: "gray.40",
        backgroundColor: "gray.900",
        position: "relative",
        _before: {
          content: "''",
          top: "-1px",
          left: "-1px",
          right: "-1px",
          bottom: "-1px",
          position: "absolute",
          bg: "var(--chakra-colors-primaryRadial)",
          width: "calc(100% + 2px )",
          height: "calc(100% + 2px)",
          zIndex: "-1",
        },
      },
    },
    ghost: {
      container: {
        color: "gray.40",
      },
    },
  },
};
