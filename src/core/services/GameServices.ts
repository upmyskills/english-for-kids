import shufle from 'lodash/shuffle';
import { CardView } from '../../components/Card/CardView';
import { appState } from '../appState/AppState';
import { setEndGame, setSecretWord } from './Actions';
import { API_SERVER } from '../../shared/constants';

class GameServices {
  positiveSound = new Audio('./sounds/positive.mp3');
  negativeSound = new Audio('./sounds/negative.mp3');
  currentCards: Array<CardView> = shufle(appState.getHiddenWords());

  constructor() {
    appState.getGameResultStore().subscribe(this.answerHandler.bind(this));
  }

  init(): void {
    this.currentCards = shufle(appState.getHiddenWords());
    this.gameLoop();
  }

  answerHandler(): void {
    if (!appState.getLastAnswer()) return;
    const isCorrect = appState.getLastAnswer().shortCardInfo.word === appState.getSecretWord();
    const currentCard = appState.getLastAnswer().cardItem.component;

    this.saveToServer(appState.getSecretWord(), isCorrect);

    const sound = isCorrect ? this.positiveSound : this.negativeSound;
    this.playPromise(sound, 0);

    if (isCorrect) {
      currentCard.classList.add('correct');
      setTimeout(() => {
        currentCard.classList.remove('correct');
        currentCard.classList.add('guessed');
        this.getNextMove();
      }, 200);
    } else {
      currentCard.classList.add('wrong');
      setTimeout(() => {
        currentCard.classList.remove('wrong');
      }, 200);
    }
  }

  saveToServer(word: string, isCorrect: boolean): void {
    fetch(`${API_SERVER}/checkanswer?word=${word}&correct=${Number(isCorrect)}`);
  }

  getNextMove(): void {
    const isOver = appState.getHiddenWords().length === appState.getGuessedWords().length;
    if (!isOver) this.gameLoop();
    if (isOver) {
      this.endGame();
    }
  }

  endGame(): void {
    const allAnswers = appState.getAnswers();
    const wrong = allAnswers.filter((ans) => !ans);

    appState.getEndStore().dispatch(setEndGame(wrong.length));
  }

  async playPromise(sound: HTMLAudioElement, timeout: number): Promise<void> {
    sound.currentTime = 0;
    const onEndedAudio: Promise<void> = new Promise((res, rej) => {
      sound.preload = 'auto';
      setTimeout(() => sound.play(), timeout);
      sound.addEventListener('ended', () => res);
      sound.addEventListener('error', rej);
    });

    return onEndedAudio;
  }

  gameLoop(): void {
    const [secret] = this.currentCards;
    if (this.currentCards.length < 1) return;
    this.currentCards = [...this.currentCards.slice(1)];
    appState.getGameStore().dispatch(setSecretWord(secret.shortCardInfo));

    const audio = appState.getSecretWordSound();
    this.playPromise(audio, 700);
  }
}

export { GameServices };
