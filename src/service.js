import createFetchJson from './fetch';
const fetchJson = createFetchJson('http://localhost:4000');

export async function fetchRandomQuestions(count=0) {
  return fetchJson(`/random/questions?count=${count}`, { method: 'GET'});
};
