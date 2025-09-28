import React from "react";
import { css } from '@codemirror/lang-css';
import CodeMirror from '@uiw/react-codemirror';
import { type CodeEditorProps } from "./CodeEditor";
const CSSEditor: React.FC<CodeEditorProps> = (props: CodeEditorProps) => {
  return (
    <CodeMirror
      value={props.code}
      height="100%"
      extensions={[css()]}
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
export default CSSEditor;