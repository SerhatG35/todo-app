import { Card } from 'global';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

const useCardState = () => {
  const [userCard, setUserCard] = useState<Card[]>([]);
  const cards = useSelector((state: RootState) => state.cardsSlice.userCards);

  useEffect(() => {
    setUserCard(cards);
  }, [cards]);

  return userCard;
};

export default useCardState;
