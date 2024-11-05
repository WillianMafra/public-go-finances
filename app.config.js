import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    name: "Go Finances",
    slug: "go-finances",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#F0F2F5"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        resizeMode: "contain",
        backgroundColor: "#F0F2F5"
      },
      package: "com.gofinances"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    entryPoint: "./app.tsx",
    plugins: [
      "expo-font",
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme: process.env.IOS_URL_SCHEME
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "e266eb4b-0bd6-4b2c-bc95-5d025b929aa8"
      }
    },
    owner: "willnmafra"
  };
};
