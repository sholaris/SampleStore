import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {Provider} from 'react-redux'
import store from './redux/store'
import App from './App';
import { CssBaseline } from '@material-ui/core'

const client = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={client}>
      <Provider store={store}>
          <BrowserRouter>
            <CssBaseline/>
            <App />
          </BrowserRouter>
      </Provider>
    </QueryClientProvider>, 
    document.getElementById('root'));

