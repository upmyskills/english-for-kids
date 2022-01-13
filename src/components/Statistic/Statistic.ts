import { BaseComponent } from '../../shared/components/BaseComponent';
import { StatisticView } from './StatisticView';
import { API_SERVER } from '../../shared/constants';
import './styles.scss';

interface IStatisticParams {
  word: string,
  translation: string,
  audioSrc: string,
  count: number,
  correct: number,
  wrong: number
}

class Statistic {
  isLoading = false;
  statisticView = new StatisticView();
  allWords: Array<IStatisticParams> = [];

  constructor() {
    this.createHeader();
    this.getData().then(this.generateTable.bind(this));
  }

  sortByWordUp(): void {
    this.allWords.sort((a, b) => a.word.localeCompare(b.word));
    this.render();
  }

  sortByWordDown(): void {
    this.sortByWordUp();
    this.allWords.reverse();
    this.render();
  }

  async update(): Promise<void> {
    await this.getData();
    this.render();
  }

  render(): void {
    this.statisticView.clear();
    this.createHeader();
    this.generateTable();
  }

  async getData(): Promise<void> {
    const req = await fetch(`${API_SERVER}/load`);
    this.allWords = await req.json();
  }

  generateTable(): void {
    this.allWords.forEach((item: IStatisticParams) => {
      this.createItem(item);
    });
  }

  createHeader(): void {
    const li = new BaseComponent('li', ['statistic__item', 'table-header']);
    const divWord = new BaseComponent('div', ['item-header__word']);
    const sortWordsUp = new BaseComponent('div', ['item-header__sort-up']);
    const sortWordsDown = new BaseComponent('div', ['item-header__sort-down']);
    divWord.insertComponent(sortWordsUp);
    divWord.insertComponent(sortWordsDown);
    this.addSortRules(divWord.component);

    const divTranslate = new BaseComponent('div', ['item-header__translate']);
    const sortTranslateUp = new BaseComponent('div', ['item-header__sort-up']);
    const sortTranslateDown = new BaseComponent('div', ['item-header__sort-down']);
    divTranslate.insertComponent(sortTranslateUp);
    divTranslate.insertComponent(sortTranslateDown);
    this.addSortRules(divTranslate.component);

    const divCount = new BaseComponent('div', ['item-header__count']);
    const sortCountUp = new BaseComponent('div', ['item-header__sort-up']);
    const sortCountDown = new BaseComponent('div', ['item-header__sort-down']);
    divCount.insertComponent(sortCountUp);
    divCount.insertComponent(sortCountDown);
    this.addSortRules(divCount.component);

    const divCorrect = new BaseComponent('div', ['item-header__correct']);
    const sortCorrectUp = new BaseComponent('div', ['item-header__sort-up']);
    const sortCorrectDown = new BaseComponent('div', ['item-header__sort-down']);
    divCorrect.insertComponent(sortCorrectUp);
    divCorrect.insertComponent(sortCorrectDown);
    this.addSortRules(divCorrect.component);

    const divWrong = new BaseComponent('div', ['item-header__wrong']);
    const sortWrongUp = new BaseComponent('div', ['item-header__sort-up']);
    const sortWrongDown = new BaseComponent('div', ['item-header__sort-down']);
    divWrong.insertComponent(sortWrongUp);
    divWrong.insertComponent(sortWrongDown);
    this.addSortRules(divWrong.component);

    const divpercent = new BaseComponent('div', ['item-header__percent']);
    const sortpercentUp = new BaseComponent('div', ['item-header__sort-up']);
    const sortpercentDown = new BaseComponent('div', ['item-header__sort-down']);
    divpercent.insertComponent(sortpercentUp);
    divpercent.insertComponent(sortpercentDown);
    this.addSortRules(divpercent.component);

    li.insertComponent(divWord);
    li.insertComponent(divTranslate);
    li.insertComponent(divCount);
    li.insertComponent(divCorrect);
    li.insertComponent(divWrong);
    li.insertComponent(divpercent);

    this.statisticView.insertComponent(li);
  }

  addSortRules(element: HTMLElement): void {
    element.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      const [sortBy] = element.classList.value.split('__').slice(1);
      const [direction] = target.classList.value.split('__').slice(1);

      if (direction === 'sort-up' || direction === 'sort-down') {
        const template = `?sortBy=${sortBy}&direction=${direction}`;
        const response = await fetch(`${API_SERVER}/sort${template}`);
        this.allWords = await response.json();
      }
      this.render();
    });
  }

  createItem(params: IStatisticParams): void {
    const percent = ((100 / ((params.wrong + params.correct) || 1)) * params.correct).toFixed(1);
    const li = new BaseComponent('li', ['statistic__item']);
    const divWord = new BaseComponent('div', ['item__word']);
    const divTranslate = new BaseComponent('div', ['item__translate']);
    const divCount = new BaseComponent('div', ['item__count']);
    const divCorrect = new BaseComponent('div', ['item__correct']);
    const divWrong = new BaseComponent('div', ['item__wrong']);
    const divpercent = new BaseComponent('div', ['item__percent']);

    divWord.component.append(params.word);
    divTranslate.component.append(params.translation);
    divCount.component.append(params.count.toString());
    divCorrect.component.append(params.correct.toString());
    divWrong.component.append(params.wrong.toString());
    divpercent.component.append((percent).toString());

    li.insertComponent(divWord);
    li.insertComponent(divTranslate);
    li.insertComponent(divCount);
    li.insertComponent(divCorrect);
    li.insertComponent(divWrong);
    li.insertComponent(divpercent);

    this.statisticView.insertComponent(li);
  }
}

export { Statistic };
