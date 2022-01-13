import { ICard } from './ICard';

export interface IMenuItemsResponse {
  menuItems: Array<{
    linkName: string,
    cards: Array<ICard>,
  }>
}
