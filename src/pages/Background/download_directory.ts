import { DIRECTORY_DOWNLOAD_LINK, formatDirectoryDownloadLink } from './consts';

async function updateTokenValue(tabId: number, newToken: string) {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: (token) => {
      localStorage.token = token;
    },
    args: [newToken],
  });
}

export default async function downloadFolder(folder_url: string) {
  const tab = await chrome.tabs.create({
    url: DIRECTORY_DOWNLOAD_LINK,
    active: false,
  });
  if (tab.id) {
    const { token } = await chrome.storage.sync.get(['token']);
    if (token) {
      await updateTokenValue(tab.id, token);
    }
    await chrome.tabs.update(tab.id, {
      url: formatDirectoryDownloadLink`${encodeURIComponent(folder_url)}`,
      active: true,
    });
  }
}
