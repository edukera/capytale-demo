import { TreeCursor } from '@lezer/common';
import { parser as PythonParser } from '@lezer/python';

/* ***************************************************************************
* Lezer AST to local simple AST
******************************************************************************/
interface ASTNode {
  type: string;
  children?: ASTNode[];
  value : string
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

/* ***************************************************************************
* AST to Blockly
******************************************************************************/

type BlocklyBlock = any; // Utilisez un type approprié pour les blocs Blockly.

type Vars = [ string, number ][]

type BlockFold = [ BlocklyBlock[], Vars, number ]

const empty = (vars : Vars, id : number) : BlockFold => [[], vars, id]

/**
 * Folds Lezer AST children (list of nodes)
 * @param chilren
 * @param var_id
 * @returns list of blocks, list of vars, new identifier
 */
const foldChildren = (chilren : ASTNode[] | undefined, vars : Vars, id : number) : BlockFold => {
  if (chilren === undefined) throw new Error("No Children Node")
  return chilren.reduce((acc, node) => {
    const [block, new_vars, new_id] = mapNodeToBlockly(node, acc[1], acc[2])
    return [ [ ...acc[0], block ], new_vars, new_id ]
  }, empty(vars, id))
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
    return { ...node, next : { block : acc } }
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

const map_logical_operator = (op : string) : string => {
  switch (op) {
    case "==" : return "EQ"
    case "!=" : return "NEQ"
    case "<"  : return "LT"
    case "<=" : return "LTE"
    case ">"  : return "GT"
    case ">=" : return "GTE"
  }
  return "EQ"
}

const isLogical = (op : string) : boolean => {
  return ["==", "!=", "<", "<=", ">", ">="].includes(op)
}

function mapNodeToBlockly(node: ASTNode, vars: Vars, id: number): BlockFold {

  switch (node.type) {
    case "Script": {
      // Root node
      if (node.children === undefined) throw new Error("Invalid script")
      const [ blocks, new_vars, new_id ] = foldChildren(node.children, vars, id)
      return [ [{
        blocks: {
          languageVersion: 0,
          blocks: [ foldChildrenAsNext(blocks.filter((b: any) => { return b.length > 0 }).flat()) ],
        },
        variables: new_vars.map(v => {
          return  {
            name: v[0],
            id: "nid_" + v[1]
          }
        }),
      }], new_vars, new_id ];
    }
    case "AssignStatement": {
      const name = node.children?.at(0)?.value
      if (name === undefined) throw new Error("Invalid Assign")
      const [ blocks, new_vars, new_id ] = foldChildren(node.children?.slice(2), vars, id)
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
      }], new_vars.concat([[name, new_id + 1]]), new_id + 2 ] // a variable has been created
    }
    case "ArrayExpression": {
      const  [ blocks, new_vars, new_id ] = foldChildren(node.children?.filter(node => {
        return !['[', ',', ']'].includes(node.type)
      }), vars, id)
      return [ [{
        type: "lists_create_with",
        id: "nid_" + new_id,
        extraState: {
          itemCount: blocks.length
        },
        inputs: foldChildrenAsMember({}, blocks.flat().map((b : any) => { return { block: b }}), "ADD")
      }], new_vars, new_id + 1]
    }
    case "Number": {
      return [ [{
        type: "math_number",
        id: "nid_" + id,
        fields: {
          NUM: Number.parseInt(node.value)
        }
      }], vars, id + 1]
    }
    case "String": {
      return [ [{
        type: "text",
        id: "nid_" + id,
        fields: {
          TEXT: node.value.replace(/^"|"$/g, '')
        }
      }], vars, id + 1]
    }
    case "ParenthesizedExpression": {
      if (node.children?.at(1) === undefined) throw new Error("Invalid Expression")
      return mapNodeToBlockly(node.children[1], vars, id)
    }
    case "ExpressionStatement": {
      if (node.children?.at(0) === undefined) throw new Error("Invalid Expression")
      return mapNodeToBlockly(node.children[0], vars, id)
    }
    case "CallExpression": {
      const name = node.children?.at(0)?.value
      if (name === undefined) throw new Error("Invalid call expression")
      if (name === 'print') {
        const  [ blocks, new_vars, new_id ] = foldChildren(node.children?.at(1)?.children?.filter(node => {
          return !['(', ',', ')'].includes(node.type)
        }), vars, id)
        return [ [{
          type: "text_print",
          id: "nid_" + new_id,
          inputs: {
            TEXT: {
              shadow: blocks.at(0).at(0)
            }
          }
        }], new_vars, new_id + 1]
      } else {
        console.warn(`CallExpression non géré`);
        return empty(vars, id);
      }
    }
    case "ForStatement": {
      if (node.children?.at(0)?.type === 'for' && node.children?.at(2)?.type === 'in') {
        // create new loop var
        const loop_var = node.children?.at(1)?.value
        if (loop_var === undefined) throw new Error("Invalid for in statement")
        const loop_var_id = "nid_" + id
        const new_vars = vars.concat([[ loop_var, id ]])
        // fold list variable (index 3)
        const list_variable_node = node.children?.at(3)
        if (list_variable_node === undefined) throw new Error("Invalid for in statement")
        const [ list_var_block, new_vars2, new_id ] = foldChildren([list_variable_node], new_vars, id + 2)
        // fold children
        const [ blocks, new_vars3, new_id2 ] = foldChildren(node.children.at(4)?.children, new_vars2, new_id)
        return [ [{
          type: "controls_forEach",
          id: "nid_" + (id + 1),
          fields: {
            "VAR": {
              "id": loop_var_id
            }
          },
          inputs: {
            LIST: {
              block: list_var_block[0][0]
            },
            DO: {
              block: foldChildrenAsNext(blocks.flat())
            }
          },
        }], new_vars3, new_id2 + 1]
      } else {
        console.warn(`ForStatement non géré`);
        return empty(vars, id);
      }

    }
    case "VariableName": {
      const var_name = node.value
      // search id in vars
      const var_id = vars.reduce((acc, v) => {
        return (v[0] === var_name) ? v[1] : acc
      }, -1)
      if (var_id === -1) {
        return empty(vars, id);
      } else return [ [{
        type: "variables_get",
        id: "nid_" + id,
        fields: {
          VAR: {
            id: "nid_" + var_id
          }
        }
      }], vars, id + 1 ]
    }
    case "BinaryExpression": {
      const left  = node.children?.at(0)
      const op    = node.children?.at(1)
      const right = node.children?.at(2)
      if (left === undefined || op === undefined || right === undefined) throw new Error("Invalid BinaryExpression")
      const [ left_block, left_vars, left_id ]   = foldChildren([left], vars, id)
      const [ right_block, right_vars, right_id] = foldChildren([right], left_vars, left_id)
      if (isLogical(op.value)) {
        return [ [{
          type: "logic_compare",
          id: "nid_" + right_id,
          fields: {
            OP: map_logical_operator(op.value)
          },
          inputs: {
            A: {
              block: foldChildrenAsNext(left_block)[0]
            },
            B: {
              block: foldChildrenAsNext(right_block)[0]
            }
          }
        }], right_vars, right_id + 1]
      } else if (op.value === "%") {
        return [ [{
          type: "math_modulo",
          id: "nid_" + right_id,
          inputs: {
            DIVIDEND: {
              shadow: foldChildrenAsNext(left_block)[0]
            },
            DIVISOR: {
              shadow: foldChildrenAsNext(left_block)[0]
            }
          }
        }], right_vars, right_id + 1]
      } else {
        console.warn(`Type d'opération non géré: ${op.value}`);
        return empty(vars, id);
      }
    }
    // Ajoutez des cas pour les autres types de nœuds...

    default:
      console.warn(`Type de nœud non géré: ${node.type}`);
      return empty(vars, id); // Retournez un objet vide ou lancez une erreur selon votre besoin
  }
}

export function pythonCodeToBlockly(code : string) : BlocklyBlock {
  const ast = PythonParser.parse(code);
  if (ast) {
    const cursor = ast.cursor();
    const root = astToJSON(code, cursor)
    console.log(JSON.stringify(root, null,2))
    const blocks = mapNodeToBlockly(root, [], 0)[0]
    return blocks.at(0)
  }
}
