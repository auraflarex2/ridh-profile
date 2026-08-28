const toast=document.getElementById('toast');
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),1800)}
const views=document.getElementById('views');const key='ridh-profile-views';let count=Number(localStorage.getItem(key)||0);if(!sessionStorage.getItem('ridh-viewed')){count++;localStorage.setItem(key,count);sessionStorage.setItem('ridh-viewed','1')}views.textContent=count;
const soundBtn=document.getElementById('soundBtn');let soundOn=false;soundBtn.addEventListener('click',()=>{soundOn=!soundOn;soundBtn.querySelector('span').textContent=soundOn?'♫':'⌁';showToast(soundOn?'Sound enabled':'Sound muted')});
document.querySelectorAll('.socials a').forEach(a=>a.addEventListener('click',()=>showToast(`Opening ${a.getAttribute('aria-label')}`)));
const glow=document.querySelector('.cursor-glow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
requestAnimationFrame(()=>document.querySelector('.hero').classList.add('ready'));
