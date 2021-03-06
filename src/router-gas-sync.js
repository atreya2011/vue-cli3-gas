export const syncGas = router => {
  if (!(window.google && google.script)) {
    return;
  }

  router.afterEach(({ path, query }) => {
    google.script.history.replace(null, query, path);
  });

  google.script.url.getLocation(({ hash: path, parameter: query }) => {
    router.replace({ path, query });
  });
};
