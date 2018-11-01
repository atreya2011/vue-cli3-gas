const developerKey = "AIzaSyCFSd8RsN-n5ceXseupIvcCOkzdDyxJCdQ";

const pick = viewId => {
  return new Promise((resolve, reject) => {
    const view = new google.picker.DocsView(viewId)
      .setIncludeFolders(true)
      .setSelectFolderEnabled(viewId === google.picker.ViewId.FOLDERS)
      .setOwnedByMe(true);

    // See: https://developers.google.com/apps-script/guides/dialogs#file-open_dialogs
    new google.picker.PickerBuilder()
      .addView(view)
      .setOAuthToken(sessionStorage.token)
      .setDeveloperKey(developerKey)
      .setOrigin(google.script.host.origin)
      .hideTitleBar()
      .enableFeature(google.picker.Feature.NAV_HIDDEN)
      .enableFeature(google.picker.Feature.MINE_ONLY)
      .setSize(1051, 650)
      .setCallback(data => {
        const action = data[google.picker.Response.ACTION];
        if (action === google.picker.Action.PICKED) {
          const docs = data[google.picker.Response.DOCUMENTS];
          resolve(docs);
        } else if (action === google.picker.Action.CANCEL) {
          reject(new Error("Canceled picking folder"));
        }
      })
      .build()
      .setVisible(true);
  });
};

export const pickFolder = () => pick(google.picker.ViewId.FOLDERS);
export const pickSpreadsheet = () => pick(google.picker.ViewId.SPREADSHEETS);
