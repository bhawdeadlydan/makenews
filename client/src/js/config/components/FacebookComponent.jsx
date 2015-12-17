/* eslint max-len:0 no-unused-vars:0, react/no-set-state:0 */
"use strict";
import React, { Component, PropTypes } from "react";
import { addFacebookUrlAsync } from "../actions/CategoryActions.js";
import AddURLComponent from "../../utils/components/AddURLComponent.js";

export default class FacebookComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { "errorMessage": "" };
    }

    _validateUrl(url, callback, props) {
        props.dispatch(addFacebookUrlAsync(props.categoryId, url, (response)=> {
            let errorMsg = response === "invalid" ? this.props.categoryDetailsPageStrings.errorMessages.noFbAccess : this.props.categoryDetailsPageStrings.errorMessages.urlSuccess;
            return callback({ "error": errorMsg, "urlAdded": true });
        }));
    }

    render() {
        return (
            <AddURLComponent content={this.props.content} categoryDetailsPageStrings={this.props.categoryDetailsPageStrings} addUrlLinkLabel={this.props.categoryDetailsPageStrings.addUrlLinkLabel} errorMessage={this.state.errorMessage} sourceDomainValidation={(url, callback) => this._validateUrl(url, callback, this.props)} noValidation/>
        );
    }
}

FacebookComponent.displayName = "FacebookComponent";
FacebookComponent.propTypes = {
    "content": PropTypes.array.isRequired,
    "content.details": PropTypes.array,
    "categoryDetailsPageStrings": PropTypes.object.isRequired
};

