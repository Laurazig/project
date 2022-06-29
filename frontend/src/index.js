import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = document.querySelector("#root")


let output = (
  <div>
    <App />
  </div>
)
ReactDOM.render(output,root)



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();
