import { getInstaller } from "./install";

export const buildCommandsByProps = (props) => [
  {
    name: "exit",
    handler: async () => {
      props.destroy();
      return Promise.resolve();
    },
  },
  getInstaller({
    addSitePage: props.addSitePage,
    addCanvasApp: props.addCanvasApp,
  }),
];
