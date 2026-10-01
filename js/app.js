const EXPENSES_KEY="et_expenses";
const BUDGETS_KEY="et_budgets";

function getExpenses(){return JSON.parse(localStorage.getItem(EXPENSES_KEY)||"[]")}
function saveExpenses(x){localStorage.setItem(EXPENSES_KEY,JSON.stringify(x))}
function getBudgets(){return JSON.parse(localStorage.getItem(BUDGETS_KEY)||"{}")}
function saveBudgets(x){localStorage.setItem(BUDGETS_KEY,JSON.stringify(x))}
function money(n){return "₹"+Number(n||0).toLocaleString("en-IN",{maximumFractionDigits:2})}
function monthKey(date){return date.slice(0,7)}
function currentMonth(){return new Date().toISOString().slice(0,7)}
function addExpense(userId,data){
  const arr=getExpenses();
  arr.push({id:"e-"+Date.now(),userId,...data,amount:Number(data.amount)});
  saveExpenses(arr);
}
function deleteExpense(id){saveExpenses(getExpenses().filter(e=>e.id!==id))}
function userExpenses(userId){return getExpenses().filter(e=>e.userId===userId)}
function monthExpenses(userId,month=currentMonth()){return userExpenses(userId).filter(e=>monthKey(e.date)===month)}
function totalExpenses(list){return list.reduce((s,e)=>s+Number(e.amount),0)}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
