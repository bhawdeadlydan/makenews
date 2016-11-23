/* eslint consistent-this:0*/
import Route from "./Route";
import RouteLogger from "../RouteLogger";
import TwitterLogin from "../../twitter/TwitterLogin";

export default class TwitterOauthCallbackRoute extends Route {

    constructor(request, response, next) {
        super(request, response, next);
        this.oauth_token = this.request.query.oauth_token; //eslint-disable-line
    }

    valid() {
        if(!this.oauth_token) {
            RouteLogger.instance().warn("TwitterOauthCallbackRoute:: OAuth token not available.");
            return false;
        }
        return true;
    }

    handle() {                     //eslint-disable-line consistent-return
        if(!this.valid()) {
            return this._handleInvalidRoute();
        }
        TwitterLogin.instance({ "previouslyFetchedOauthToken": this.oauth_token }).then((twitterLoginInstance) => {
            twitterLoginInstance.accessTokenFromTwitter(this.request.query.oauth_verifier).then((clientRedirectUrl) => {
                RouteLogger.instance().debug("TwitterOauthCallbackRoute:: OAuth token fetched successfully.");
                this._handleSuccess(clientRedirectUrl);
            });
        });
    }

    _handleSuccess(clientRedirectUrl) {
        this.response.redirect(clientRedirectUrl);
    }

}
