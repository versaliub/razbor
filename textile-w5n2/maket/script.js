'use strict';
const dialog=document.querySelector('#info-dialog'),body=document.querySelector('#dialog-body');
const pages={
  ticket:['Получить билет','В рабочей версии эта кнопка откроет регистрацию посетителя. Она видна сразу в начале страницы и остаётся под рукой на телефоне.','Это отдельный макет: регистрация не выполняется, заявок организатору нет.'],
  catalogue:['Участники выставки','Здесь посетитель перейдёт в существующий каталог фабрик. Перестраивать сам каталог для этого варианта главной не требуется.','Существующий раздел: textile-salon.ru/fabriki/'],
  program:['Деловая программа','Быстрый переход к существующей программе. Архивные даты и материалы здесь не переписываются.','Существующий раздел: textile-salon.ru/program/'],
  application:['Мобильное приложение','Ссылки на приложение сохраняются в полезных разделах, но больше не конкурируют с основными действиями в верхней навигации.','Существующий раздел: textile-salon.ru/mobile/'],
  map:['Как добраться','ВДНХ, павильон №20. Москва, проспект Мира, д.119, стр.20. Метро «ВДНХ» и «Ботанический сад».','В рабочей версии здесь можно открывать карту по нажатию, не загружая её заранее.'],
  photos:['Фотографии выставки','В начале фотоблока — три понятных кадра вместо необходимости попадать в маленькие точки. Полный фоторепортаж остаётся отдельным разделом.','Существующий раздел: textile-salon.ru/fotoreportazh/'],
  contacts:['Связаться с организатором','Expo Fashion · +7 (499) 350-18-20 · +7 (925) 781-77-27 · mail@expo-fashion.ru','В рабочей версии номер откроет звонок, почта — письмо. В макете внешние действия заменены этим окном.'],
  languages:['Языковые версии','В этой концепции показана русская главная. Английская и турецкая сохраняются и потребуют согласованного перевода интерфейса.','Это не переключатель готовых переводов.'],
  consent:['Документ согласия','Показано место для ссылки на согласованный документ. Его содержание должен утвердить владелец; в этом макете юридический текст не создавался.','Галочка отключена, поскольку это демонстрация без отправки и обработки данных.'],
  privacy:['Политика конфиденциальности','В рабочей версии ссылка ведёт на соответствующий документ сайта. Юридические тексты не меняются автоматически при обновлении внешнего вида.','Здесь показано только размещение ссылки.'],
  'form-demo':['Демонстрация формы','Кнопка работает в режиме просмотра. Ничего не отправлено — ни письмо, ни заявка, ни данные в сторонние сервисы.','В рабочем сайте она использует проверенную форму с отдельной проверкой доставки письма.']
};
function openInfo(key){
  if(key==='explain'){
    body.innerHTML='<p class="dialog-meta">Бережное обновление главной</p><h2 id="dialog-title">Что я предлагаю изменить</h2><ol><li><strong>Объяснить выставку сразу.</strong> Короткое название, аудитория, даты и место находятся рядом.</li><li><strong>Два понятных действия.</strong> Билет и стенд видны на первом экране; на телефоне обе кнопки закреплены внизу.</li><li><strong>Разделить задачи посетителей.</strong> Покупатели материалов и участники выставки получают свои короткие блоки.</li><li><strong>Показать подтверждения.</strong> Цифры явно относятся к сентябрю2026, а не обещают состав будущей выставки.</li><li><strong>Сделать чтение спокойнее.</strong> Короткие абзацы, крупные ссылки и меньше конкурирующих элементов.</li><li><strong>Сохранить знакомое.</strong> Фирменный баннер сезона, прежние цвет, логотип, фотографии, контакты и разделы. Видео только по нажатию.</li></ol><p>Это предложение для обсуждения. На действующем сайте ничего не изменено. Рост обращений проверяется статистикой, а не обещается макетом.</p>';
  }else{
    const data=pages[key];if(!data)return;
    body.replaceChildren();
    const meta=document.createElement('p');meta.className='dialog-meta';meta.textContent='Отдельный макет · демонстрация';body.append(meta);
    const h=document.createElement('h2');h.id='dialog-title';h.textContent=data[0];body.append(h);
    data.slice(1).forEach(text=>{const p=document.createElement('p');p.textContent=text;body.append(p)});
  }
  dialog.showModal();
}
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openInfo(button.dataset.open)));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{body.replaceChildren();const h=document.createElement('h2');h.id='dialog-title';h.textContent='Фотография с выставки';const img=document.createElement('img');img.src=button.dataset.photo;img.alt=button.querySelector('img').alt;body.append(h,img);dialog.showModal()}));
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});
document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}));
document.querySelector('#demo-form').addEventListener('submit',event=>{event.preventDefault();openInfo('form-demo')});
document.querySelector('.video-details').addEventListener('toggle',event=>{if(!event.target.open)event.target.querySelector('video').pause()});
