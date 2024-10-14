import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './redux/store'; // Import Redux store
import App from './App';
// import './styles/main.scss'; // Any styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap App with Provider */}
      <App/>
    </Provider>
  </React.StrictMode>
);
