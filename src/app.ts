import { Router } from './core/services/Router';
import './assets/mainstyles.scss';

class App {
  router: Router;

  constructor(
    private rootElement: HTMLElement,
  ) {
    this.router = new Router(rootElement);
    window.onpopstate = () => this.routeTo();
  }

  init(): void {
    this.routeTo();
  }

  routeTo(): void {
    this.router.checkRoute();
  }
}

export default App;
