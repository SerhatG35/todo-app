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
} from '@chakra-ui/react';

import { TodoType } from 'global';

import { useRef } from 'react';
import { AiFillEdit } from 'react-icons/ai';

type TodoEditTypes = {
  todo: string;
  todos: TodoType[];
  index: number;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const TodoEdit = ({ todo, todos, index, setTodos }: TodoEditTypes) => {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const saveEdit = () => {
    if (newTodoRef.current) {
      const value = newTodoRef.current?.value;
      const temp = [...todos];
      temp.forEach((changeTodo, i) => {
        if (i === index) {
          const updateTodo = { ...changeTodo };
          updateTodo.todo = value;
          temp[i] = updateTodo;
        }
      });
      setTodos(temp);
      onClose();
    }
  };

  return (
    <Popover
      isLazy={true}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement='top'
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <IconButton
          variant='outline'
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
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <Text textAlign='center'>Change Todo</Text>
        <Input ref={newTodoRef} defaultValue={todo} />
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
  );
};

export default TodoEdit;
