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
import { TodoType } from 'global';
import { useRef } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { changeTodo } from 'src/service/functions';

type EditTodoTypes = {
  todo: string;
  todos: TodoType[];
  index: number;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  active: boolean;
};

const EditTodo = ({ todo, todos, index, setTodos, active }: EditTodoTypes) => {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const saveEdit = () => {
    if (newTodoRef.current) {
      changeTodo(todos, index, setTodos, newTodoRef.current.value);
      onClose();
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
            isDisabled={active}
            ml='2'
            _focus={{ boxShadow: 'none' }}
            _hover={{
              backgroundColor: 'none',
              opacity: '0.4',
            }}
            colorScheme='teal'
            size='xs'
            fontSize='2xl'
            icon={<AiFillEdit />}
            aria-label='edit todo'
          />
        </PopoverTrigger>
        <PopoverContent
          p={5}
          _focus={{ boxShadow: 'none' }}
          w={['275px', '200px', '250px', '300px', '300px']}
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <Text textAlign='center'>Change Todo</Text>
          <Input my='3' ref={newTodoRef} defaultValue={todo} />
          <ButtonGroup d='flex' justifyContent='flex-end'>
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

export default EditTodo;
