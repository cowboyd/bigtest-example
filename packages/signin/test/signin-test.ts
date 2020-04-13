import { TestImplementation } from "@bigtest/suite";

const visit = (path: string) => async () => ({ path });
const exists = (selector: string) => () => ({ selector });
const notExists = (selector: string) => () => ({ selector });
// const assert = (fn: () => boolean, expected: unknown) => (context: unknown) => Promise.resolve(expected);
const click = (selector: string) => async () => Promise.resolve();
const fillIn = (selector: string, value: string) => async () =>
  Promise.resolve();
const textEqual = (selector: string, expect: string) => () => ({ selector })

interface ScopedProps {
  notExists: (selector?: string) => () => void;
  exists: (selector?: string) => () => void;
  fillIn: (selector: string, value: string) => () => Promise<void>;
  click: (selector: string) => () => Promise<void>;
}

const Modal = (
  title: string,
  scoped: (props: ScopedProps) => TestImplementation[]
): TestImplementation => {
  return {
    description: `${title} Modal`,
    guards: [
      {
        description: `Check that ${title} Modal exists`,
        check: exists(`.modal[title=${title}`),
      },
    ],
    children: scoped({
      notExists: (selector) => notExists(`.modal[title=${title} ${selector}`),
      exists: (selector) => exists(`.modal[title=${title} ${selector}`),
      fillIn: (selector, value) => fillIn(`.modal[title=${title} ${selector}`, value),
      click: (selector) => click(`.modal[title=${title} ${selector}`),
    }),
    steps: [],
    assertions: [],
  };
};

export const test: TestImplementation = {
  description: "Sign in via Modal",
  steps: [
    {
      description: "Create user Bob with password 12345678",
      action: async () => ({ name: "Bob", password: "12345679" }),
      guards: [],
    },
    {
      description: "Visit home",
      action: visit("/"),
      guards: [],
    },
    {
      description: "clicking on sign in button",
      guards: [
        {
          description: "check that sign in button exists",
          check: exists("button[name=sign-in]"),
        },
      ],
      action: click("button[name=sign-in]"),
    },
  ],
  children: [
    Modal("Sign in", modal => [
      {
        description: "Filling in the form",
        steps: [
          {
            description: "fill in username field with Bob",
            guards: [
              {
                description: "check that username field exists",
                check: modal.exists('input[name=username]'),
              },
            ],
            action: modal.fillIn('input[name=username]', 'Bob'),
          },
          {
            description: "fill in password field with 12345678",
            guards: [
              {
                description: "check that password field exists",
                check: modal.exists('input[name=password')
              }
            ],
            action: modal.fillIn('input[name=password]', '12345678')
          }
        ],
        assertions: [],
        children: [
          {
            description: "submitting form",
            guards: [],
            steps: [
              {
                description: "click on submit button",
                guards: [
                  {
                    description: "check that submit button exists",
                    check: modal.exists('button[name=submit]')
                  }
                ],
                action: modal.click('button[name=submit]')
              }
            ],
            assertions: [
              {
                description: "Modal was closed",
                check: modal.notExists()
              },
              {
                description: "Welcome text is Hello Bob",
                check: textEqual('.welcome-message', 'Hello Bob')
              }
            ],
            children: []
          }
        ],
        guards: []
      },
    ]),

  ],
};
