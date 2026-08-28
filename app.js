const toast=document.getElementById('toast');
function showToast(message){if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),1800)}
const views=document.getElementById('views');const key='ridh-profile-views';let count=Number(localStorage.getItem(key)||0);if(!sessionStorage.getItem('ridh-viewed')){count++;localStorage.setItem(key,count);sessionStorage.setItem('ridh-viewed','1')}if(views)views.textContent=count;
const soundBtn=document.getElementById('soundBtn');if(soundBtn){soundBtn.addEventListener('click',()=>{window.open('https://music.apple.com/us/album/na-ho-tum-single/6769815002','_blank','noopener,noreferrer');showToast('Opening Na Ho Tum')})}
document.querySelectorAll('.socials a').forEach(a=>a.addEventListener('click',()=>showToast(`Opening ${a.getAttribute('aria-label')}`)));
