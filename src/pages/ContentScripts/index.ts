function add_download_icon(row: Element) {
    const is_file = !!row.querySelector('svg[aria-label=File]');
    const is_folder = !!row.querySelector('svg[aria-label=Directory]');
    if (is_file) {
        row.children[0].setAttribute("style", "width: 32px")

        const download_icon = document.createElement("span")
        download_icon.style.cursor = "pointer";
        download_icon.style.marginRight = "0.5em";
        download_icon.textContent = "⇩"
        download_icon.addEventListener("click", () => {
            const file_link = row.querySelector('a')?.href
            if (file_link) {
                chrome.runtime.sendMessage({message: file_link})
            }
        })

        row.insertAdjacentElement("afterbegin", download_icon);
    }
    if (is_folder) {
        row.children[0].setAttribute("style", "width: 32px")

        const download_icon = document.createElement("span")
        download_icon.style.cursor = "pointer";
        download_icon.style.marginRight = "0.5em";
        download_icon.textContent = "⇩"
        download_icon.addEventListener("click", () => {
            const folder_link = row.querySelector('a')?.href
            if (folder_link) {
                window.open(
                    `https://download-directory.github.io/?url=${encodeURIComponent(folder_link)}`,
                    'blank'

                )
            }
        })
        row.insertAdjacentElement("afterbegin", download_icon);
    }
}


function main() {
    const rows = document.querySelectorAll('div.Details div.js-navigation-item');
    if (rows) {
        for (const row of Array.from(rows)) {
            add_download_icon(row);
        }
    }
}

window.addEventListener("load", main)