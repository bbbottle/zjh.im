export const buildCommandsByProps = (props) => [
  {
    name: "hello",
    handler: async (shell) => {
      return shell.printLine("coming soon...");
    },
  },
  {
    name: "exit",
    handler: async () => {
      props.destroy();
      return Promise.resolve();
    },
  },
];
