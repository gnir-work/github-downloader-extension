import {formatDirectoryDownloadLink} from "../Background/consts";

function addDownloadIcon(row: Element) {
    const downloadIcon = document.createElement("span")
    downloadIcon.style.cursor = "pointer";
    downloadIcon.style.marginLeft = "0.5em";
    downloadIcon.textContent = "⇩"

    downloadIcon.addEventListener("click", () => {
        const isFile = !!row.querySelector('svg[aria-label=File]');
        const isFolder = !!row.querySelector('svg[aria-label=Directory]');
        const link = row.querySelector('a')?.href
        if (link) {
            if (isFile) {
                chrome.runtime.sendMessage({message: link})
            } else if (isFolder) {
                window.open(
                    formatDirectoryDownloadLink`${encodeURIComponent(link)}`,
                    'blank'
                )
            }
        }
    })

    row.insertAdjacentElement("beforeend", downloadIcon);
}


function main() {
    const rows = document.querySelectorAll('div.Details div.js-navigation-item');
    if (rows) {
        for (const row of Array.from(rows)) {
            addDownloadIcon(row);
        }
    }
}

window.addEventListener("load", main)