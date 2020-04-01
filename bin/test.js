const { main } = require('@effection/node');
const { Atom, createOrchestrator } = require('@bigtest/server');
const Mailbox = require('@bigtest/effection');

main(function* () {
  // we really ought to have these ports, except for the
  // app port assigned dynamicall
  yield createOrchestrator({
    atom: new Atom(),
    delegate: new Mailbox(),
    agentPort: 26001,
    appPort: 4000,
    appCommand: "yarn",
    appArgs: "start 4000",
    proxyPort: 26002,
    commandPort: 26003,
    connectionPort: 26004,
    testFiles: ["test/todomvc.test.ts"],
    manifestPort: 26005,
    cacheDir: "./bigtest/cache"
  });
});
