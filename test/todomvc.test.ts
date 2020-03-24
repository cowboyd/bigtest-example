import { TestImplementation } from '@bigtest/suite';

const test: TestImplementation = {
  description: "TodoMVC",
  steps: [],
  assertions: [],
  children: [{
    description: "When page is initially opened",
    steps: [],
    assertions: [{
      description: "it focuses on the todo input field",
      check() {
        let input = document.querySelector<HTMLInputElement>("[placeholder='What needs to be done?]");
        if (!input) {
          throw new Error('Cannot find TODO input element');
        }
        if (document.activeElement != input) {
          throw new Error(`Expected ${input} to have focus, but it did not. Instead, it was ${document.activeElement}`);
        }
      }
    }],
    children: []
  }]
}

export default test;
