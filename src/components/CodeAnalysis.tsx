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

const CodeAnalysis = ({ code } : CodeAnalysisProps) => {
  const [output, setOutput] = useState('');

  const parseInput = () => {
    const tree = PythonParser.parse(code);
    if (tree) {
      const cursor = tree.cursor();
      const ast = JSON.stringify(astToJSON(cursor), null, 2)
      setOutput(ast);
      console.log(ast)
    } else {
      setOutput('Le code Python est invalide.');
    }
  };

  const astToJSON = (cursor: TreeCursor): ASTNode => {
    const result: ASTNode = { type: cursor.type.name, value: code.slice(cursor.from, cursor.to) };

    if (cursor.firstChild()) { // Enter the first child if it exists
      result.children = [];
      do {
        result.children.push(astToJSON(cursor)); // Recursively call astToJSON
      } while (cursor.nextSibling()); // Continue while there are next siblings

      cursor.parent(); // After processing all children, return to the parent
    }

    return result;
  };


  return (
    <div>
      <h1>Application React avec Parser Lezer pour Python</h1>
      <button onClick={parseInput}>Analyser</button>
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
