"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EditorArea_1 = require("./EditorArea");
const content = `Let's finish this **awesome** editor 
new line
new

`;
class MarkdownEditor extends React.Component {
    render() {
        return (React.createElement(EditorArea_1.default, { content: content }));
    }
}
exports.default = MarkdownEditor;
