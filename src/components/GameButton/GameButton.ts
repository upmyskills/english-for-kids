import { changeGameStatus } from '../../core/services';
import { appState } from '../../core/appState';
import { GameButtonView } from './GameButtonView';

class GameButton {
  buttonStart = new GameButtonView();
  buttonRepeat = new GameButtonView();

  constructor() {
    this.buttonStart.component.append('Start game');
    this.buttonStart.component.addEventListener('click', () => {
      appState.getButtonStore().dispatch(changeGameStatus());
    });

    this.buttonRepeat.component.append('Repeat');
    this.buttonRepeat.component.addEventListener('click', () => {
      const secretWord = appState.getSecretWordSound();
      secretWord.play();
    });
  }
}

export { GameButton };
