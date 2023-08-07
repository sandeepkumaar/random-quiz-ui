import { useState, useEffect, useRef } from 'react';
import { useOutletContext, useLoaderData, useFetcher, useActionData, useSubmit, useNavigate, redirect } from 'react-router-dom'
import { fetchQuestion, updateAnswer }  from '../service';
import Timer from './timer.jsx';

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
  let {userAnswerIndex, ...formObj} = Object.fromEntries(formData);
  console.log({userAnswerIndex, ...formObj});
  return updateAnswer({...formObj, userAnswerIndex: Number(userAnswerIndex)})
}


function Feedback({hintMessage, expiredMessage, responseMessage}) {
  if(responseMessage) {
    return <h6 className='h6 flex-max color-blue'>{responseMessage}</h6>
  };
  if(expiredMessage) {
    return <h6 className='h6 flex-max color-red'>Time Expired</h6>
  };
  if(hintMessage) {
    return <h6 className='h6 flex-max color-blue'>Hint: {hintMessage}</h6>
  };
  return <h6 className='h6 flex-max color-blue'>Choose one option</h6>

}

export default function QuizForm() {
  let {  onNextQuestion  } = useOutletContext();
  let quiz = useLoaderData() || {};
  let fetcher = useFetcher();
  let submit = useSubmit();
  let ref = useRef();

  let [expiredMessage, setExpiredMessage ] = useState('');
  let [hintMessage, setHintMessage ] = useState('');

  let {
    question_id: id, 
    question, 
    choices=[],
    userAnswerIndex,
    hint,
    isCorrect,
    index,
    answer_index,
  } = quiz;



  //console.log(questionObject);
  let handleHintTimeEvent = function() {
    setHintMessage(hint);
  };

  let handleTimerExpiry = function() {
    console.log('expired');
    setHintMessage('');
    setExpiredMessage('Time Expired!! Auto Submitting...');
    fetcher.submit(ref.current);
  };
  let isSubmitted = isCorrect !== undefined;
  let initialTimer = isSubmitted ? 0 : 30;
  let responseMessage = isSubmitted && (isCorrect ? `You are correct!! Ans: ${choices[answer_index]}`: `Wrong answer :( Right Answer: ${choices[answer_index]}`)
  

  let handleNext = function(e) {
    e.preventDefault();
    onNextQuestion();
  };

  return (
    <>
      <section className='feedback flex mb-2 mt-4'>
        <Feedback hintMessage={hintMessage} expiredMessage={expiredMessage} responseMessage={responseMessage}/>
        <Timer key={id}init={initialTimer} onTimerExpiry={handleTimerExpiry} onHintTimeEvent={handleHintTimeEvent}/>
      </section>
      <section className='question-answer full-width'>
        <fetcher.Form method='post' ref={ref} >
          <div className='card card--border mb-2'>
            <p className='bold mb-3'> 
              {index + 1}. {question}
            </p>
            <div className='input-group flex justify-content-evenly flex-wrap'>
              { choices.map((choice, i) => (
                <div className='input-container mb-1 mr-2' key={choice + i}>
                  <input 
                    type='radio' 
                    name='userAnswerIndex' 
                    value={i} 
                    className='mr-1' 
                    disabled={isCorrect !== undefined}
                  >
                  </input>
                  <label htmlFor='userAnswerIndex' className='color-black'>{choice}</label>
                  <input type='hidden' name='id' value={id}></input>
                </div>
              ))
              }
            </div>
          </div>
          <div className='flex justify-content-center'>
            <button 
              className='btn-md btn--border primary mr-3' 
              type='submit' 
              name='intent' 
              value='update'
              disabled={isCorrect !== undefined}
            >
              SUBMIT
            </button>
            <button 
              className='btn-md btn--border secondary' 
              name='intent' 
              value='navigate'
              onClick={handleNext}
            >
              NEXT
            </button>
          </div>
        </fetcher.Form>
      </section>
    </>
  );
}