function downloadUrl(url: string, filename: string) {
    chrome.downloads.download({
        url,
        filename
    })
}

chrome.runtime.onMessage.addListener(({ message }) => {
    console.log(`Received the following href ${message}, starting to download...`);
    const raw_url = message.replace("/blob/", "/raw/");
    let file_name = raw_url.split("/").at(-1);
    if (file_name.startsWith('.')) {
        file_name = file_name.substring(1)
    }
    downloadUrl(raw_url, file_name);
})