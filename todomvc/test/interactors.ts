import { perform, createInteractor, fillIn } from 'bigtest';

export const TextField = createInteractor<HTMLInputElement>('text field')({
  selector: 'input[type=text]',
  filters: {
    placeholder: (element) => element.placeholder
  },
  actions: {
    fillIn: perform(fillIn),
    pressEnter: perform((element) => {
      let init: any = { bubbles: true, key: 'Enter', code: 'Enter', which: 13, keyCode: 13 };
      element.dispatchEvent(new KeyboardEvent('keydown', init));
      element.dispatchEvent(new KeyboardEvent('keyup', init));
    }),
  }
});

export const ListItem = createInteractor<HTMLLIElement>('list item')({
  selector: 'li',
});

export const TodoField = TextField({ placeholder: 'What needs to be done?' });
