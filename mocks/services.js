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
const fetchRandomQuestions = rest.get(`${host}/random/questions`, async function(req, res, ctx) {
  const { count } = Object.fromEntries(req.url.searchParams);
  let randomQuizs = randomiseArray(questions, Number(count));
  randomQuizs = randomQuizs.map((q, index) => ({
    ...q,
    index
  }));
  let ids = randomQuizs.map(({question_id}) => question_id);
  let questionsById = groupBy(randomQuizs, ({question_id}) => question_id);
  await localforage.setItem('questionsById', questionsById);
  //console.log('asdfsdfsfd', questionsById);
  return delayRes(
    ctx.status(200),
    ctx.json(ids)
  )
})

const fetchQuestion = rest.get(`${host}/random/question/:id`, async function(req, res, ctx) {
  let {id} = req.params;
  let questionsById = await localforage.getItem('questionsById');
  let question = questionsById[id] ?  questionsById[id][0] : {} ;

  return delayRes(
    ctx.status(200),
    ctx.json(question)
  )
})

const updateAnswer = rest.post(`${host}/random/question/answer`, async function(req, res, ctx) {
  let {id, userAnswerIndex} = req.body;
  let questionsById = await localforage.getItem('questionsById');
  let question = questionsById[id] ?  questionsById[id][0] : {} ;
  
  let isCorrect = false;
  if(question.answer_index === userAnswerIndex) {
    question.isCorrect = true;
  };
  question = {...question, isCorrect, userAnswerIndex};
  
  questionsById[id] = [question];
  await localforage.setItem('questionsById', questionsById);

  return delayRes(
    ctx.status(200),
    ctx.json(question)
  )
})

const handlers = [
  fetchRandomQuestions,
  fetchQuestion,
  updateAnswer,

];

export default handlers;
