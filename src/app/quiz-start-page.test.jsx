
import test from 'tape';
import {
  domRenderWithRouterProvider,
  LocationDisplay,
} from '../../test/utils'


//import { SearchForm }  from './search-form.jsx';
import App from './index.jsx'
import QuizStartPage, { createQuestionsAction }  from './quiz-start-page.jsx';
import QuizForm, { quizLoader, submitAnswerAction } from './quiz-form.jsx';

test.skip('Test Env', async assert => {
  assert.same(process.env.NODE_ENV, 'test', 'Test Environment')
  
})

test('<SearchForm/> submit', async assert => {

  testAction.called = 0
  async function testAction({request}) {
    testAction.called = testAction.called + 1;
    return null;
  };

  let routes = [
    {
      path: "/",
      element: (
        <>
          <App />
          <LocationDisplay />
        </>
    ),
      children: [
        {
          index: true,
          element: <QuizStartPage />,
          action: testAction,
        },
        {
          path: "/questions/:id",
          element: <LocationDisplay/>,
        },
      ]
    },
  ];
  const { screen, user } = domRenderWithRouterProvider(routes, assert.teardown);
  let searchInput = await screen.getByDisplayValue('5');
  {

    let desc = 'should display no.of questions as 5 by default';
    let expected = '5';
    assert.same(searchInput.value, expected, desc);
  }

  {

    let desc = 'should not allowed to enter more than 15';
    let startButton = await screen.getByText('Start');
    //let expected = '5';
    await user.clear(searchInput);
    await user.type(searchInput, "21");
    await user.click(startButton);
    //let locationEl = await screen.getByTestId('location-display');
    assert.same(testAction.called, 0, desc);
  }
  {

    let desc = 'should allow 5-15';
    let startButton = await screen.getByText('Start');
    //let expected = '5';
    await user.clear(searchInput);
    await user.type(searchInput, "10");
    await user.click(startButton);
    //let locationEl = await screen.getByTestId('location-display');
    assert.same(testAction.called, 1, desc);
  }
})
