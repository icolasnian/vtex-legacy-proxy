export const readLocalStorage = async (key: string) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result: any) {
      if (result[key] === undefined) {
        reject();
      } else {
        resolve(JSON.parse(result[key]));
      }
    });
  });
};

export const setLocalStorage = async (key: string, data: unknown) => {
  chrome.storage.local.set({[key]: JSON.stringify(data)});
};
