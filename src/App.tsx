import { CssBaseline, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';

import BlocklyPanel from './components/Blockly';
//import CodeAnalysis from './components/CodeAnalysis';
import { CodeEditor } from './components/CodeEditor';
import { Header } from './components/Top';

//const initialCode = `def verifier_et_afficher(nombres):
//  for nombre in nombres:
//      if nombre % 2 == 0:
//          print(f"{nombre} est pair.")
//      else:
//          print(f"{nombre} est impair.")
//  print("Fin de la vérification.")
//
//# Liste de nombres à vérifier
//nombres = [1, 2, 3, 4, 5]
//
//# Appel de la fonction
//verifier_et_afficher(nombres)
//`

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // Vous pouvez personnaliser davantage le thème ici
  },
  // Autres personnalisations possibles
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // Personnalisation du thème sombre
  },
  // Autres personnalisations
});

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [workspace, setWorkspace] = useState<any>(null)
  const [code, setCode] = useState<string>("")
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Grid container>
        <Grid item xs={12} md={6}>
            <BlocklyPanel theme={theme} setWorkspace={setWorkspace} setCode={setCode}/>
        </Grid>
        <Grid item xs={12} md={6}>
            <CodeEditor code={code} theme={theme} workspace={workspace}/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
