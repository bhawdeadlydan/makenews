import AjaxClient from "./../../utils/AjaxClient";

export const BOOKMARKED_ARTICLE = "BOOKMARKED_ARTICLE";

export const bookmarkedArticleAction = (articleId, bookmarkStatus) => ({
    "type": BOOKMARKED_ARTICLE,
    articleId,
    bookmarkStatus
});

export function bookmarkArticle(article) {
    let ajaxClient = AjaxClient.instance("/bookmarks", true);
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    return async dispatch => {
        let response = await ajaxClient.post(headers, {
            "docId": article._id
        });

        if(response.ok) {
            dispatch(bookmarkedArticleAction(article._id, !article.bookmark));
        }
    };
}