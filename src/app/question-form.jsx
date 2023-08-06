import { useState, useEffect } from 'react';
import { useOutletContext, useLoaderData, useFetcher, useActionData } from 'react-router-dom'
import { fetchQuestion, updateAnswer }  from '../service';

export async function loader({request, params}) {
  //console.log('loader is loaded', params);
  return fetchQuestion(params.id);
}
export async function action({request, params}) {
  let formData = await request.formData();
  let {userAnswerIndex, ...formObj} = Object.fromEntries(formData);
  console.log(formObj);
  return updateAnswer({...formObj, userAnswerIndex: Number(userAnswerIndex)});
}

function Timer({init})  {
  let [time, setTime] = useState(init);
  let [ intervalId, setIntervalId ] = useState();
  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);
    setIntervalId(intervalId);
    return function() {
      clearInterval(intervalId);
    };
  }, [init])

  useEffect(() => {
    console.log('time expired', time, time < 0, intervalId);
    if(time <= 0) {
      clearInterval(intervalId);
    }
  }, [time])

  return (
    <div>
      <time className='timer'>{time}</time>
    </div>
  )
};


export default function QuestionForm() {
  let { onQuestionSubmit  } = useOutletContext();
  let questionObject = useLoaderData() || {};
  let actionData = useActionData();
  let fetcher = useFetcher();

  let {
    question_id: id, 
    question, 
    choices=[],
    userAnswerIndex,
    hint,
    isCorrect,
    index,
  } = questionObject;

  console.log(questionObject);

  //let handleSubmit = function(e) {
  //  e.preventDefault();
  //  let formData = new FormData(e.target);
  //  let formObj = Object.fromEntries(formData);
  //  onQuestionSubmit({id, ...formObj});
  //}

  return (
    <>
      <section className='feedback flex mb-2 mt-5 min-width-560'>
        <h6 className='h6 flex-max color-blue'>Hint: {hint}</h6>
        <Timer init={10}/>
      </section>
      <section className='question-answer '>
        <fetcher.Form method='post'>
          <div className='card card--border mb-2'>
            <p className='bold mb-3'> 
              {index + 1}. {question}
            </p>
            <div className='input-group flex justify-content-evenly flex-wrap'>
              { choices.map((choice, i) => (
                <div className='input-container mb-1 mr-1' key={i}>
                  <input 
                    type='radio' 
                    name='userAnswerIndex' 
                    value={i} 
                    className='mr-1' 
                    defaultChecked={(i === userAnswerIndex)}
                    disabled={isCorrect !== undefined}
                  >
                  </input>
                  <label htmlFor='answer' className='color-black'>{choice}</label>
                </div>
              ))
              }
            </div>
          </div>
          <div className='flex justify-content-center'>
            <button 
              className='btn-md btn--border primary mr-3' 
              type='submit' 
              name='id' 
              value={id}
              disabled={isCorrect !== undefined}
            >
              SUBMIT
            </button>
            <button 
              className='btn-md btn--border secondary' 
              type='submit' 
              name='id' 
              value={id}
            >
              NEXT
            </button>
          </div>
        </fetcher.Form>
      </section>
    </>
  );
}
