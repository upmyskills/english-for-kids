import { appState } from '../../core/appState';
import { StarPanelView } from './StarPanelView';
import { StarView } from './StarView';

class StarPanel {
  starPanelView = new StarPanelView();

  constructor() {
    appState.getGameResultStore().subscribe(this.updateAnswers.bind(this));
    appState.getStore().subscribe(this.updateAnswers.bind(this));
  }

  updateAnswers(): void {
    const answers = appState.getAnswers();
    const arr = [...answers];

    this.starPanelView.area.clear();
    arr.reverse().forEach((answer) => {
      this.starPanelView.area.insertComponent(new StarView(answer));
    });
  }
}

export { StarPanel };
