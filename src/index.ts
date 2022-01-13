import App from './app';
import './assets/mainstyles.scss';
import './assets/bootstrap.css';

const rootElement: HTMLElement = document.querySelector('#root') || document.createElement('div');
const app = new App(rootElement);

window.onload = () => {
  app.init();
};
