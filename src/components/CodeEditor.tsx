import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react'

type CodeEditorProps = {
  code : string,
  setCode : React.Dispatch<React.SetStateAction<string>>,
  theme : 'light' | 'dark'
}

export const CodeEditor = ({ code, setCode, theme } : CodeEditorProps) => {
  return <CodeMirror
    value={code}
    height={'calc(100vh - 64px)'}
    theme={theme}
    extensions={[python()]}
    onChange={ value => setCode(value) }
  />;
};
