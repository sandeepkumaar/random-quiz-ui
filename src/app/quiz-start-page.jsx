import { Form } from 'react-router-dom';


export default function QuizStartPage() {
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
        <Form className='form' method='post' action='/questions'>
          <p className='mb-1'> Please Enter the number of questions</p>
          <div className='flex justify-content-evenly'>
            <input className='input-sm input--border' name="count" type='number' required defaultValue='0'></input>
            <button className='btn-md btn--border primary' type='submit'>START</button>
          </div>
        </Form>
      </section>
    </>

  )
}

