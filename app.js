// app.js - demo client-side logic (no frameworks)
// sample data (similar to guide screenshot)
const sampleData = [
  {id:1, type:'افزایش اعتبار', amount:2000000, ref:'1234', date:'1404/07/19 ساعت 10:23'},
  {id:2, type:'برداشت از حساب', amount:40000000, ref:'1235', date:'1404/07/19 ساعت 12:45'},
  {id:3, type:'افزایش اعتبار', amount:500000, ref:'1236', date:'1404/07/19 ساعت 10:30'},
  {id:4, type:'افزایش اعتبار', amount:25000000, ref:'1237', date:'1404/07/19 ساعت 12:20'},
  {id:5, type:'برداشت از حساب', amount:8900000, ref:'1238', date:'1404/07/19 ساعت 17:35'},
  {id:6, type:'افزایش اعتبار', amount:450000, ref:'1239', date:'1404/07/19 ساعت 20:30'},
  {id:7, type:'افزایش اعتبار', amount:20000, ref:'1240', date:'1404/07/19 ساعت 15:15'},
  {id:8, type:'افزایش اعتبار', amount:4528000, ref:'1241', date:'1404/07/19 ساعت 19:10'},
  {id:9, type:'افزایش اعتبار', amount:5200000, ref:'1242', date:'1404/07/19 ساعت 21:05'},
  {id:10, type:'افزایش اعتبار', amount:9900000, ref:'1243', date:'1404/07/19 ساعت 23:43'}
];

const loadBtn = document.getElementById('load-btn');
const txSection = document.getElementById('transactions-section');
const emptySection = document.getElementById('empty-section');
const txBody = document.getElementById('tx-body');
const searchInput = document.getElementById('search');

function formatNumber(n){
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

function renderRows(data){
  txBody.innerHTML = '';
  data.forEach((r, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.id}</td>
      <td class="type ${r.type.includes('برداشت') ? 'withdraw' : 'increase'}">${r.type}</td>
      <td class="amount">${formatNumber(r.amount)}</td>
      <td>${r.ref}</td>
      <td>${r.date}</td>
    `;
    txBody.appendChild(tr);
  });
}

loadBtn.addEventListener('click', ()=>{
  // simulate server loading and then show table
  emptySection.classList.add('hidden');
  txSection.classList.remove('hidden');
  renderRows(sampleData);
});

searchInput.addEventListener('input', (e)=>{
  const q = e.target.value.trim();
  if(!q){ renderRows(sampleData); return; }
  const filtered = sampleData.filter(s => {
    return String(s.id).includes(q) || s.type.indexOf(q) !== -1 || String(s.ref).includes(q) || String(s.amount).includes(q);
  });
  renderRows(filtered);
});

// Support clicking header to sort by amount 
document.querySelectorAll('.tx-table th.sortable').forEach(th => {
  th.addEventListener('click', ()=>{
    // toggle order based on caret char
    const caret = th.querySelector('.caret');
    const asc = caret.textContent === '▾';
    const sorted = [...sampleData].sort((a,b)=> asc ? a.amount - b.amount : b.amount - a.amount);
    // flip caret
    caret.textContent = asc ? '▴' : '▾';
    renderRows(sorted);
  });
});