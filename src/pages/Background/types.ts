export interface GithubBlobData {
  url: string;
  blobName: string;
}

export enum Action {
  downloadFolder,
  downloadFile,
}
