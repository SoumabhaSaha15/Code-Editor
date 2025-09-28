import React from "react";
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { type CodeEditorProps } from "./CodeEditor";
const JsEditor: React.FC<CodeEditorProps> = (props: CodeEditorProps) => {
  return (
    <CodeMirror
      value={props.code}
      height="100%"
      extensions={[javascript({jsx:true})]}
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
export default JsEditor;