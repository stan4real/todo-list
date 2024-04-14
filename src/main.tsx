import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import store, {persistor} from './redux/store.ts'
import { Provider } from 'react-redux'
import Create from './components/pages/Create.tsx';
import Edit from './components/pages/Edit.tsx';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path:"/todo-list",
    element:<App/>
  },
  {
    path:"/todo-list/create",
    element:<Create/>
  },
  {
    path:"/todo-list/edit/:id",
    element:<Edit/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
