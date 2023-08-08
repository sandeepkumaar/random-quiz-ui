import { useState, useEffect, useRef } from 'react';
import { useOutletContext, Form, useLoaderData, useFetcher, useActionData, useSubmit, useNavigate, redirect, useNavigation } from 'react-router-dom'
import { fetchQuestion, updateAnswer }  from '../service';
import QuizFeedback from './quiz-feedback.jsx';
import { getNextQuizId, clearStorage, getComponentState } from './utils.js';

export async function quizLoader({request, params}) {
  //console.log('loader is loaded', params);
  let {status, quiz } = await fetchQuestion(params.id);
  if(!quiz) {
    return redirect('/');
  }
  return quiz;

}

export async function submitAnswerAction({request, params}) {
  let formData = await request.formData();
  let formObj = Object.fromEntries(formData);
  let {userAnswerIndex, id } = formObj;
  let updateResp = await updateAnswer({...formObj, userAnswerIndex: Number(userAnswerIndex)})
    .catch(e => {
      console.log('error', e);
      return {
        ok: e.ok,
        status: e.status,
        message: e.message
      };
    })
  // onFetchSuccess redirect
  if(updateResp.ok) {
    let nextId = await getNextQuizId(id);
    console.log('nextId', nextId);
    if(!nextId) {
      await clearStorage
      return redirect('/results');
    };
    return redirect(`/questions/${nextId}`);
  }
  return updateResp;
}


export default function QuizForm() {
  //let {  onNextQuestion  } = useOutletContext();
  let quiz = useLoaderData();
  let fetcher = useFetcher();
  let submit = useSubmit();
  let ref = useRef();
  let actionData = useActionData();
  let navigation = useNavigation();
  let componentState = getComponentState(actionData, navigation);

  let {
    question_id: id, 
    question, 
    choices=[],
    userAnswerIndex,
    hint,
    isCorrect,
    index,
    answer_index,
  } = quiz || {};


  let handleTimerExpiry = function() {
    submit(ref.current)
  }
   
  console.log('componentState', componentState);
  const errorMessage = componentState === 'error' ? actionData?.message : undefined;
  const submitButtonText =
    componentState === "submitting"
    ? "Submitting..."
    : componentState === "submitted"
    ? "Submitted !!"
    : "Submit";

  return (
    <>
      <QuizFeedback id={id} hint={hint} key={id} onTimerExpiry={handleTimerExpiry} errorMessage={errorMessage}/>
      <section className='question-answer full-width'>
        <Form method='post' ref={ref} >
          <div className='card card--border mb-2'>
            <p className='bold mb-3'> 
              {index + 1}. {question}
            </p>
            <fieldset className='input-group flex justify-content-evenly flex-wrap' disabled={componentState === 'submitting' || componentState === 'submitted'}>
              { choices.map((choice, i) => (
                <div className='input-container mb-1 mr-2' key={choice + i}>
                  <input 
                    type='radio' 
                    name='userAnswerIndex' 
                    value={i} 
                    className='mr-1' 
                  >
                  </input>
                  <label htmlFor='userAnswerIndex' className='color-black'>{choice}</label>
                  <input type='hidden' name='id' value={id}></input>
                </div>
              ))
              }
            </fieldset>
          </div>
          <div className='flex justify-content-center'>
            <button 
              className='btn-md btn--border primary mr-3' 
              type='submit' 
              name='intent' 
              value='update'
              disabled={componentState === 'submitting' || componentState === 'submitted'}
            >
              {submitButtonText}
            </button>
          </div>
        </Form>
      </section>
    </>
  );
}
