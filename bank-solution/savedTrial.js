let account = null;

const routes = {
  "/login": { templateId: "login", title: "Login" },
  "/dashboard": { templateId: "dashboard", title: "Bank DBoard" },
  "/credits": { templateId: "credits", title: "App credits" }, //
};


function navigate(path) {
  window.history.pushState({}, path, path);
  updateRoute();
}


function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];
  if (!route) {
    return navigate("/login");
  }
  const template = document.getElementById(route.templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById("app");
  app.innerHTML = "";

  document.title = `${route.title}`;
  app.appendChild(view); //

  console.log(`Welcome to the ${route.title} page`);

  if (path === "/dashboard"){
    updateDashboard();
  }
}


function onLinkClick(event) {
  event.preventDefault();
  navigate(event.target.href);
}


window.onpopstate = () => updateRoute();
updateRoute();


// functions to register a user
async function register() {
  const registerForm = document.getElementById("registerForm");
  const formData = new FormData(registerForm);
  const jsonData = JSON.stringify(Object.fromEntries(formData));
  const result = await createAccount(jsonData);

  if (result.error) {
    return updateElement('registerError', result.error);
  }

  console.log("Account created!", result);

  account = result;
  navigate('/dashboard');
}


async function createAccount(account) {
  try {
    const response = await fetch("//localhost:5000/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, //
      body: account,
    });
    return await response.json();

  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}


async function login() {
    const loginForm = document.getElementById('loginForm')
    const user = loginForm.user.value;
    const data = await getAccount(user);
  
    if (data.error) {
        return updateElement('loginError', data.error);
    }
  
    account = data;
    navigate('/dashboard');
  }

async function getAccount(user) {
    try {
      const response = await fetch('//localhost:5000/api/accounts/' + encodeURIComponent(user));
      return await response.json();
    } catch (error) {
      return { error: error.message || 'Unknown error' };
    }
}


function updateElement(id, textOrNode) {
  const element = document.getElementById(id);
  element.textContent = ''; // Removes all children
  element.append(textOrNode);
}


function updateDashboard() {
  if (!account) {
    return navigate('/login');
  }

  updateElement('description', account.description);
  updateElement('balance', account.balance.toFixed(2));
  updateElement('currency', account.currency);

  const transactionsRows = document.createDocumentFragment();
  for (const transaction of account.transactions) {
  const transactionRow = createTransactionRow(transaction);
  transactionsRows.appendChild(transactionRow);
  }
  
  
  updateElement('transactions', transactionsRows);
}


function createTransactionRow(transaction) {
  const template = document.getElementById('transaction');
  const transactionRow = template.content.cloneNode(true);
  const tr = transactionRow.querySelector('tr');
  tr.children[0].textContent = transaction.date;
  tr.children[1].textContent = transaction.object;
  tr.children[2].textContent = transaction.amount.toFixed(2);
  return transactionRow;
}