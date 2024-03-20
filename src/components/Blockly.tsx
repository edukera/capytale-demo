import Blockly from "blockly";
import { pythonGenerator, Order } from 'blockly/python';
import React from 'react'
import { BlocklyWorkspace } from "react-blockly";
import * as Fr from 'blockly/msg/fr';

import ConfigFiles from "./toolbox/content";

import './Blockly.css'
Blockly.setLocale(Fr)

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
    Blockly.defineBlocksWithJsonArray([
      {
        "type": "unknown_code",
        "message0": "Code inconnu %1",
        "args0": [
          {
            "type": "field_input",
            "name": "TEXTE",
            "text": "Bonjour, Blockly!"
          }
        ],
        "colour":"#cccccc",
        "previousStatement": null,
        "nextStatement": null
      },
      {
        "type": "unknown_expr",
        "message0": "Expression inconnue %1",
        "args0": [
          {
            "type": "field_input",
            "name": "TEXTE",
            "text": "Bonjour, Blockly!"
          }
        ],
        "colour":"#cccccc",
        "output": null,
      },
      {
        "type": "range",
        "message0": "range %1",
        "args0": [
          {
            "type": "field_number",
            "name": "VALUE",
            "value": 0,
            "min": 0
          }
        ],
        "output": null,
        "colour": 260,
        "tooltip": "",
        "helpUrl": ""
      }
    ]);
    pythonGenerator.forBlock['unknown_code'] = function(block:any) {
      // Récupérer la valeur du champ texte.
      const texte = block.getFieldValue('TEXTE');
      // Créer la chaîne de code pour afficher le texte.
      const code = `${texte}\n`;
      // Le deuxième paramètre détermine l'ordre des opérations, mais n'est pas crucial ici.
      return code;
    }
    pythonGenerator.forBlock['unknown_expr'] = function(block:any) {
      // Récupérer la valeur du champ texte.
      const texte = block.getFieldValue('TEXTE');
      // Créer la chaîne de code pour afficher le texte.
      const code = `${texte}\n`;
      // Le deuxième paramètre détermine l'ordre des opérations, mais n'est pas crucial ici.
      return [code, Order.NONE ];
    }
    pythonGenerator.forBlock['range'] = function(block:any) {
      // Récupérer la valeur du champ texte.
      const texte = block.getFieldValue('VALUE');
      // Créer la chaîne de code pour afficher le texte.
      const code = `range(${texte})\n`;
      // Le deuxième paramètre détermine l'ordre des opérations, mais n'est pas crucial ici.
      return [code, Order.NONE ];
    }
    workspace.addChangeListener((e: CustomEvent) => {
      //const newJson = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
      //console.log(newJson)
      //console.log(e)
      if (e.isUiEvent && ((e.type === 'drag' && e.isStart === false) || e.type === 'click') ) {
        //console.log(e)
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
