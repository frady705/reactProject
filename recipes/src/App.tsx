import React from 'react';
import RouterCom from './components/RouterCom';
import ThemeProviderComponent from './components/ThemeProvider';


const App: React.FC = () => {
  return (
    <ThemeProviderComponent> 
       <RouterCom /> 
       </ThemeProviderComponent>
  );
};

export default App;
