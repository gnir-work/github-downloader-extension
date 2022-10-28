import { GithubBlobData } from './types';
import { BLOB_IDENTIFIER, RAW_IDENTIFIER } from './consts';

function parse_url_to_blob_data(url: string): GithubBlobData {
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

chrome.runtime.onMessage.addListener(({ message: url }) => {
  // eslint-disable-next-line no-console
  console.log(`Received the following href ${url}, starting to download...`);
  const blobData = parse_url_to_blob_data(url);
  chrome.downloads.download({
    url: blobData.url,
    filename: blobData.blobName,
  });
});
