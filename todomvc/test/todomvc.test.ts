import 'regenerator-runtime/runtime';
import { test } from '@bigtest/suite';
import { strict as assert } from 'assert';

export default test("TodoMVC")
  .child(
    "When page is initially opened", test => test
      .step("find input field", async () => {
        let input;
        while(!(input = document.querySelector<HTMLInputElement>("[placeholder='What needs to be done?']"))) {
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
        return { input };
      })
      .assertion("it focuses on the todo input field", ({ input }) => {
        assert.equal(
          document.activeElement, input,
          `Expected ${input} to have focus, but it did not. Instead, it was ${document.activeElement}`);
      }));
