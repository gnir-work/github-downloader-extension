import { Action, GithubBlobData } from './types';
import { BLOB_IDENTIFIER, RAW_IDENTIFIER } from './consts';
import downloadFolder from './download_directory';

function parseUrlToBlobData(url: string): GithubBlobData {
  const rawUrl = url.replace(BLOB_IDENTIFIER, RAW_IDENTIFIER);
  let fileName = rawUrl.split('/').at(-1);
  if (fileName === undefined) {
    throw new Error(`Received invalid url ${url}`);
  } else {
    fileName = fileName.startsWith('.') ? fileName.substring(1) : fileName;
  }

  return {
    url: rawUrl,
    blobName: fileName,
  };
}

function downloadFile(url: string) {
  console.log(`Received the following href ${url}, starting file download...`);
  const blobData = parseUrlToBlobData(url);
  chrome.downloads.download({
    url: blobData.url,
    filename: blobData.blobName,
  });
}

chrome.runtime.onMessage.addListener(async ({ message }) => {
  // eslint-disable-next-line no-console
  switch (message.type) {
    case Action.downloadFile:
      downloadFile(message.url);
      break;
    case Action.downloadFolder:
      await downloadFolder(message.url);
      break;
    default:
      console.error(`Received unknown action type ${message.type}`);
      break;
  }
});
