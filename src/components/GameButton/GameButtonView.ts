import { BaseComponent } from '../../shared/components/BaseComponent';
import './gamebutton.scss';

class GameButtonView extends BaseComponent {
  constructor() {
    super('button', ['btn', 'btn-large', 'btn-warning', 'btn-game']);
  }
}

export { GameButtonView };
