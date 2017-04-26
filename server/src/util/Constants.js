export const fbSourceTypesToFetch = { "page": "page", "group": "group", "profile": "user" };
export const sourceTypes = { "fb_page": "fb_page", "fb_profile": "fb_profile", "fb_group": "fb_group", "twitter": "twitter", "web": "web" };
export const fetchFeedsTimeInterval = { "web": 420, "fb_page": 360, "fb_group": 360, "fb_profile": 360, "twitter": 300 };
export const DOCS_PER_REQUEST = 25;
/* TODO: change the next let to const and fix the test cases*/ //eslint-disable-line
export let COLLECTION_PER_REQUEST = 100;
export const maxFeedsPerRequest = { "facebook": 100, "twitter": 100 };
export let FEED_LIMIT_TO_DELETE_IN_QUERY = 1000;
export const NEWSBOARD_SOURCE_TYPES = { "trending": "trending", "web": "web", "facebook": "facebook", "twitter": "twitter", "bookmark": "bookmark", "collection": "collections" };
export const SOURCES_PER_REQUEST = 24;
export const FEED_DOCTYPE = "feed";
