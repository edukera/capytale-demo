import { TreeCursor } from '@lezer/common';
import { parser as PythonParser } from '@lezer/python';
import { create } from 'domain';

/* ***************************************************************************
* Lezer AST to local simple AST
******************************************************************************/
interface ASTNode {
  type: string;
  children?: ASTNode[];
  value: string
}

export const parseInput = (code : string) : string => {
  const tree = PythonParser.parse(code);
  if (tree) {
    const cursor = tree.cursor();
    const ast = JSON.stringify(astToJSON(code, cursor), null, 2)
    //console.log(ast)
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
const foldChildren = (chilren : ASTNode[] | undefined, vars : Vars, id : number, create_expr : boolean = true) : BlockFold => {
  if (chilren === undefined) return empty(vars, id)
  return chilren.reduce((acc, node) => {
    const [block, new_vars, new_id] = mapNodeToBlockly(node, acc[1], acc[2], create_expr)
    return [ [ ...acc[0], block ], new_vars, new_id ]
  }, empty(vars, id))
}

/**
 * [ N1, N2, N3, … ] → { N1.next : { N2.next : { N3.next : { … } } } }
 * @param root root node to attach first child to
 * @param children
 * @returns root node with first child attached as next
 */
const foldChildrenAsNext = (children : BlocklyBlock[] | undefined, filter : boolean = true) : BlocklyBlock => {
  if (children === undefined) throw new Error("No Children Node")
  // filter out variable_get nodes (makes Blockly crash)
  const nodes = filter ? children.filter(n => filter ? n.type !== "variables_get" && n.type !== "⚠" : false) : children
  if (nodes.length === 0) return get_unknown_code({ type:"", value: "" }, [], 4535435)[0][0]
  return nodes.reduceRight((acc, node) => {
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

const map_arithmetic_operator = (op : string) : string => {
  switch (op) {
    case "+" : return "ADD"
    case "-" : return "MINUS"
    case "*" : return "MULTIPLY"
    case "/" : return "DIVIDE"
    case "**": return "POWER"
  }
  return "ADD"
}

const isLogical = (op : string) : boolean => {
  return ["==", "!=", "<", "<=", ">", ">="].includes(op)
}

const isArithmetic = (op : string) : boolean => {
  return ["+", "-", "*", "/", "**"].includes(op)
}

type CondBody = [ ASTNode | undefined, (ASTNode | undefined)[] | undefined ]

type If = {
  base : CondBody;
  elif : CondBody[];
  el   : ASTNode[] | undefined
}

function isASTNode(value: ASTNode | undefined): value is ASTNode {
  return value !== undefined;
}

const make_if = (root : ASTNode) : If => {
  if (root.children?.at(0)?.type !== "if") throw new Error("Invalid IfStatement")
  const base : CondBody   = [ root.children.at(1), root.children.at(2)?.children?.slice(1) ]
  const elif : CondBody[] = []
  var   el   : ASTNode[] | undefined = undefined
  for (var i = 0; i < root.children?.slice(3).length; i++) {
    const node = root.children.at(i+3)
    if (node === undefined) throw new Error("Make if Error")
    if (node.type === 'elif') {
      const elifCondBody : CondBody = [ root.children.at(i+4), root.children.at(i+5)?.children?.slice(1) ]
      i += 2;
      elif.push(elifCondBody)
    } else if (node.type === 'else') {
      el = root.children.at(i+4)?.children?.slice(1)
      i += 2;
    }
  }
  return { base, elif, el }
}

const getBlockHeight = (block : any) : number => {
  if (block?.next !== undefined) {
    const height = block.next.block !== undefined ? getBlockHeight(block.next.block) : getBlockHeight(block.next)
    return 1 + height;
  } else if (block?.type !== undefined) {
    switch (block.type) {
      case "procedures_defnoreturn": {
        return 1 + getBlockHeight(block.inputs.STACK.block)
      }
      case "procedures_defreturn": {
        return 2 + getBlockHeight(block.inputs.STACK.block)
      }
      case "controls_if": {
        return Object.keys(block.inputs).reduce((acc, key) => {
          return acc + getBlockHeight(block.inputs[key].block)
        }, 1);
      }
    }
  }
  return 1
}

const unit_block_height = 30
const block_space = 30

const setBlockPositions = (blocks : BlocklyBlock[]) : BlocklyBlock[] => {
  return blocks.reduce(([acc_blocks, acc_height], block) => {
    block["x"] = 5
    const current_height = getBlockHeight(block)
    //console.log(`Height: ${current_height}`)
    const space = acc_height === 0 ? 5 : block_space
    const current_y = acc_height + space
    block["y"] = current_y
    return [ [ ...acc_blocks, block], current_y + current_height * unit_block_height]
  }, [ [], 0])[0]
}

type Routine = {
  name : string,
  args : string[],
  withReturn : boolean
}

var routines : Routine[] = []

const clear_routines = () => { routines = [] }

const get_unknown_code = (node: ASTNode, vars : Vars, id: number) : BlockFold => {
  return [ [{
    type: "unknown_code",
    id: "nid_" + id,
    fields: {
      TEXTE: node.value
    }
  }], vars, id + 1 ]
}

const get_unknown_expr = (node: ASTNode, vars : Vars, id: number) : BlockFold => {
  return [ [{
    type: "unknown_expr",
    id: "nid_" + id,
    fields: {
      TEXTE: node.value
    }
  }], vars, id + 1 ]
}

function mapNodeToBlockly(node: ASTNode, vars: Vars, id: number, create_expr : boolean = true): BlockFold {
  switch (node.type) {
    case "Script": {
      // Root node
      if (node.children === undefined) throw new Error("Invalid script")
      const [ blocks, new_vars, new_id ] = foldChildren(node.children.filter(n => { return n.type !== '⚠' }), vars, id, false)
      const [ defs, main_blocks ] = blocks.filter((b: any) => { return b.length > 0 }).flat().reduce((acc, node) => {
        if(["procedures_defnoreturn", "procedures_defreturn"].includes(node.type)) {
          return [ [...acc[0], node], acc[1] ]
        } else {
          return [ acc[0], [ ...acc[1], node ] ]
        }
      }, [[], []])
      const main = main_blocks.length > 0 ? foldChildrenAsNext(main_blocks) : []
      //console.log(getBlockHeight(main))
      // set blocks position
      const final_blocks = setBlockPositions([ ...defs, main ])
      return [ [{
        blocks: {
          languageVersion: 0,
          blocks: final_blocks,
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
      var var_id = "nid_" + (new_id + 1)
      var new_var : boolean = true
      if (vars.map(x => x[0]).includes(name)) {
        new_var = false
        const idx = vars.map(x => x[0]).indexOf(name)
        var_id = "nid_" + vars[idx][1]
      }
      const final_vars = new_var ? new_vars.concat([[name, new_id + 1]]) : new_vars
      const final_id   = new_var ? new_id + 2 : new_id + 1
      //console.log(blocks)
      return [ [{
        type: "variables_set",
        id: "nid_" + new_id,
        fields: {
          VAR: {
            id: var_id
          }
        },
        inputs: {
          VALUE: {
            block: blocks.length > 0 ? blocks[0][0] : get_unknown_expr({ type:"", value: "" }, [], 4535435)[0][0]
          }
        }
      }], final_vars, final_id ] // a variable has been created
    }
    case "UpdateStatement": {
      const name = node.children?.at(0)?.value
      const operator = node.children?.at(1)?.value
      if (name === undefined || operator === undefined) throw new Error("Invalid Update")
      var_id = "nid_"
      if (vars.map(x => x[0]).includes(name) && operator === '+=') {
        const idx = vars.map(x => x[0]).indexOf(name)
        var_id += vars[idx][1]
      } else {
        console.warn(`Type d'opération non géré: ${operator}`);
        return create_expr ? get_unknown_expr(node, vars, id) : get_unknown_code(node, vars, id)
      }
      const delta = node.children?.at(2)
      if(delta === undefined) throw new Error("Invalid Update")
      const [ delta_blocks, new_vars, new_id ] = foldChildren([delta], vars, id)
      return [ [{
        type: "math_change",
        id: "nid_" + new_id,
        fields: {
          VAR: {
            id: var_id
          }
        },
        inputs: {
          DELTA: {
            shadow: delta_blocks[0][0]
          }
        }
      }], new_vars, new_id]
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
          TEXT: node.value.replace(/^["']|["']$/g, '')
        }
      }], vars, id + 1]
    }
    case "ParenthesizedExpression": {
      if (node.children?.at(1) === undefined) throw new Error("Invalid Expression")
      return mapNodeToBlockly(node.children[1], vars, id)
    }
    case "ExpressionStatement": {
      if (node.children?.at(0) === undefined) throw new Error("Invalid Expression")
      if (node.children.length === 1 && node.children.at(0)?.type === 'VariableName') {
        return get_unknown_code(node, vars, id)
      }
      return mapNodeToBlockly(node.children[0], vars, id, create_expr)
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
      } else if (routines.map(r => r.name).includes(name)) {
        const  [ arg_blocks, new_vars, new_id ] = foldChildren(node.children?.at(1)?.children?.filter(node => {
          return !['(', ',', ')'].includes(node.type)
        }), vars, id)
        const args = foldChildrenAsMember({}, arg_blocks.flat().map((b : any) => { return { block: b }}), "ARG")
        return [ [{
          type: routines.reduce((acc,r) => { return r.name === name ? r.withReturn : acc }, false) ? "procedures_callreturn" : "procedures_callnoreturn",
          id: "nid_" + new_id,
          "extraState": {
            name: name,
            params: routines.reduce((acc,r) => { return r.name === name ? r.args : acc }, ([] as string[]))
          },
          "inputs": args
        }], new_vars, new_id ]
      } else {
        console.warn(`CallExpression non géré`);
        return create_expr ? get_unknown_expr(node, vars, id) : get_unknown_code(node, vars, id);
      }
    }
    case "ForStatement": {
      if (node.children?.at(0)?.type === 'for' && node.children?.at(2)?.type === 'in') {
        // create new loop var
        const loop_var = node.children?.at(1)?.value
        const loop_var_id = "nid_" + id
        if (loop_var === undefined) throw new Error("Invalid for in statement")
        const new_vars = vars.concat([[ loop_var, id ]])
        // fold list variable (index 3)
        const list_variable_node = node.children?.at(3)
        if (list_variable_node === undefined) throw new Error("Invalid for in statement")
        const [ list_var_block, new_vars2, new_id ] = foldChildren([list_variable_node], new_vars, id + 2)
        // fold children
        const [ blocks, new_vars3, new_id2 ] = foldChildren(node.children.at(4)?.children, new_vars2, new_id, false)
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
              block: foldChildrenAsNext(blocks.slice(1).flat())
            }
          },
        }], new_vars3, new_id2 + 1]
      } else {
        console.warn(`ForStatement non géré`);
        return get_unknown_code(node, vars, id);
      }

    }
    case "VariableName": {
      const var_name = node.value
      // search id in vars
      const var_id = vars.reduce((acc, v) => {
        return (v[0] === var_name) ? v[1] : acc
      }, -1)
      if (var_id === -1) {
        return get_unknown_expr(node, vars, id);
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
      if (right.type === '⚠') {
        console.warn(`Type d'opération non géré: ${op.value}`);
        return create_expr ? get_unknown_expr(node, vars, id) : get_unknown_code(node, vars, id);
      }
      const [ left_block, left_vars, left_id ]   = foldChildren([left], vars, id, create_expr)
      const [ right_block, right_vars, right_id] = foldChildren([right], left_vars, left_id, create_expr)
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
      } else if (isArithmetic(op.value)) {
        return [ [{
          type: "math_arithmetic",
          id: "nid_" + right_id,
          fields: {
            OP: map_arithmetic_operator(op.value)
          },
          inputs: {
            A: {
              shadow: foldChildrenAsNext(left_block)[0]
            },
            B: {
              shadow: foldChildrenAsNext(right_block)[0]
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
              shadow: foldChildrenAsNext(right_block)[0]
            }
          }
        }], right_vars, right_id + 1]
      } else {
        console.warn(`Type d'opération non géré: ${op.value}`);
        return get_unknown_expr(node, vars, id);
      }
    }
    case "IfStatement": {
      const ifStruct = make_if(node)
      //console.log(ifStruct)
      // fold conditions and bodies
      if (ifStruct.base[0] === undefined) throw new Error("Invalid IfStatement")
      const [ base_cond_blocks, base_cond_vars, base_cond_id ] = foldChildren([ifStruct.base[0]], vars, id)
      const [ base_do_blocks, base_vars, base_id ] = foldChildren(ifStruct.base[1]?.flat().filter(isASTNode), base_cond_vars, base_cond_id, false)
      //const [ base_blocks, base_vars, base_id ] = foldChildren(ifStruct.base.flat().filter(isASTNode), vars, id, false)
      const init_folded_cond_elif : [ BlocklyBlock[][], Vars, number ] = [ [], base_vars, base_id ]
      const [ elif_cond_blocks, elif_cond_vars, elif_cond_id ] = ifStruct.elif.reduce((acc, condprod) => {
        if (condprod[0] === undefined) throw new Error("Invalid IfStatement")
        const [elif_b, elif_v, elif_i] = foldChildren([condprod[0]], acc[1], acc[2])
        return [ [...acc[0], elif_b], elif_v, elif_i ]
      }, init_folded_cond_elif)
      const init_folded_do_elif : [ BlocklyBlock[][], Vars, number ] = [ [], elif_cond_vars, elif_cond_id ]
      const [ elif_do_blocks, elif_do_vars, elif_do_id ] = ifStruct.elif.reduce((acc, condprod) => {
        const [elif_b, elif_v, elif_i] = foldChildren(condprod[1]?.flat().filter(isASTNode), acc[1], acc[2], false)
        return [ [...acc[0], elif_b], elif_v, elif_i ]
      }, init_folded_do_elif)
      //const [ elif_blocks, elif_vars, elif_id ] = ifStruct.elif.reduce((acc, condprod) => {
      //  const [elif_b, elif_v, elif_i] = foldChildren(condprod.flat().filter(isASTNode), acc[1], acc[2])
      //  return [ [...acc[0], elif_b], elif_v, elif_i ]
      //}, init_folded_elif)
      const [ else_blocks, else_vars, else_id ] = ifStruct.el ? foldChildren(ifStruct.el?.flat().filter(isASTNode), elif_do_vars, elif_do_id, false) : empty(elif_do_vars, elif_do_id)
      const inputs : any = {}
      inputs["IF0"] = base_cond_blocks[0].length > 0 ? { block: base_cond_blocks[0][0] } : {}
      inputs["DO0"] = (base_do_blocks.length > 0) ? { block : foldChildrenAsNext(base_do_blocks.flat()) } : { block: get_unknown_code({ type:"", value: "" }, [], 4535435)[0][0] }
      elif_cond_blocks.forEach((elif_block, i) => {
        inputs["IF" + (i+1)] = elif_block[0].length > 0 ? { block: elif_block[0][0] } : {}
      })
      elif_do_blocks.forEach((elif_block, i) => {
        inputs["DO" + (i+1)] = elif_block.length > 0 ? { block: foldChildrenAsNext(elif_block.flat(), false) } : get_unknown_code({ type:"", value: "" }, [], 4535435)[0][0]
      })
      //elif_blocks.forEach((elif_block, i) => {
      //  inputs["IF" + (i+1)] = elif_block[0].length > 0 ? { block: elif_block[0][0] } : {}
      //  inputs["DO" + (i+1)] = elif_block.slice(1).length > 0 ? { block: foldChildrenAsNext(elif_block.slice(1).flat(), false) } : {}
      //})
      if(ifStruct.el) {
        inputs["ELSE"] = else_blocks.length > 0 ? { block: foldChildrenAsNext(else_blocks.flat()) } : { block: get_unknown_code({ type:"", value: "" }, [], 4535435)[0][0] }
      }
      return [ [{
        type: "controls_if",
        id: "nid_" + else_id,
        extraState: {
          elseIfCount: ifStruct.elif.length,
          hasElse: ifStruct.el !== undefined
        },
        inputs: inputs
      }], else_vars, else_id + 1]
    }
    case "FunctionDefinition": {
      const name          = node.children?.at(1)?.value
      const params        = node.children?.at(2)?.children?.filter(p => p.type === 'VariableName')
      const body_children = node.children?.at(3)?.children?.slice(1)
      if (name === undefined || params === undefined || body_children === undefined)
        throw new Error("Invalid FunctionDefinition")
      // check if return
      var withReturn = false
      var return_children : ASTNode[] | undefined = []
      if (body_children[body_children.length - 1].type === 'ReturnStatement') {
        withReturn = true
        return_children = body_children[body_children.length - 1].children?.slice(1)
      }
      // update routines
      routines.push({ name : name, args : params.map(p => p.value), withReturn: withReturn})
      // create param variables
      const init_acc : [ Vars, number ] = [ vars, id ]
      const [new_vars, new_id] : [ Vars, number ] = params.reduce((acc, node) => {
        const var_name = node.value
        const var_id = acc[1] + 1
        return [ [...acc[0], [ var_name, var_id ]], acc[1] + 2 ]
      }, init_acc)
      // fold body children
      if (withReturn) body_children.pop()
      const [final_blocks, final_vars, final_id] = foldChildren(body_children, new_vars, new_id, false)
      const [return_blocks, return_vars, return_id] = foldChildren(return_children, final_vars, final_id)
      if (return_blocks.length === 0) {
        return_blocks.push(get_unknown_expr({ type:"", value: "" }, [], 4535435)[0][0])
      }
      const procedure_block : any = {
        type: withReturn ? "procedures_defreturn" : "procedures_defnoreturn",
        id: "nid_" + id,
        extraState: {
          params: new_vars.map(x => { return { name : x[0], id : "nid_" + x[1] } })
        },
        icons: {
          comment: {
            text: "Describe this function...",
            pinned: false,
            height: 80,
            width: 160
          }
        },
        fields: {
          NAME: name
        },
        inputs: {
          STACK: {
            block: foldChildrenAsNext(final_blocks.flat(), false)
          }
        }
      }
      if (withReturn && return_children !== undefined) {
        procedure_block.inputs["RETURN"] = { block : foldChildrenAsNext(return_blocks.flat(), false) }
      }
      return [ [procedure_block ], return_vars, return_id ]
    }
    //case "⚠": {
    //  console.warn(`Type de nœud non géré: ${node.type}`);
    //  return empty(vars, id)
    //}
    // Ajoutez des cas pour les autres types de nœuds...
    default:
      console.warn(`Type de nœud non géré: ${node.type}`);
      if (create_expr) {
        return get_unknown_expr(node, vars, id); // Retournez un objet vide ou lancez une erreur selon votre besoin
      }
      else {
        return get_unknown_code(node, vars, id);
      }
  }
}

export function pythonCodeToBlockly(code : string) : BlocklyBlock {
  const ast = PythonParser.parse(code);
  if (ast) {
    const cursor = ast.cursor();
    const root = astToJSON(code, cursor)
    //console.log(JSON.stringify(root, null,2))
    clear_routines()
    const blocks = mapNodeToBlockly(root, [], 0)[0]
    //console.log(JSON.stringify(blocks.at(0), null, 2))
    return blocks.at(0)
  }
}
