import { python } from '@codemirror/lang-python';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react'
import Blockly from "blockly"
import {linter, Diagnostic} from "@codemirror/lint"
import {syntaxTree} from "@codemirror/language"

import { pythonCodeToBlockly } from '../python2Blockly';

const Linter = linter(view => {
  let diagnostics: Diagnostic[] = []
  syntaxTree(view.state).cursor().iterate(node => {
    //console.log(node.name)
    if (node.name === "⚠") diagnostics.push({
      from: node.from,
      to: node.to,
      severity: "warning",
      message: "Syntaxe invalide.",
    })
  })
  return diagnostics
})

type CodeEditorProps = {
  code : string,
  theme : 'light' | 'dark',
  workspace : any
}

export const CodeEditor = ({ code, theme, workspace } : CodeEditorProps) => {
  const onChange = (val : any, viewUpdate : any) => {
    const blockly = pythonCodeToBlockly(val)
    //console.log(JSON.stringify(blockly, null, 2))
    workspace.clear();
    const variables = workspace.getAllVariables();
    // Parcourt et supprime chaque variable par son ID
    variables.forEach(function(variable : any) {
      workspace.deleteVariableById(variable.getId());
    });
    Blockly.serialization.workspaces.load(blockly, workspace);
  }
  return <CodeMirror
    value={code}
    height={'calc(100vh - 64px)'}
    theme={theme}
    extensions={[python(), Linter]}
    onChange={ onChange }
  />;
};
