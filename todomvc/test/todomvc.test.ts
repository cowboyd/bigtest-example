import 'regenerator-runtime/runtime';
import { test } from '@bigtest/suite';
import { strict as assert } from 'assert';
import { App, createInteractor } from '@bigtest/interactor';

const TextField = createInteractor<HTMLInputElement>('text field')({
  selector: 'input[type=text]',
  locators: {
    byPlaceholder: (element) => element.placeholder
  },
  actions: {
    fillIn: (element, value: string) => element.value = value,
    pressEnter: (element) => {
      let init: any = { bubbles: true, key: 'Enter', code: 'Enter', which: 13, keyCode: 13 };
      element.dispatchEvent(new KeyboardEvent('keydown', init));
      element.dispatchEvent(new KeyboardEvent('keyup', init));
    }
  }
});

const ListItem = createInteractor<HTMLLIElement>('list item')({
  selector: 'li',
});

const TodoField = TextField.byPlaceholder('What needs to be done?');

export default test("TodoMVC")
  .child("When page is initially opened", test => test
    .step("loading the app", async () => {
      await App.visit();
    })
    .step("filling in the todo field", async () => {
      await TodoField.fillIn('Write some tests');
    })
    .step("and pressing enter", async () => {
      await TodoField.pressEnter();
    })
    .assertion("there should be a new item", async () => {
      await ListItem('Write some tests').exists();
    })
  );
