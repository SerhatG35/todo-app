import { createStandaloneToast } from '@chakra-ui/react';
const toast = createStandaloneToast();

export const toaster = (
  title: string,
  description: string,
  status: 'error' | 'success' | 'warning'
) => {
  toast({
    title,
    description,
    status,
    duration: 2000,
    isClosable: true,
  });
};
