import React from "react";
import { html } from '@codemirror/lang-html';
import CodeMirror from '@uiw/react-codemirror';
import { type CodeEditorProps } from "./CodeEditor";
const HtmlEditor: React.FC<CodeEditorProps> = (props: CodeEditorProps) => {
  return (
    <CodeMirror
      value={props.code}
      height="100%"
      extensions={[html()]}
      theme={props.theme}
      onChange={props.onChange}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        dropCursor: false,
        allowMultipleSelections: false
      }}
    />
  );
}
export default HtmlEditor;