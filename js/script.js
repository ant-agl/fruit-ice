$(document).ready(function() {
  // drink
  
  let k = 1;
  pasteHeaderSlogan(k-1);
  setInterval(function() {
    if (k >= 4) {
      k = 1;
      $('.drink').fadeIn(600);
      pasteHeaderSlogan(k-1);
    } else {
      $('.drink-' + k).fadeOut(600);    
      k++;
      pasteHeaderSlogan(k-1);
    }
  }, 3000);

  $("body").on("click", 'a[href^="#"]', function (event) { 
    event.preventDefault(); 
    let id = $(this).attr('href');
    if (id != '#') {
      let top = $(id).offset().top; 
      $('body,html').animate({scrollTop: top}, 300);
    }
  }); 

  $('.img[data-src]').each((i, item) => {
    $(item).css('background-image', 'url(' + $(item).data('src') + ')');
  })
});

function pasteHeaderSlogan(i) {
  let inscriptions = [
    'МММ...',
    'Как вкусно...',
    'Брр... Холодно',
    'Класс! Пойду<br> куплю еще!'
  ];
  $('.header-slogan__text').animate({'width': '0'}, 400)
  setTimeout(() => {
    $('.header-slogan__text').html(inscriptions[i]);
  }, 400);
  $('.header-slogan__text').animate({'width': '80%'}, 400)
}

function calculateTime(endDate) {
  endDate = endDate.getTime();
  let date = (new Date()).getTime();
  let diff = endDate - date;

  let d = '00';
  let h = '00';
  let m = '00';
  let s = '00';

  if (diff > 0) {
    d = Math.floor(diff / (1000*3600*24));
    if (d < 10) d = '0' + d;

    diff -= 1000*3600*24*Number(d);
    h = Math.floor(diff / (1000*3600));
    if (h < 10) h = '0' + h;

    diff -= 1000*3600*Number(h);
    m = Math.floor(diff / (1000*60));
    if (m < 10) m = '0' + m;

    diff -= 1000*60*Number(m);
    s = Math.floor(diff / (1000));
    if (s < 10) s = '0' + s;
  }

  return {
    d,
    h,
    m,
    s
  }
}
function replaceTimerData(data={}) {
  $('.promotion-timer .days').text(data.d);
  $('.promotion-timer .hours').text(data.h);
  $('.promotion-timer .minutes').text(data.m);
  $('.promotion-timer .seconds').text(data.s);
}
let endDate = new Date(2022, 11, 7);
replaceTimerData(calculateTime(endDate));
setInterval(() => {
  replaceTimerData(calculateTime(endDate));
}, 1000);