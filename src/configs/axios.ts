import { createStandaloneToast } from '@chakra-ui/react';
import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const { toast } = createStandaloneToast();

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 500) {
      toast({
        title: 'Server Error',
        description: 'An unexpected error occurred. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    return Promise.reject(error);
  },
);
