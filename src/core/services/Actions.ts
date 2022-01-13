import { CardView } from '../../components/Card/CardView';
import { ICard } from '../models';

interface IType {
  type: string,
  cardsItems?: Array<ICard>,
  menuItem?: string,
  answer?: CardView,
  secret?: ICard,
  hiddenWords?: Array<CardView>,
  guessWord?: CardView,
  wrong?: number
}

export const switchMode = (): IType => ({
  type: 'SWITCH_MODE',
});

export const switchMenu = (): IType => ({
  type: 'SWITCH_MENU',
});

export const followMenu = (menuItem: string): IType => ({
  type: 'FOLLOW_MENU',
  menuItem
});

export const loadCards = (cardsList: Array<ICard>): IType => ({
  type: 'LOAD_CARDS',
  cardsItems: cardsList
});

export const dropCards = (): IType => ({
  type: 'LOAD_CARDS',
  cardsItems: []
});

export const changeGameStatus = (): IType => ({
  type: 'CHANGE_GAME_STATUS',
});

export const takeAnswer = (answer: CardView): IType => ({
  type: 'TAKE_ANSWER',
  answer
});

export const setSecretWord = (secret: ICard): IType => ({
  type: 'SET_SECRET_WORD',
  secret
});

export const setHiddenWords = (items: Array<CardView>): IType => ({
  type: 'SET_HIDDEN_CARDS',
  hiddenWords: items
});

export const moveToGuessWords = (): IType => ({
  type: 'MOVE_TO_GUESS_WORDS',
});

export const recordAnswer = (): IType => ({
  type: 'RECORD_ANSWER',
});

export const loadDefault = (): IType => ({
  type: 'LOAD_DEFAULT',
});

export const setEndGame = (wrong: number): IType => ({
  type: 'SET_END_GAME',
  wrong
});
