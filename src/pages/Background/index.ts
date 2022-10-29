import { Action } from './types';
import downloadFolder from './download_directory';
import downloadFile from './download_file';

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
