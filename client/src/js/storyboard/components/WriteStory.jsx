import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import AjaxClient from "../../utils/AjaxClient";
import History from "../../History";
import Toast from "../../utils/custom_templates/Toast";

export class WriteStory extends Component {

    componentDidMount() {
        this.storyId = decodeURIComponent(this.props.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("storyId").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        this.story = {};
        if(this.storyId) {
            this.getFromDb();
        }
    }

    getFromDb() {
        let ajax = AjaxClient.instance("/story");
        ajax.get({ "id": this.storyId }).then((response) => {
            this.story = response;
            this.refs.title.value = response.title;
        }).catch(() => {
            Toast.show("You are trying to access the invalid story card.Please check the URL");
            let history = History.getHistory();
            history.push("/storyBoard/storyCards");
        });
    }

    _onKeyDownInputBox(event) {
        const ENTERKEY = 13;
        if (event.keyCode === ENTERKEY) {
            this._addTitle();
        }
    }
    _addTitle() {
        this.story.title = this.refs.title.value.trim();
        this._updateStory(this.story.title);
    }

    _updateStory(story) {
        let ajax = AjaxClient.instance("/add-story");
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        ajax.put(headers, { "title": story }).then((response) => {
            Toast.show("Title added successfully");
            let history = History.getHistory();
            history.push("/storyBoard/story?storyId=" + response.id);
            return response;
        }).catch(() => {
            Toast.show("EITHER you entered/saved title more than once OR Story title already exists.");
        });
    }

    render() {
        return (
            <div>
                <div className="story-card-title">
                  <input ref="title" className="title-box" type="text" placeholder="please enter title of the story" onKeyDown={(event) => this._onKeyDownInputBox(event)}/>
                  <button ref="saveButton"type="submit" className="save-box" value="save" onClick={() => {
                      this._addTitle();
                  }}
                  >{ "SAVE" }</button>
                </div>
            </div>
        );
    }
}

WriteStory.propTypes = {
    "dispatch": PropTypes.func.isRequired,
    "location": PropTypes.object
};


function select(store) {
    return store;
}
export default connect(select)(WriteStory);