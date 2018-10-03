"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EditorArea_1 = require("./EditorArea");
class MarkdownEditor extends React.Component {
    render() {
        return (React.createElement(EditorArea_1.default, { content: "Let's finish this **awesome** editor" }));
    }
}
exports.default = MarkdownEditor;
