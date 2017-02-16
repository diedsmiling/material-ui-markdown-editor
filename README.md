# Material-UI Markdown Editor
This is a [React.js](https://github.com/facebook/react) Markdown editor component based on material-ui, built with [CodeMirror](https://github.com/codemirror/codemirror).  

**It is alpha version yet**, any feedback is welcome!

# Demo & Example

**Live demo** can be found [here](https://diedsmiling.github.io/material-ui-markdown-editor/).
To build the examples locally, run:
```
npm install
npm start```

Then open [localhost:3000](http://localhost:3000/) in your browser.

To test application, run:

```
npm test
```

# Installation
 ....

# Usage

```
import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MarkdownEditor from 'material-ui-markdown-editor'

injectTapEventPlugin()

const Example = () => (
  <MuiThemeProvider>
    <MarkdownEditor
      title="Foo"
      code="# Fancy markdown editor!"
    />
  </MuiThemeProvider>
)

ReactDOM.render(
  <Example />,
  document.getElementById('root')
)

```

*PS*:
This [README.md](https://github.com/diedsmiling/material-ui-markdown-editor/blob/master/README.md) was written with this editor :D
