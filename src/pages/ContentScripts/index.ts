import { Action } from '../Background/types';
import debounce from 'lodash.debounce';

let currentHref = document.location.href;

function addDownloadIcon(row: Element) {
  const downloadIcon = document.createElement('span');
  downloadIcon.style.cursor = 'pointer';
  downloadIcon.style.marginLeft = '0.5em';
  downloadIcon.textContent = '⇩';

  downloadIcon.addEventListener('click', () => {
    const isFile = !!row.querySelector('svg[aria-label=File]');
    const isFolder = !!row.querySelector('svg[aria-label=Directory]');
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
  const rows = document.querySelectorAll('div.Details div.js-navigation-item');
  rows.forEach(addDownloadIcon);
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
