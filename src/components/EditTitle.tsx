import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  useDisclosure,
  Input,
  Text,
  ButtonGroup,
  Button,
  Center,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { changeTitle } from 'src/redux/cardsSlice';
import { toaster } from 'src/utils/toaster';

type EditTitleTypes = {
  currentTitle: string;
};

const EditTitle = ({ currentTitle }: EditTitleTypes) => {
  const newTitleRef = useRef<HTMLInputElement>(null);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const cards = useAppSelector((state) => state.cardsSlice.userCards);
  const dispatch = useAppDispatch();

  const saveEdit = () => {
    if (newTitleRef.current && newTitleRef.current?.value !== '') {
      if (newTitleRef.current.value.length > 30) {
        newTitleRef.current.value = '';
        return toaster('', 'Maximum 30 character is allowed', 'warning');
      }
      dispatch(changeTitle(cards, currentTitle, newTitleRef.current.value));
    }
  };

  return (
    <Center>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement='top'
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <IconButton
            position='absolute'
            top='1'
            right={['0.5', '1.5', '0.5']}
            _focus={{ boxShadow: 'none' }}
            size='xs'
            fontSize='2xl'
            justifySelf='end'
            colorScheme='teal'
            aria-label='edit title'
            icon={<AiFillEdit />}
          />
        </PopoverTrigger>
        <PopoverContent
          p={5}
          _focus={{ boxShadow: 'none' }}
          w={['275px', '200px', '250px', '300px', '300px']}
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <Text textAlign='center'>Change Title</Text>
          <Input ref={newTitleRef} defaultValue={currentTitle} />
          <ButtonGroup mt='3' d='flex' justifyContent='flex-end'>
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => saveEdit()} colorScheme='teal'>
              Save
            </Button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
    </Center>
  );
};

export default EditTitle;
