export const Input = {
  variants: {
    outline: {
      field: {
        fontSize: 'md',
        fontWeight: '500',
        border: '1px solid',
        color: 'gray.80',
        borderColor: 'gray.400',
        background: 'glassBackground',
        borderRadius: '8px',
        _focus: {
          borderColor: 'blue',
          color: 'gray.0',
        },
        _invalid: {
          borderColor: 'red.300',
          color: 'gray.0',
        },
        _placeholder: {
          color: 'gray.80',
        },
      },
    },
  },
};
