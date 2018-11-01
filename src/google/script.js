const run = (functionName, arg) => {
  if (!(window.google && google.script)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      [functionName](arg);
  });
};

export const getOAuthToken = () => run("getOAuthToken");
export const copyFile = params => run("copyFile", params);
