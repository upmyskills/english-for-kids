import { ICard } from '../../core';
import { BaseComponent } from '../../shared/components/BaseComponent';
import './card.scss';

class CardView extends BaseComponent {
  cardItem = new BaseComponent('div', ['card__item']);
  controlPanel: BaseComponent = new BaseComponent('div', ['card__panel']);
  background: BaseComponent = new BaseComponent('div', ['card__image']);
  flip = new BaseComponent('div', ['card__flip']);
  audio = new Audio();
  word = new BaseComponent('div', ['card__word']);
  translate = new BaseComponent('div', ['card__word', 'translate']);
  shortCardInfo: ICard;
  isEnglish = true;

  constructor(
    private card: ICard
  ) {
    super('div', ['card__container']);
    this.shortCardInfo = card;

    this.audio.setAttribute('src', card.audioSrc);

    this.word.component.innerText = this.card.word;
    this.translate.component.innerText = this.card.translation;

    this.background.component.style.cssText = `
      background: url(${this.card.image});
      background-position: top;
      background-size: cover;
      background-repeat: no-repeat;
    `;

    this.controlPanel.insertComponent(this.word);
    this.controlPanel.insertComponent(this.flip);

    this.cardItem.insertComponent(this.background);
    this.cardItem.insertComponent(this.controlPanel);
    this.insertComponent(this.cardItem);
  }
}

export { CardView };
