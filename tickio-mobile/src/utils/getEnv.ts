import Constants from "expo-constants";
export const getEnvVar = (key: string): string => {
  const value = Constants.expoConfig?.extra?.[key];
  if (!value) {
    throw new Error(
      `Environment variable ${key} is not defined in app.config.js`,
    );
  }
  return value as string;
};
