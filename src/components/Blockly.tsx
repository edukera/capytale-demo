import React from 'react'
import Blockly from "blockly";
import { BlocklyWorkspace, useBlocklyWorkspace } from "react-blockly";

import ConfigFiles from "./toolbox/content";

import './Blockly.css'

type BlocklyProps = {
  theme : string,
  initialJson : any,
  setWorkspace : React.Dispatch<React.SetStateAction<any>>
}

export default function BlocklyPanel({ theme, initialJson, setWorkspace } : BlocklyProps) {
  const onWorkspaceChange = React.useCallback((workspace : any) => {
    const newJson = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
    console.log(newJson)
  }, []);
  const onInject = (workspace : any) => {
    setWorkspace(workspace)
  }
  return (
    <BlocklyWorkspace
      toolboxConfiguration= {ConfigFiles.INITIAL_TOOLBOX_JSON}
      workspaceConfiguration={{
        grid: {
          spacing: 20,
          length: 3,
          colour: "#ccc",
          snap: true,
        },
      }}
      initialJson={initialJson}
      className={theme}
      onInject={onInject}
      onWorkspaceChange={onWorkspaceChange}
    />
  );
}
