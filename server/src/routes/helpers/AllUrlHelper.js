/* eslint no-unused-vars:0 */
"use strict";
import CouchSession from "../../CouchSession.js";
import HttpResponseHandler from "../../../../common/src/HttpResponseHandler.js";
import BoolUtil from "../../../../common/src/util/BoolUtil.js";

export default class AllUrlHelper {
    static allUrlsCallback(request, next) {
        if(AllUrlHelper.whiteList(request.originalUrl)) {
            return next();
        } else if(request.cookies.AuthSession) {
            CouchSession.authenticate(request.cookies.AuthSession)
                .then((userName) => {
                    next();
                }).catch((error) => {
                    proceedToUnAuthorizedError();
                });
        } else {
            proceedToUnAuthorizedError();
        }
        function proceedToUnAuthorizedError() {
            let error = new Error("unthorized");
            error.status = HttpResponseHandler.codes.UNAUTHORIZED;
            next(error);
        }
    }

    static whiteList(url) {
        if(BoolUtil.isEmpty(url)) {
            throw new Error("url can not be empty");
        }

        let whitelistUrls = [/^\/$/g, /^\/login$/g, /^\/app.js/g, /^\/app.css/g, /^\/images\/.*/g, /^\/fonts\/.*/g];
        return whitelistUrls.filter((item) => {
            return url.match(item);
        }).length > 0;
    }
}

