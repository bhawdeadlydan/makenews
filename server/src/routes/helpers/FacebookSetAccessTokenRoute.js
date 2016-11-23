/* eslint consistent-this:0*/
import StringUtil from "../../../../common/src/util/StringUtil";
import FacebookRequestHandler from "../../facebook/FacebookRequestHandler";
import Route from "./Route";
import RouteLogger from "../RouteLogger";

export default class FacebookSetAccessTokenRoute extends Route {
    constructor(request, response, next) {
        super(request, response, next);
        this.accessToken = this.request.body.accessToken;
        this.userName = this.request.body.userName;
    }

    valid() {
        if(StringUtil.isEmptyString(this.accessToken) || StringUtil.isEmptyString(this.userName)) {
            return false;
        }
        return true;
    }

    handle() {   //eslint-disable-line consistent-return
        if(!this.valid()) {
            return this._handleInvalidRoute();
        }

        let facebookReqHan = FacebookRequestHandler.instance(this.accessToken);
        facebookReqHan.setToken(this.userName).then(expiresAfter => {
            RouteLogger.instance().debug("FacebookSetAccessTokenRoute:: successfully fetched facebook long lived token.");
            this._handleSuccess({ "expires_after": expiresAfter });
        }).catch(error => {
            RouteLogger.instance().error("FacebookSetAccessTokenRoute:: error fetching facebook long lived token. Error: %s", error);
            this._handleFailure(error);
        });

    }
}
