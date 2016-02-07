/*eslint no-nested-ternary:0 max-len:0*/
"use strict";
import React, { Component, PropTypes } from "react";
import Paragraph from "./Paragraph.jsx";
import ImageGallery from "./ImageGallery.jsx";
import ImageContent from "./ImageContent.jsx";
import Locale from "../../utils/Locale";

export default class AllFeeds extends Component {

    render() {
        let appEnMessages = Locale.applicationStrings().messages;
        let categories = this.props.feeds.map((category, index)=>
            category.type === "description" ? <Paragraph key={index} category={category} dispatch={this.props.dispatch} actionComponent={this.props.actionComponent} clickHandler={this.props.clickHandler} appEnMessages={appEnMessages}/>
                : category.type === "gallery" ? <ImageGallery key={index} category={category} dispatch={this.props.dispatch} actionComponent={this.props.actionComponent} clickHandler={this.props.clickHandler} appEnMessages={appEnMessages}/>
                : category.type === "imagecontent" ? <ImageContent key={index} category={category} dispatch={this.props.dispatch} actionComponent={this.props.actionComponent} clickHandler={this.props.clickHandler} appEnMessages={appEnMessages}/> : null
        );

        return (
            <div className="all-feeds max-width">
                {categories}
            </div>
        );
    }
}

AllFeeds.displayName = "AllFeeds";

AllFeeds.propTypes = {
    "dispatch": PropTypes.func,
    "feeds": PropTypes.array,
    "actionComponent": PropTypes.func,
    "clickHandler": PropTypes.func
};

AllFeeds.defaultProps = {
    "feeds": [],
    "actionComponent": null
};
