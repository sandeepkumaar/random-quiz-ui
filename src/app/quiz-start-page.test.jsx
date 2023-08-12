import test from 'tape';
import {
  domRenderWithRouterProvider,
  LocationDisplay,
} from '../../test/utils'

import { redirect } from 'react-router-dom';
import {  waitFor, fireEvent } from '@testing-library/react';
import QuizStartPage, { createQuestionsAction }  from './quiz-start-page.jsx';

testAction.called = 0
async function testAction({request}) {
  testAction.called = testAction.called + 1;
  return redirect('/questions/1');;
};
test('<QuizForm/> submit', async assert => {

  let routes = [
        {
          path: '/',
          element: <QuizStartPage />,
          action: createQuestionsAction,
        },
        {
          path: "/questions/:id",
          element: <LocationDisplay/>,
        },
  ];
  const { screen, user } = domRenderWithRouterProvider(routes, assert.teardown);
  let searchInput = await screen.getByDisplayValue('5');

  {

    let desc = 'OnInitialRender; Should display default count as 5';
    let expected = '5';
    assert.same(searchInput.value, expected, desc);
  }

  {

    let desc = 'OnSubmit with count 21; Should not submit the form as its not between 5-20';
    let startButton = await screen.getByText('Start');
    //let expected = '5';
    await user.clear(searchInput);
    await user.type(searchInput, "21");
    await user.click(startButton);
    let input = await screen.getByDisplayValue('21');
    assert.same(input.value, "21", desc);
  }
  {

    let desc = 'OnSubmit with count 10; Should submit the form and redirect to QuizForm';
    let startButton = await screen.getByText('Start');
    await user.clear(searchInput);
    await user.type(searchInput, "10");
    await user.click(startButton);
    let locationEl = await waitFor(async () => screen.getByTestId('location-display'), {timeout: 5000});
    assert.same(locationEl.innerText, '/question/10', desc);
  }
})
