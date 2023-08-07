import createFetchJson from './fetch';
const fetchJson = createFetchJson('http://localhost:4000');

//export async function fetchRandomQuestions(count=0) {
//  return fetchJson(`/random/questions?count=${count}`, { method: 'GET'});
//};

export async function createQuestions(count=0) {
  return fetchJson(`/questions/create`, { 
    method: 'POST',
    body: { count } 
  });
};
export async function fetchQuestion(id) {
  return fetchJson(`/questions/${id}`, { method: 'GET'});
};

export async function updateAnswer(payload) {
  return fetchJson(`/questions`, { 
    method: 'PUT', 
    body: payload
  });
};

export async function fetchResults() {
  return fetchJson(`/results`, { 
    method: 'GET'
  });
};
