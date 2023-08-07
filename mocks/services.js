import { rest } from 'msw';
import { delayRes } from './utils';
import groupBy from 'just-group-by';
import localforage from 'localforage';


const host = 'http://localhost:4000'

import { questions } from './quiz-list.js'

const randomiseArray = function(arr=[], count=0) {
  let tempArray = arr.slice(0);
  let randomArray = [];
  //let loopCount = 0;
  while(count-- > 0) {
    //loopCount++;
    // when we reach the last element in tempArray
    if(tempArray.length === 1) {
      randomArray.push(tempArray.pop());
      break;
    }
    // if randon index is last index, retry
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * tempArray.length)
    } while (randomIndex === tempArray.length - 1 )

    let randomItem = tempArray[randomIndex];
    tempArray[randomIndex] = tempArray.pop();
    randomArray.push(randomItem);
    //console.log({ loopCount, randomIndex, randomItem, tempArray, randomArray, tempLength: tempArray.length });
  };
  //console.log('final',  { tempArray, randomArray});
  return randomArray;
};

//let questionsById = {};
const createQuestions = rest.post(`${host}/questions/create`, async function(req, res, ctx) {
  await localforage.clear();
  const {count} = req.body;
  let randomQuizList = randomiseArray(questions, Number(count));
  randomQuizList = randomQuizList.map((q, index) => ({
    ...q,
    index
  }));

  //const { count } = Object.fromEntries(req.url.searchParams);
  //let ids = randomQuizs.map(({question_id}) => question_id);
  //let questionsById = groupBy(randomQuizs, ({question_id}) => question_id);
  //await localforage.setItem('questionsById', questionsById);
  //console.log('asdfsdfsfd', questionsById);
  await localforage.setItem('randomQuizList', randomQuizList);
  let ids =  randomQuizList.map(({question_id}) => question_id);
  return delayRes(
    ctx.status(200),
    ctx.json({
      ok: true,
      totalCount: randomQuizList.length,
      ids,
    })
  )
})

const fetchQuestion = rest.get(`${host}/questions/:id`, async function(req, res, ctx) {
  let {id} = req.params;
  let randomQuizList = await localforage.getItem('randomQuizList');
  //let question = questionsById[id] ?  questionsById[id][0] : {} ;
  //let quiz = randomQuizList[index];

  //console.log('fetchQuestion', id);
  let quiz = randomQuizList.find(({question_id}) => {
    //console.log(question_id);
    return question_id === Number(id);
  })

  return delayRes(
    ctx.status(200),
    ctx.json({
      ok: true,
      quiz
    })
  )
})

const updateAnswer = rest.put(`${host}/questions`, async function(req, res, ctx) {
  let {id, userAnswerIndex} = req.body;
  let randomQuizList = await localforage.getItem('randomQuizList');
  let quiz = randomQuizList.find(({question_id}) => {
    //console.log(question_id);
    return question_id === Number(id);
  })

  
  let isCorrect = false;
  if(quiz.answer_index === userAnswerIndex) {
    isCorrect = true;
  };
  quiz = {...quiz, isCorrect, userAnswerIndex};
  
  let quizIndex = quiz.index;
  randomQuizList[quizIndex] = quiz;
  await localforage.setItem('randomQuizList', randomQuizList);

  return delayRes(
    ctx.status(200),
    ctx.json({
      ok: true,
      quiz,
    })

  )
})

const updateAnswerError = rest.put(`${host}/questions`, async function(req, res, ctx) {
return delayRes(
  ctx.status(500),
  ctx.json({
    ok: false,
    status: 500,
    statusText: 'Internal Server Error',
    message: 'Simulated Internal Server Error ',
  })

)


})
const fetchResults = rest.get(`${host}/results`, async function(req, res, ctx) {
  let randomQuizList = await localforage.getItem('randomQuizList');
  //let values = Object.values(questionsById);

  return delayRes(
    ctx.status(200),
    ctx.json(randomQuizList)
  )
})
const handlers = [
  createQuestions,
  fetchQuestion,
  updateAnswer,
  //updateAnswerError,
  fetchResults,

];

export default handlers;
