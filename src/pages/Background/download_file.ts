import { GithubBlobData } from './types';
import { BLOB_IDENTIFIER, RAW_IDENTIFIER } from './consts';

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

export default function downloadFile(url: string) {
  console.log(`Received the following href ${url}, starting file download...`);
  const blobData = parseUrlToBlobData(url);
  chrome.downloads.download({
    url: blobData.url,
    filename: blobData.blobName,
  });
}
