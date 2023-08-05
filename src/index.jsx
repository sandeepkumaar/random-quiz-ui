import { 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import '../css/index.css'
import App from './app';
import ErrorPage from './error-page.jsx';

// Routes

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App/>}
      errorElement={<ErrorPage/>}
    >
      
    </Route>

  )
)


const mode = import.meta.env.MODE;
console.log('env mode', mode);

export default function Root() {
  return (
    <RouterProvider router={router}/>
  )
};

