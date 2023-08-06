import { 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import '../css/index.css'
import App  from './app/index.jsx';
import ErrorPage from './error-page.jsx';

// Routes

import LandingPage from './app/landing-page.jsx';
import QuestionForm, {loader as questionLoader, action as updateAnswer } from './app/question-form.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App/>}
      errorElement={<ErrorPage/>}
    >
      <Route
        index={true}
        element={<LandingPage />}
      />
      <Route
        path='/questions/:id'
        element={<QuestionForm />}
        loader={questionLoader}
        action={updateAnswer}
      />
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

