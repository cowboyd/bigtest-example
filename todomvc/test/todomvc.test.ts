import 'regenerator-runtime/runtime';
import { test } from '@bigtest/suite';
import { strict as assert } from 'assert';

export default test("TodoMVC")
  .child("When page is initially opened", test => test
    .step("it focuses on the todo input field", async () => {
      let input;
      while(!(input = document.querySelector<HTMLInputElement>("[placeholder='What needs to be done?']"))) {
        console.log("INPUT", input);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    })
    .assertion("it focuses on the todo input field", () => {
      let input = document.querySelector<HTMLInputElement>("[placeholder='What needs to be done?']");

      assert(input, 'Cannot find TODO input element');
      assert.equal(document.activeElement, input,
        `Expected ${input} to have focus, but it did not. Instead, it was ${document.activeElement}`);
    })
  );
