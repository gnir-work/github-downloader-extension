import {GithubBlobData} from "./types";
import {BLOB_IDENTIFIER, RAW_IDENTIFIER} from "./consts";

function parse_url_to_blob_data(url: string): GithubBlobData {
    const raw_url = url.replace(BLOB_IDENTIFIER, RAW_IDENTIFIER);
    let file_name = raw_url.split("/").at(-1);
    if (file_name === undefined) {
        throw new Error(`Received invalid url ${url}`);
    } else {
        file_name = file_name.startsWith('.') ? file_name.substring(1) : file_name
    }

    return {
        url,
        blob_name: file_name
    }
}

chrome.runtime.onMessage.addListener(({message: url}) => {
    console.log(`Received the following href ${url}, starting to download...`);
    const blob_data = parse_url_to_blob_data(url)
    chrome.downloads.download({
        url: blob_data.url,
        filename: blob_data.blob_name
    })
})