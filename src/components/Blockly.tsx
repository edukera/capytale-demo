import React, { useEffect } from 'react'
import Blockly from "blockly";
import { BlocklyWorkspace } from "react-blockly";
import {pythonGenerator} from 'blockly/python';
import ConfigFiles from "./toolbox/content";

import './Blockly.css'

type BlocklyProps = {
  theme : string,
  setWorkspace : React.Dispatch<React.SetStateAction<any>>,
  setCode : React.Dispatch<React.SetStateAction<string>>
}

const fixCode = (code : string) : string => code.replace(/^(\w+\s*=\s*None\n)+\n*/, '');

interface CustomEvent extends Blockly.Events.Abstract {
  isStart?: boolean;
  // Ajoutez d'autres champs spécifiques aux événements de glissement ici
}

export default function BlocklyPanel({ theme, setWorkspace, setCode } : BlocklyProps) {
  const onWorkspaceChange = React.useCallback((workspace : any) => {
    workspace.getAllBlocks().forEach((block : Blockly.Block) => {
      if (block.type === 'text_print') {
        // Appliquez l'extension ici si ce n'est pas déjà fait
        // Ceci est juste un exemple et peut nécessiter d'ajuster la logique d'extension
        block.setOnChange(function(changeEvent: Blockly.Events.Abstract) {
          if (changeEvent.type === 'change') {
            const pythonCode = fixCode(pythonGenerator.workspaceToCode(workspace))
            //console.log(pythonCode)
            setCode(pythonCode)
          }
        });
      }
    });
    //const newJson = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
    //console.log(newJson)
  }, []);
  const onInject = (workspace : any) => {
    workspace.addChangeListener((e: CustomEvent) => {
      const newJson = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
      console.log(newJson)
      if (e.isUiEvent && e.type === 'drag' && e.isStart === false) {
        console.log(e)
        const pythonCode = fixCode(pythonGenerator.workspaceToCode(workspace))
        //console.log(pythonCode)
        setCode(pythonCode)
      }
    })
    setWorkspace(workspace)
  }
  //useEffect(() => {
  //  try {
  //    Blockly.Extensions.register('capture_change', function(b: Blockly.Block) {
  //      b.setOnChange(function(changeEvent: Blockly.Events.Abstract) {
  //        console.log("capture_change")
  //        console.log(changeEvent)
  //      });
  //    });
  //  } catch (e) { console.log(e) }
  //}, [])

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
      initialJson={ConfigFiles.INITIAL_JSON}
      className={theme}
      onInject={onInject}
      onWorkspaceChange={onWorkspaceChange}
    />
  );
}
