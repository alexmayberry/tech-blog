console.log("loginBtn.js is connected!");

const loginBtnHandler = () => {
    document.location.replace('/login');
  };
  
  document
  .querySelector('#login')
  .addEventListener('click', loginBtnHandler);