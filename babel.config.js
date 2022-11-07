module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver', {
          root: ["./"],
          alias: {
            "@common": "./src/common",
            "@components": "./src/components",
            "@containers": "./src/containers",
            "@navigations": "./src/navigations",
            "@screens": "./src/screens",
          },
        },
      ],
      [
        'module:react-native-dotenv', {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      },
    },
  };
};