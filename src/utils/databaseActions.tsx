import { Card } from 'global';
import { Auth } from 'src/service/axios';
import CardComponent from '../components/CardComponent';
import { toaster } from './toaster';

type AddNewCardTypes = {
  valid?: boolean;
  cardJsx: JSX.Element[];
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  setCardJsx: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
};

type DatabaseCardsToStateTypes = {
  receivedUserCards: Card[];
};

export const addNewCard = ({
  valid,
  cardJsx,
  cards,
  setCards,
  setValid,
  setCardJsx,
}: AddNewCardTypes) => {
  const updateCardsJsx: JSX.Element[] = [...cardJsx];
  if (valid) {
    updateCardsJsx.unshift(
      <CardComponent
        cards={cards}
        setCards={setCards}
        setValid={setValid}
        key={updateCardsJsx.length}
      />
    );
    setCardJsx(updateCardsJsx);
  } else toaster('Please fill the title', '', 'warning');
};

export const updateDatabase = async (cards: Card[], loggedUser: any) => {
  const { data } = await Auth.updateDatabase({
    id: loggedUser.user.id,
    username: loggedUser?.user?.userName,
    cards: cards,
  });
  console.log(data);
};

export const databaseCardsToState = ({
  cardJsx,
  receivedUserCards,
  cards,
  setCards,
  setValid,
  setCardJsx,
}: DatabaseCardsToStateTypes & AddNewCardTypes) => {
  const updateCards: JSX.Element[] = [...cardJsx];
  receivedUserCards?.forEach((card) => {
    updateCards.unshift(
      <CardComponent
        cards={cards}
        setCards={setCards}
        setValid={setValid}
        key={updateCards.length}
        receivedCards={card}
      />
    );
  });
  setCards(receivedUserCards);
  setCardJsx(updateCards);
};
