import { BaseComponent } from '../../shared/components/BaseComponent';
import './styles.scss';

class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);
    const container = new BaseComponent('div', ['footer-container']);
    const linkToGH = new BaseComponent('a', ['github']);
    const span = new BaseComponent('span', ['rss-year']);
    const linkToRSS = new BaseComponent('a', ['rss']);

    linkToGH.component.setAttribute('href', 'https://github.com/upmyskills');
    linkToGH.component.setAttribute('target', '_blank');
    linkToRSS.component.setAttribute('href', 'https://rs.school/js/');
    linkToRSS.component.setAttribute('target', '_blank');
    span.component.innerHTML = '&copy; 2021';

    container.insertComponent(linkToGH);
    container.insertComponent(span);
    container.insertComponent(linkToRSS);

    this.insertComponent(container);
  }
}

export { Footer };
