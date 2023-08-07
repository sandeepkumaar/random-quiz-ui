import { useEffect, useState } from 'react'
import { useLoaderData, useActionData, Outlet, useNavigate } from 'react-router-dom';
import { createQuestions} from '../service'


export default function Questions() {
  //let {} =  = useLoaderData();
  let actionData = useActionData();
  let [questionIds, setQuestionIds] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    if(!actionData) return;
    let {ids} = actionData || {};
    //console.log('--------', ids,);
    setQuestionIds(ids);
  }, [actionData])

  useEffect(() => {
    if(!questionIds) return;
    //console.log('nextIndex', currentIndex);
    let currentId = questionIds[currentIndex];
    if(currentId) {
      return navigate(`/questions/${currentId}`)
    };
    return navigate('/results');
  }, [currentIndex, questionIds])

  let handleNextClick = function() {
    //console.log('next question', currentIndex, questionIds);
    setCurrentIndex(prevIndex => {
      return prevIndex + 1;
    })
  }
  
  return (
    <> 
      <Outlet context={{
        onNextQuestion: handleNextClick
      }}/>
    </>
  )
}
