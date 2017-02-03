import AjaxClient from "./../../utils/AjaxClient";
export const COLLECTION_FEEDS = "COLLECTION_FEEDS";
export const NO_COLLECTION_FEEDS = "NO_COLLECTION_FEEDS";

export function displayCollectionFeeds(collectionName) {
    let ajaxClient = AjaxClient.instance("/collectionFeeds");

    return async dispatch => {
        try {
            let feeds = await ajaxClient.get({ "collectionName": collectionName });
            dispatch(collectionFeeds(feeds));
        } catch (err) {
            dispatch(noCollectionFeeds());
        }
    };
}

function collectionFeeds(feeds) {
    return {
        "type": COLLECTION_FEEDS,
        feeds
    };
}

function noCollectionFeeds() {
    return {
        "type": NO_COLLECTION_FEEDS
    };
}
