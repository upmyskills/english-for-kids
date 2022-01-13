import { ICard } from '../../core';
import { BaseComponent } from '../../shared/components/BaseComponent';

class CardMenuView extends BaseComponent {
  constructor(title: string, item: ICard) {
    super('div', ['menu__item']);
    const img = new BaseComponent('div', ['menu__image']);
    const label = new BaseComponent('span', ['menu__title', 'menu__link']);

    img.component.style.cssText = `
      background: url(./${item.image}) center no-repeat;
      background-size: cover;
    `;
    label.component.innerText = title;

    this.insertComponent(img);
    this.insertComponent(label);
  }
}

export { CardMenuView };
