import { BaseComponent } from '../../shared/components/BaseComponent';

class StarView extends BaseComponent {
  constructor(isCorrect: boolean) {
    super('div', ['star-panel__star']);
    if (!isCorrect) this.component.classList.add('wrong');
    if (isCorrect) this.component.classList.add('correct');
  }
}

export { StarView };
