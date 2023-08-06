import { useOutletContext, useLoaderData } from 'react-router-dom'
import { fetchQuestion }  from '../service';

export async function loader({request, params}) {
  console.log('loader is loaded', params);
  return fetchQuestion(params.id);
}
export async function action({request, params}) {
  console.log('action invoked', params);
  return null;

}


export default function QuestionForm() {
  let { onQuestionSubmit } = useOutletContext();
  let  question = useLoaderData();

  let handleSubmit = function(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formObj = Object.fromEntries(formData);
    onQuestionSubmit(formObj);
  }

  return (
    <>
      <section className='feedback mb-4'>
      </section>
      <section className='question-answer '>
        <form onSubmit={handleSubmit}>
          <div className='card card--border'>
            <p className='bold mb-3'> 
              {question.question}
            </p>
            <div className='input-group'>
              <div className='input-container'>
                <input type='radio' name='x' value='Options1' className='mr-1'></input>
                <label htmlFor='x' className='color-black'>Options1</label>
              </div>
            </div>
          </div>
          <div>
            <button className='btn-md btn--border primary' type='submit'>SUBMIT</button>
          </div>
        </form>
      </section>
    </>
  );
}
