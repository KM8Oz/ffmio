import React from 'react'
const doc = {height:window.innerHeight,width:window.innerWidth}
//console.info('doc:',doc);

const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee",
      Rnd:{
        width:Number((doc.width / 3.5).toFixed()),
        height:doc.height - 40
    }
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    },
    
  };
  
const ThemeContext = React.createContext(themes.light);
 export  {
    ThemeContext,
    themes
}
//   function App() {
//     return (
//       <ThemeContext.Provider value={themes.dark}>
//         <Toolbar />
//       </ThemeContext.Provider>
//     );
//   }
  
//   function Toolbar(props) {
//     return (
//       <div>
//         <ThemedButton />
//       </div>
//     );
//   }
  
//   function ThemedButton() {
//     const theme = useContext(ThemeContext);
//     return (
//       <button style={{ background: theme.background, color: theme.foreground }}>
//         I am styled by theme context!
//       </button>
//     );
//   }