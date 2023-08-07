import { Outlet } from 'react-router-dom';


export default function App() {
  return (
    <div className='app-container app-container--single'>
      <header className="app__header header  primary">
        <h3 className='header__main h3'>Ancient Rome Quizz</h3>
      </header>

      <main className="app__main main max-width-720 mr-center background align-items-center">
        <Outlet/>
      </main>
    </div>
  );
}

//onCountSubmit: handleCountSubmit, 
