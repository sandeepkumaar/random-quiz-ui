import { Form, redirect, useNavigation, useActionData } from 'react-router-dom';
import {createQuestions} from '../service'
import { getComponentState } from './utils.js';
import localforage from 'localforage'


export async function createQuestionsAction({request}) {
  let formData = await request.formData();
  let { count } = Object.fromEntries(formData);
  let resp =  await createQuestions(count);
  let {status, totalCount, ids } = resp;
  await localforage.setItem('quizIdList', ids);
  await localforage.setItem('quizListCount', totalCount);
  return redirect(`/questions/${ids[0]}`);
}

export default function QuizStartPage() {
  let navigation = useNavigation();
  let actionData = useActionData();
  let componentState = getComponentState(actionData, navigation);


  const submitButtonText =
    componentState === "submitting"
    ? "Get Ready..."
    : componentState === "submitted"
    ? "Go !!"
    : "Start";
  return (
    <>
      <h4 className='h4 text-center mb-4 mt-4'>Welcome to Roman Empire</h4>
      <section className='instruction card card--border flex-center-lr mb-2'>
        <h5 className='h5 mb-1'> Instructions</h5>
        <ul className='sub-2 ml-2'>
          <li>=> Each question has 4 multiple choices to choose from</li>
          <li>=> You have 30 seconds to answer</li>
          <li>=> You will be provided with a hint for the last 10 seconds.</li>
        </ul>
      </section>
      <section className='start-form'>
        <Form className='form' method='post'>
          <p className='mb-1'> Please Enter the number of questions</p>
          <div className='flex justify-content-evenly'>
            <input className='input-sm input--border' name="count" type='number' min='5' max='15' required defaultValue='5'></input>
            <button className='btn-md btn--border primary' type='submit'>{submitButtonText}</button>
          </div>
        </Form>
      </section>
    </>

  )
}

