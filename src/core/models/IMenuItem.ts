import { ICard } from './ICard';

export interface IMenuItem {
  title: string,
  menu: HTMLElement,
  href?: string
  cards: Array<ICard>
}
