// theme toggle
const toggle = document.getElementById('theme-toggle');
const html   = document.documentElement;
const saved  = localStorage.getItem('theme');
if (saved) html.classList.toggle('dark', saved === 'dark');
toggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});
// dynamic year

document.getElementById('year').textContent = new Date().getFullYear();

// copy coupon
document.getElementById('copy-btn').addEventListener('click', () => {
  navigator.clipboard.writeText('SILVAR').then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  });
});

// free spins

const cheapItems = [
  {name:'Lollipop',        img:'https://i.imgur.com/Lollipop.png'},
  {name:'Bubble Gum',      img:'https://i.imgur.com/BubbleGum.png'},
  {name:'Paper Hat',       img:'https://i.imgur.com/PaperHat.png'},
  {name:'Wooden Sword',    img:'https://i.imgur.com/WoodSword.png'},
  {name:'Plastic Ring',    img:'https://i.imgur.com/PlasticRing.png'},
  {name:'Toy Shield',      img:'https://i.imgur.com/ToyShield.png'},
  {name:'Candy',           img:'https://i.imgur.com/Candy.png'},
  {name:'Sticker Pack',    img:'https://i.imgur.com/Stickers.png'}
];

let picksLeft = 2;
let picked = [];

function openFreePickPopup(){
  picksLeft = 2;
  picked = [];
  document.getElementById('freePickPopup').style.opacity = 1;
  document.getElementById('freePickPopup').style.pointerEvents = 'auto';
  renderRow();
  updateUI();
}

function closeFreePickPopup(){
  document.getElementById('freePickPopup').style.opacity = 0;
  document.getElementById('freePickPopup').style.pointerEvents = 'none';
}

function renderRow(){
  const row = document.getElementById('pickRow');
  row.innerHTML = cheapItems.map((it,idx)=>
    `<div class="pick-card" onclick="selectItem(${idx})">
       <img src="${it.img}" alt=""><p>${it.name}</p>
     </div>`
  ).join('');
}

function selectItem(idx){
  if(picksLeft <= 0 || picked.includes(idx)) return;
  picked.push(idx);
  picksLeft--;
  document.querySelectorAll('.pick-card')[idx].classList.add('selected');
  updateUI();
}

function updateUI(){
  document.getElementById('counter').textContent = picksLeft === 0 ? '0 picks left' : `${picksLeft} pick${picksLeft>1?'s':''} left`;
  const btn = document.getElementById('actionBtn');
  if(picksLeft === 0){
    btn.textContent = 'Buy 1 for $3 → get 2 FREE';
    btn.disabled = false;
    btn.onclick = ()=> buyOneGetTwo();
  }else{
    btn.textContent = 'Pick an item';
    btn.disabled = true;
  }
}

function buyOneGetTwo(){
  alert(`You paid $3 and got:\n${picked.map(i=>cheapItems[i].name).join(', ')}`);
  closeFreePickPopup();
}
