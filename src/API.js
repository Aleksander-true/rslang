
const BASE_URL = 'https://rslang-app-team-9.herokuapp.com/'

export const createUser = async user => {
  const rawResponse = await fetch(BASE_URL + '/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json(); 
  
  console.log(content);
};


export const loginUser = async user => {
  const rawResponse = await fetch(BASE_URL + '/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();

  console.log(content);
};