import { getOAuthToken } from "./script";

const loadGoogleApi = name => {
  return new Promise((resolve, reject) => {
    gapi.load(name, {
      callback() {
        resolve();
      },
      onerror() {
        reject(new Error(`${name} failed to load.`));
      },
      timeout: 10000,
      ontimeout() {
        reject(new Error(`${name} could not load in 1000ms.`));
      }
    });
  });
};

const setTokenToSessionStorage = async () => {
  sessionStorage.token = await getOAuthToken();
};

export const initGas = async () => {
  await Promise.all([loadGoogleApi("picker"), setTokenToSessionStorage()]);
};
