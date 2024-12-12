import { createStandaloneToast } from '@chakra-ui/react';
import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const { toast } = createStandaloneToast();

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 500) {
        toast({
          title: 'Server Error',
          description: 'Something went wrong. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else if (status === 502) {
        toast({
          title: 'Bad Gateway',
          description:
            'The server is temporarily unavailable. Please try again later.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Network Error',
        description:
          'Unable to connect to the server. Please check your internet connection.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    return Promise.reject(error);
  },
);
