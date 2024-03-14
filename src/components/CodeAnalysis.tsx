import React, { useState } from 'react';
import { TreeCursor } from '@lezer/common';
import { parser as PythonParser } from '@lezer/python';

import TextField from '@mui/material/TextField';

interface ASTNode {
  type: string;
  children?: ASTNode[];
  value : string
}

type CodeAnalysisProps = {
  code : string
}

export const parseInput = (code : string) : string => {
  const tree = PythonParser.parse(code);
  if (tree) {
    const cursor = tree.cursor();
    const ast = JSON.stringify(astToJSON(code, cursor), null, 2)
    console.log(ast)
    return ast;
  } else {
    return 'Le code Python est invalide.';
  }
};

const astToJSON = (code : string, cursor: TreeCursor): ASTNode => {
  const result: ASTNode = { type: cursor.type.name, value: code.slice(cursor.from, cursor.to) };

  if (cursor.firstChild()) { // Enter the first child if it exists
    result.children = [];
    do {
      result.children.push(astToJSON(code, cursor)); // Recursively call astToJSON
    } while (cursor.nextSibling()); // Continue while there are next siblings

    cursor.parent(); // After processing all children, return to the parent
  }

  return result;
};

type BlocklyBlock = any; // Utilisez un type approprié pour les blocs Blockly.

type BlockFold = [ BlocklyBlock[], [ string, number ][], number ]
const empty = (id : number) : BlockFold => [[], [], id]

/**
 * Folds Lezer AST children (list of nodes)
 * @param chilren
 * @param var_id
 * @returns list of blocks, list of vars, new identifier
 */
const foldChilren = (chilren : ASTNode[] | undefined, var_id : number) : BlockFold => {
  if (chilren === undefined) throw new Error("No Children Node")
  return chilren.reduce((acc, node) => {
    const [block, vars, new_id] = mapNodeToBlockly(node, acc[2])
    return [ [ ...acc[0], block ], acc[1].concat(vars), new_id ]
  }, empty(var_id))
}

/**
 * [ N1, N2, N3, … ] → { N1.next : { N2.next : { N3.next : { … } } } }
 * @param root root node to attach first child to
 * @param children
 * @returns root node with first child attached as next
 */
const foldChildrenAsNext = (children : BlocklyBlock[] | undefined) : BlocklyBlock => {
  if (children === undefined) throw new Error("No Children Node")
  return children.reduceRight((acc, node) => {
    return { ...node, next : acc }
  })
}

/**
 * [ N1, N2, N3, … ] → { L0: N1, L1 : N2, L2 : N3, … }
 * @param root root node to add children to
 * @param children
 * @param label Label prefix ('L' above)
 * @returns
 */
const foldChildrenAsMember = (root : BlocklyBlock, children : BlocklyBlock[] | undefined, label : string) : BlocklyBlock => {
  if (children === undefined) throw new Error("No Children Node")
  return children.reduce((acc, node) => {
    acc[0][label + acc[1]] = node
    return [acc[0], acc[1] + 1]
  }, [root, 0])[0]
}

function mapNodeToBlockly(node: ASTNode, id : number): BlockFold {

  switch (node.type) {
    case "Script": {
      // Root node
      if (node.children === undefined) throw new Error("Invalid script")
      const [ blocks, vars, new_id ] = foldChilren(node.children, id)
      return [ [{
        blocks: {
          languageVersion: 0,
          blocks: foldChildrenAsNext(blocks.filter((b: any) => { return b.length > 0 })),
        },
        variables: vars.map(v => {
          return  {
            name: v[0],
            id: "nid_" + v[1]
          }
        }),
      }], vars, new_id ];
    }
    case "AssignStatement": {
      const name = node.children?.at(0)?.value
      if (name === undefined) throw new Error("Invalid Assign")
      const [ blocks, vars, new_id ] = foldChilren(node.children?.slice(2), id)
      return [ [{
        type: "variables_set",
        id: "nid_" + new_id,
        fields: {
          VAR: {
            id: "nid_" + (new_id + 1)
          }
        },
        inputs: {
          VALUE: {
            block: blocks[0][0]
          }
        }
      }], [ ...vars, [name, new_id + 1] ], new_id + 2 ] // a variable has been created
    }
    case "ArrayExpression": {
      const  [ blocks, vars, new_id ] = foldChilren(node.children?.filter(node => {
        return !['[', ',', ']'].includes(node.type)
      }), id)
      return [ [{
        type: "lists_create_with",
        id: "nid_" + new_id,
        extraState: {
          itemCount: blocks.length
        },
        inputs: foldChildrenAsMember({}, blocks.flat().map((b : any) => { return { block: b }}), "ADD")
      }], vars, new_id + 1]
    }
    case "Number": {
      return [ [{
        type: "math_number",
        id: "nid_" + id,
        fields: {
          NUM: Number.parseInt(node.value)
        }
      }], [], id + 1]
    }
    case "String": {
      return [ [{
        type: "text",
        id: "nid_" + id,
        fields: {
          TEXT: node.value
        }
      }], [], id + 1]
    }
    case "ExpressionStatement": {
      if (node.children?.at(0) === undefined) throw new Error("Invalid Expression")
      return mapNodeToBlockly(node.children[0], id)
    }
    case "CallExpression": {
      const name = node.children?.at(0)?.value
      if (name === undefined) throw new Error("Invalid call expression")
      if (name === 'print') {
        const  [ blocks, vars, new_id ] = foldChilren(node.children?.filter(node => {
          return !['(', ',', ')'].includes(node.type)
        }), id)
        return [ [{
          type: "text_print",
          id: "nid_" + new_id,
          inputs: {
            TEXT: {
              shadow: blocks.at(0)
            }
          }
        }], vars, new_id + 1]
      } else {
        console.warn(`CallExpression non géré`);
        return empty(id);
      }
    }
    // Ajoutez des cas pour les autres types de nœuds...

    default:
      console.warn(`Type de nœud non géré: ${node.type}`);
      return empty(id); // Retournez un objet vide ou lancez une erreur selon votre besoin
  }
}

export function pythonCodeToBlockly(code : string) : BlocklyBlock {
  const ast = PythonParser.parse(code);
  if (ast) {
    const cursor = ast.cursor();
    const root = astToJSON(code, cursor)
    const blocks = mapNodeToBlockly(root, 0)[0]
    return blocks.at(0)
  }
}

const CodeAnalysis = ({ code } : CodeAnalysisProps) => {
  const [output, setOutput] = useState('');

  return (
    <div>
      <h1>Application React avec Parser Lezer pour Python</h1>
      <button onClick={() => parseInput(code)}>Analyser</button>
      <div>
        <h2>Résultat de l'analyse :</h2>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          value={output}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeAnalysis;
