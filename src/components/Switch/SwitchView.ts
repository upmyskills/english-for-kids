import { BaseComponent } from '../../shared/components/BaseComponent';
import './switch.scss';

class SwitchView extends BaseComponent {
  checkbox = new BaseComponent('input', ['switch-input']);
  slider = new BaseComponent('span', ['switch-slider']);
  text = new BaseComponent('span', ['switch-text']);

  constructor() {
    super('label', ['switch']);

    this.checkbox.component.setAttribute('type', 'checkbox');

    super.insertComponent(this.checkbox);
    super.insertComponent(this.slider);
    super.insertComponent(this.text);
  }
}

export { SwitchView };
