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

import QuizStartPage , { createQuestionsAction }from './app/quiz-start-page.jsx';
import QuizList   from './app/quiz-list.jsx';
import QuizForm, { quizLoader, submitAnswerAction } from './app/quiz-form.jsx';
import ResultsPage, { resultLoader }  from './app/results.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<App/>}
      path='/'
      errorElement={<ErrorPage/>}
    >
      <Route
        index={true}
        element={<QuizStartPage />}
        action={createQuestionsAction}
      />
      <Route
        path="/questions/:id"
        element={<QuizForm />}
        loader={quizLoader}
        action={submitAnswerAction}
      />
      <Route
        path='/results'
        element={<ResultsPage/>}
        loader={resultLoader}
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
/*

<Route
  path=':id'
  element={<QuestionChild/>}
  loader={childLoader}
  action={childAction}
/>
*/
