import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from '@chakra-ui/react';
import { AiOutlineExclamationCircle, AiOutlineCheck } from 'react-icons/ai';
import { ImSortAlphaAsc } from 'react-icons/im';
import { BiSortDown } from 'react-icons/bi';

import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { orderCards, setCardOrder } from 'src/redux/cardsSlice';

const OrderButton = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cardsSlice.userCards);

  return (
    <Menu closeOnSelect={false} isLazy>
      <MenuButton
        sx={{
          '@media screen and (max-width: 768px)': {
            position: 'absolute',
            left: '4',
            top: '4',
            marginTop: '0',
          },
        }}
        mt='2'
        as={IconButton}
        aria-label='menu button'
        fontSize='x-large'
        icon={<BiSortDown />}
        _focus={{ boxShadow: 'none' }}
        size='sm'
        bg='transparent'
      />
      <MenuList zIndex='2000'>
        <MenuOptionGroup
          onChange={(value) => {
            dispatch(orderCards({ value, cards }));
            dispatch(setCardOrder(value));
          }}
          defaultValue='none'
          type='radio'
          title='Placement'
        >
          <MenuItemOption icon={<AiOutlineCheck size='20' />} value='none'>
            None
          </MenuItemOption>
          <MenuDivider />
          <MenuItemOption
            icon={<ImSortAlphaAsc size='20' />}
            zIndex='2000'
            value='alphabetically'
          >
            Alphabetically
          </MenuItemOption>
          <MenuItemOption
            icon={<AiOutlineExclamationCircle size='20' />}
            zIndex='2000'
            value='importance'
          >
            Importance
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default OrderButton;
