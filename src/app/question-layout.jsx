import { Outlet, useActionData } from 'react-router-dom';

export default function QuestionLayout() {
  let questionList = useActionData();
  console.log('layout use action', questionList);

  return (
    <Outlet context={{questionList}}/>
  )
}
