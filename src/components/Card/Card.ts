import { CardView } from './CardView';
import { ICard } from '../../core/models';
import { appState } from '../../core/appState';
import { BaseComponent } from '../../shared/components/BaseComponent';
import { setHiddenWords, takeAnswer } from '../../core/services';
import { API_SERVER } from '../../shared/constants';

class Card {
  private items: Array<CardView> = [];
  private isPlayNow = false;

  constructor() {
    this.update();

    appState.getStore().subscribe(this.update.bind(this));
    appState.getMainContainerStore().subscribe(this.renewCards.bind(this));
  }

  translate(card: CardView, event: Event): void {
    event.stopPropagation();
    if (card.isEnglish) {
      card.component.classList.add('flipped');
      card.component.addEventListener('transitionend', () => {
        card.word.remove();
        card.controlPanel.insertComponent(card.translate);
      }, { once: true });
    }

    card.component.addEventListener('mouseleave', () => {
      card.component.classList.remove('flipped');
      card.component.addEventListener('transitionend', () => {
        card.translate.remove();
        card.controlPanel.insertComponent(card.word);
      }, { once: true });
      card.isEnglish = !card.isEnglish;
    }, { once: true });

    card.isEnglish = !card.isEnglish;
  }

  giveAnswer(card: CardView): void {
    const isGuessed = appState.getGuessedWords().includes(card);

    if (!appState.getGameStatus() || isGuessed) return;

    appState.getGameResultStore().dispatch(takeAnswer(card));
  }

  playSound(card: CardView): void {
    if (card.component.classList.contains('flipped') || this.isPlayNow) return;

    if (appState.getAppMode()) {
      const soundPromise = new Promise((res, rej) => {
        card.audio.preload = 'auto';
        this.isPlayNow = true;
        card.audio.play();
        card.audio.onerror = rej;
        card.audio.onended = res;
      });

      soundPromise.then(() => {
        this.isPlayNow = false;
      });
    }
  }

  update(): void {
    const isTrainMode = appState.getAppMode();

    if (isTrainMode) {
      this.items.forEach((card: CardView) => {
        card.cardItem.component.classList.remove('guessed');
        card.cardItem.component.classList.add('train');
        card.cardItem.insertComponent(card.controlPanel);
      });
    } else {
      this.items.forEach((card: CardView) => {
        card.cardItem.component.classList.remove('train');
        card.controlPanel.remove();
      });
    }
  }

  renewCards(): void {
    const cards = appState.getCurrentCards();
    if (cards) {
      this.items = cards.map((item: ICard): CardView => {
        const newCard = new CardView(item);
        newCard.flip.component.addEventListener('click', this.translate.bind(this, newCard));
        newCard.component.addEventListener('click', this.giveAnswer.bind(this, newCard));
        newCard.component.addEventListener('click', this.saveToServer.bind(this, newCard.shortCardInfo));
        newCard.component.addEventListener('click', this.playSound.bind(this, newCard));
        return newCard;
      });
      appState.getGameStore().dispatch(setHiddenWords(this.items));
    }
  }

  saveToServer(card: ICard): void {
    if (appState.getAppMode() && !this.isPlayNow) {
      const template = `train?word=${card.word}&translation=${card.translation}&audioSrc=${card.audioSrc}&image=${card.image}`;
      fetch(`${API_SERVER}/${template}`);
    }
  }

  render(rootContainer: BaseComponent): void {
    this.update();
    this.items.map((item: CardView) => rootContainer.component.appendChild(item.getTemplate()));
  }
}

export { Card };
