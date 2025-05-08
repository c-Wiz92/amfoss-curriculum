const routes = {
    '/login': { templateId: 'login', title: 'Login'},
    '/dashboard': { templateId: 'dashboard', title: 'Bank DBoard'},
    '/credits': {templateId: 'credits', title: 'App credits'} // 
};
function navigate(path) {
    window.history.pushState({}, path, path);
    updateRoute();
}
function updateRoute() {
    const path = window.location.pathname;
    const route = routes[path];
    if (!route) {
        return navigate('/login');
    }
    const template = document.getElementById(route.templateId);
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    app.innerHTML = '';

    document.title = `${route.title}`;
    app.appendChild(view); //
  
    console.log(`Welcome to the ${route.title} page`);
}
function onLinkClick(event) {
    event.preventDefault();
    navigate(event.target.href);
}

window.onpopstate = () => updateRoute();
updateRoute();

// functions to register a user
async function register() {
    const registerForm = document.getElementById('registerForm');
    const formData = new FormData(registerForm);
    const jsonData = JSON.stringify(Object.fromEntries(formData));
    const result = await createAccount(jsonData);
  
    if (result.error) {
      return console.log('An error occurred:', result.error);
    }
  
    console.log('Account created!', result);
}

const user = document.getElementById('UserName').value;
console.log(user);

async function createAccount(account) {
  try{
    const validation = await fetch(`//localhost:5000/api/accounts/:${user}`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }, //
    })

    console.log(validation);

    if (validation.error){
      try {                                                                       
        const response = await fetch('//localhost:5000/api/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, //
          body: account
        });
        return await response.json();
    } catch (error){
      return {error: error.message}
    }
  } 
  
 } catch (error) {
      return { error: error.message || 'Unknown error' };
    }
}