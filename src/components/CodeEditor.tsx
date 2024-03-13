import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react'
import Blockly from "blockly"

import ConfigFiles from './toolbox/content';

type CodeEditorProps = {
  code : string,
  setCode : React.Dispatch<React.SetStateAction<string>>,
  theme : 'light' | 'dark',
  workspace : any
}

export const CodeEditor = ({ code, setCode, theme, workspace } : CodeEditorProps) => {
  console.log("Hello from CodeEditor")
  const onChange = (val : string) => {
    setCode(val);
    workspace.clear();
    Blockly.serialization.workspaces.load(ConfigFiles.INITIAL_JSON_LIST_5, workspace);
  };
  return <CodeMirror
    value={code}
    height={'calc(100vh - 64px)'}
    theme={theme}
    extensions={[python()]}
    onChange={ onChange }
  />;
};
