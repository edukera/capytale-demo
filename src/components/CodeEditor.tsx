import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react'
import Blockly from "blockly"

import { pythonCodeToBlockly } from './CodeAnalysis';

type CodeEditorProps = {
  code : string,
  theme : 'light' | 'dark',
  workspace : any
}

export const CodeEditor = ({ code, theme, workspace } : CodeEditorProps) => {
  console.log("Hello from CodeEditor")
  const onChange = (val : any, viewUpdate : any) => {
    const blockly = pythonCodeToBlockly(val)
    console.log(JSON.stringify(blockly, null, 2))
    console.log(workspace)
    workspace.clear();
    Blockly.serialization.workspaces.load(blockly, workspace);
  }
  return <CodeMirror
    value={code}
    height={'calc(100vh - 64px)'}
    theme={theme}
    extensions={[python()]}
    onChange={ onChange }
  />;
};
