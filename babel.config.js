module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'], // src 디렉토리를 루트로 설정
        alias: {
          '*': './src/*',
        },
      },
    ],
  ],
};
