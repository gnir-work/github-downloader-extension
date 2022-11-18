import debounce from 'lodash.debounce';
import { Action } from '../Background/types';

let currentHref = document.location.href;
const FILE_SELECTOR = 'svg[aria-label=File]';
const DIRECTORY_SELECTOR = 'svg[aria-label=Directory]';

function addDownloadIcon(row: Element) {
  const downloadIcon = document.createElement('span');
  downloadIcon.style.cursor = 'pointer';
  downloadIcon.style.marginLeft = '0.5em';
  downloadIcon.textContent = '⇩';

  downloadIcon.addEventListener('click', () => {
    const isFile = !!row.querySelector(FILE_SELECTOR);
    const isFolder = !!row.querySelector(DIRECTORY_SELECTOR);
    if (!isFile && !isFolder) {
      throw new Error("Row doesn't contain folder nor file data");
    } else {
      const url = row.querySelector('a')?.href;
      chrome.runtime.sendMessage({
        message: {
          type: isFile ? Action.downloadFile : Action.downloadFolder,
          url,
        },
      });
    }
  });

  row.insertAdjacentElement('beforeend', downloadIcon);
}

function insertDownloadIcons() {
  const rows = Array.from(document.querySelectorAll('div.Details div.js-navigation-item'));
  const downloadableRows = rows.filter((row: Element) => row.querySelector(`${DIRECTORY_SELECTOR},${FILE_SELECTOR}`));
  downloadableRows.forEach(addDownloadIcon);
}

function main() {
  insertDownloadIcons();
  const observer = new MutationObserver(debounce(() => {
    if (document.location.href !== currentHref) {
      currentHref = document.location.href;
      insertDownloadIcons();
    }
  }, 1000));
  const config = { attributes: false, childList: true, subtree: true };
  observer.observe(document, config);
}

window.addEventListener('load', main);
