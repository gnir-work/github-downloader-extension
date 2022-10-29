export const BLOB_IDENTIFIER = '/blob/';
export const RAW_IDENTIFIER = '/raw/';
export const DIRECTORY_DOWNLOAD_LINK = 'https://download-directory.github.io/';
export const formatDirectoryDownloadLink = (
  _: TemplateStringsArray,
  url: string,
) => `${DIRECTORY_DOWNLOAD_LINK}?url=${url}`;
