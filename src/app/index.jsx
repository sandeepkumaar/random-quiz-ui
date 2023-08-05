import { Outlet, useLoaderData } from 'react-router-dom';


export function Loader({request}) {
  //
};

export function Action({request}) {
  //
}

export default function App() {
  const loaderData = useLoaderData();
  return (
    <div className='app-container app-container--single'>
      <header className="app__header header  primary">
        <h3 className='header__main h3'>Ancient Rome Quizz</h3>
      </header>

      <main className="app__main main background align-items-center">
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
          <form className='form'>
            <p className='mb-1'> Please Enter the number of questions</p>
            <div className='flex justify-content-evenly'>
              <input className='input-sm input--border' type='number' required value='0'></input>
              <button className='btn-md btn--border primary'>START</button>
            </div>
          </form>
        </section>

      </main>
    </div>
  );
}
