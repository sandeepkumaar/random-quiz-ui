import { Route, Routes, Outlet, useLoaderData, useActionData, useNavigate, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react'

import { fetchRandomQuestions }  from '../service';


export default function App() {

  let [ questionList, setQuestionList ] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if(!questionList.length) return;

    let id = questionList[0];
    //console.log('effect', id, questionList); 
    navigate(`/questions/${id}`);
  }, [questionList])



  let handleCountSubmit = function({count}) {
    fetchRandomQuestions(Number(count)).then(resp => {
      setQuestionList(resp);
    })
  };

  //let handleQuestionSubmit = function(obj) {
  //  console.log('questionSubmit', obj);
  //  setSelectedIndex((prevIndex) => {
  //    return prevIndex + 1;
  //  })
  //}



  return (
    <div className='app-container app-container--single'>
      <header className="app__header header  primary">
        <h3 className='header__main h3'>Ancient Rome Quizz</h3>
      </header>

      <main className="app__main main max-width-720 mr-center background align-items-center">
        <Outlet context={{
          onCountSubmit: handleCountSubmit, 
          questionList,
        }}/>
      </main>
    </div>
  );
}

