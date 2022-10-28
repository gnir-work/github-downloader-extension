export const BLOB_IDENTIFIER = '/blob/';
export const RAW_IDENTIFIER = '/raw/';
export const formatDirectoryDownloadLink = (
  _: TemplateStringsArray,
  url: string,
) => `https://download-directory.github.io/?url=${url}`;
