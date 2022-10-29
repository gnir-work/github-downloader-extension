import { Action } from '../Background/types';

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

function main() {
  const rows = document.querySelectorAll('div.Details div.js-navigation-item');
  rows.forEach(addDownloadIcon);
}

window.addEventListener('load', main);
