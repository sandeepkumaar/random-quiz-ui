import { useLoaderData, Link } from 'react-router-dom'
import { fetchResults } from '../service';

export async function resultLoader({request, params}) {
  let questionList = await fetchResults();
  return { questionList };

}


export default function ResultsPage() {
  let {questionList} = useLoaderData();
  let correctAnswers = questionList.filter((question) => {
    return question.isCorrect;
  }).length;

  return (
    <>
      <section className='flex' style={{height: "50%"}}>
        <div style={{margin: 'auto'}}>
          <h5 className='h5'>Congratulations, You score is <span className='color-blue'>{correctAnswers}/{questionList.length}</span></h5>
        </div>
      </section>
      <Link to='/'> Back to Main</Link>
    </>

  )

}
