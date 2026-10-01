const USERS_KEY = "et_users";
const CURRENT_KEY = "et_current_user";

function seedUsers(){
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "null");
  if(!users){
    localStorage.setItem(USERS_KEY, JSON.stringify([
      {id:"admin-1",name:"System Admin",email:"admin@expense.com",password:"admin123",role:"admin"},
      {id:"demo-1",name:"Demo User",email:"user@expense.com",password:"user123",role:"user"}
    ]));
  }
}
seedUsers();

function getUsers(){ return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
function saveUsers(users){ localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

function signupUser(name,email,password){
  const users=getUsers();
  if(users.some(u=>u.email.toLowerCase()===email.toLowerCase())) return {ok:false,message:"An account with this email already exists."};
  users.push({id:"u-"+Date.now(),name,email,password,role:"user"});
  saveUsers(users);
  return {ok:true,message:"Account created successfully. Redirecting to login..."};
}
function loginUser(email,password){
  const user=getUsers().find(u=>u.email.toLowerCase()===email.toLowerCase() && u.password===password);
  if(!user) return {ok:false,message:"Invalid email or password."};
  localStorage.setItem(CURRENT_KEY, JSON.stringify({id:user.id,name:user.name,email:user.email,role:user.role}));
  return {ok:true,message:"Login successful.",user};
}
function getCurrentUser(){ return JSON.parse(localStorage.getItem(CURRENT_KEY) || "null"); }
function logout(){ localStorage.removeItem(CURRENT_KEY); location.href="../index.html"; }
function requireRole(role){
  const user=getCurrentUser();
  if(!user){ location.href="../login.html"; return null; }
  if(role && user.role!==role){ location.href=user.role==="admin"?"../admin/dashboard.html":"../user/dashboard.html"; return null; }
  return user;
}
