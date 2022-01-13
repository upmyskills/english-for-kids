import { appState } from '../../core/appState';
import { SmileView } from './SmileView';
import './smile.scss';
import { dropCards, followMenu, loadDefault } from '../../core/services';

class Smile {
  smileView = new SmileView();

  constructor() {
    appState.getEndStore().subscribe(this.update.bind(this));
    this.smileView.component.addEventListener('click', () => {
      this.smileView.remove();

      appState.getStore().dispatch(loadDefault());
      appState.getStore().dispatch(followMenu('main menu'));
      appState.getMainContainerStore().dispatch(dropCards());
    });
  }

  update(): void {
    const wrongAnswers = appState.getWrongAnswers();
    const isGameEnded = appState.checkEndGame();
    const imageComponent = this.smileView.image.component;

    if (!isGameEnded) return;

    imageComponent.classList.remove('bad-smile');
    imageComponent.classList.remove('good-smile');

    this.smileView.text.component.innerText = `${wrongAnswers} wrong awswers!`;

    if (wrongAnswers) imageComponent.classList.add('bad-smile');
    else imageComponent.classList.add('good-smile');
  }
}

export { Smile };
