import 'regenerator-runtime/runtime';
import { strict as assert } from 'assert';
import { App, test } from 'bigtest';
import { TodoField, ListItem } from './interactors';

export default test("TodoMVC")
  .child("creating a todo", test => test
    .step(
      App.visit(),
      TodoField.fillIn('Write some tests'),
      TodoField.pressEnter(),
    )
    .assertion(
      ListItem('Write some tests').exists()
    )
  );
