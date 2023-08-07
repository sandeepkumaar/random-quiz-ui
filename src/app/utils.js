
import localforage from 'localforage';

export async function getNextQuizId(id) {
  let quizIdList = await localforage.getItem('quizIdList');
  let currentIdIndex = quizIdList.findIndex((_id) => Number(_id) === Number(id))
  return quizIdList[currentIdIndex + 1];
};

export async function clearStorage(id) {
  return await localforage.clear();
};
