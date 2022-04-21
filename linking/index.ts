export const a = 1;

const config = {
  screens: {
    Home: {
      path: "Home"
    },
    Profile: {
      path: "profile/:id",
      parse: {
        id: (id: string) => `${id}`
      }
    }
  },
};

export const linking = {
  prefixes: ["demo://app"],
  config
};
