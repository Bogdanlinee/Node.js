//======================================================================================================
//========================================== TASK 01 + 02 ==============================================

const rectangle = document.querySelector('#rect');

const btn_1 = document.querySelector('.btn-1');
btn_1.onclick = () => {
  rectangle.style.display = 'none';
}

const btn_2 = document.querySelector('.btn-2');
btn_2.onclick = () => {
  rectangle.remove();
}

const btn_3 = document.querySelector('.btn-3');
btn_3.onclick = () => {
  if (rectangle.classList.contains('hidden')) {
    rectangle.classList.remove('hidden');
    return;
  }
  rectangle.classList.add('hidden');
}

//======================================================================================================
//========================================== TASK 03 ===================================================

const btn_4 = document.querySelector('.btn-4');
btn_4.onclick = () => {
  const allRects = document.querySelectorAll('.rect');
  for (let element of allRects) {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      continue;
    }
    element.classList.add('hidden');
  }
}


//======================================================================================================
//========================================== TASK 04 ===================================================

const btn_5 = document.querySelector('.btn-5');
btn_5.onclick = () => {
  const inputValue = document.querySelector('input.input_5').value.trim();

  if (inputValue === '') {
    return;
  }

  const elementsHideShow = document.querySelectorAll(inputValue);

  for (let element of elementsHideShow) {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      continue;
    }
    element.classList.add('hidden');
  }
}

//======================================================================================================
//========================================== TASK 05 ===================================================

const yellowRect = document.querySelector('.rect.yellow');
yellowRect.addEventListener('click', f1);

function f1() {
  alert('Привет');
  yellowRect.removeEventListener('click', f1);
  yellowRect.addEventListener('click', f2);
}

function f2() {
  yellowRect.style.display = 'none';
  yellowRect.removeEventListener('click', f2);
  yellowRect.addEventListener('click', f1);
}

//======================================================================================================
//========================================== TASK 06 ===================================================

const redRect = document.querySelector('.rect.red');
const btn_6 = document.querySelector('.btn-6');

btn_6.onmouseover = () => {
  redRect.style.display = 'block';
}

btn_6.onmouseout = () => {
  redRect.style.display = 'none';
}

//======================================================================================================
//========================================== TASK 07 ===================================================

const greenRect = document.querySelector('.rect.green');
const input_7 = document.querySelector('.input_7');

input_7.onfocus = () => {
  greenRect.style.display = 'block';
}

input_7.oninput = () => {
  greenRect.style.display = 'none';
}

//======================================================================================================
//========================================== TASK 08 ===================================================

const image_8 = document.querySelector('.image-container_8 img');
const input_8 = document.querySelector('.input_8');
const button_8 = document.querySelector('.btn-8');

button_8.onclick = () => {
  image_8.src = input_8.value;
}

//======================================================================================================
//========================================== TASK 09 ===================================================

const image_9 = document.querySelector('.image-container_9');
const textArea_9 = document.querySelector('.text-a-9');
const button_9 = document.querySelector('.btn-9');

button_9.onclick = () => {
  const imagesArr = textArea_9.value.split('\n');

  for (let image of imagesArr) {
    const image_item = document.createElement('img');
    image_item.style.width = '100px';
    image_item.style.height = '150px';
    image_item.style.display = 'block';
    image_item.style.objectFit = 'contain';
    image_item.src = image;
    image_9.appendChild(image_item);
  }
}

//======================================================================================================
//========================================== TASK 10 + 11 + 12 =========================================

const coordinates_10 = document.querySelector('.coordinates_10');

document.onmousemove = (event) => {
  coordinates_10.textContent = `X: ${event.x}, Y: ${event.y}\n${window.navigator.language}`;
}

//======================================================================================================
//========================================== TASK 13 ===================================================

const values_to_store = document.querySelectorAll('.div_container_11 .element');

values_to_store[0].addEventListener('focusout', function () {
  localStorage.setItem('firstElem', this.textContent);
});
values_to_store[1].addEventListener('focusout', function () {
  sessionStorage.setItem('secondElement', this.textContent);
});
values_to_store[2].addEventListener('focusout', function () {
  document.cookie = `thrirdElement=${this.textContent}`;
});

window.onload = () => {
  values_to_store[0].textContent = localStorage.getItem('firstElem');
  values_to_store[1].textContent = sessionStorage.getItem('secondElement');
  let cookieValue = document.cookie.split(';');
  cookieValue = cookieValue.filter((item) => {
    if (item.includes('thrirdElement=')) {
      return true;
    }
  });
  values_to_store[2].textContent = cookieValue[0].split('=')[1];
}

//======================================================================================================
//========================================== TASK 14 ===================================================

const button_12 = document.querySelector('.btn-12');

document.addEventListener('scroll', function () {
  if (document.documentElement.offsetHeight === window.scrollY + window.innerHeight) {
    button_12.style.display = 'block';
    return;
  }
  button_12.style.display = 'none';
});

button_12.addEventListener('click', function () {
  scrollUp();
  function scrollUp() {
    if (scrollY <= 0) {
      return;
    }
    window.scrollBy(0, -20);
    setTimeout(function () {
      scrollUp();
    }, 10);
  }
});

//======================================================================================================
//========================================== TASK 15 ===================================================

document.querySelector('.block-13-1').addEventListener('click', function (event) {
  if (event.target.classList.contains('block-13-1')) {
    alert('hello');
  }
});
document.querySelector('.block-13-2').addEventListener('click', function (event) {
  if (event.target.classList.contains('block-13-2')) {
    alert('hello');
  }
});

//======================================================================================================
//========================================== TASK 16 ===================================================

const hider = document.querySelector('.hider-14');

document.querySelector('.btn-14').addEventListener('click', function () {
  hider.classList.add('hider-14-visible');
  (function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
  })();
});

document.querySelector('.hider-14').addEventListener('click', function () {
  hider.classList.remove('hider-14-visible');
  (function enableScroll() {
    window.onscroll = function () { };
  })();
});

//======================================================================================================
//========================================== TASK 17 ===================================================

document.querySelector('input[type=submit]').addEventListener('click', function (event) {
  event.preventDefault();
});

//======================================================================================================
//========================================== TASK 18 ===================================================

const inputFile = document.querySelector('#file-upload');
const lableForInput = document.querySelector('.custom-file-upload');

['drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop'].forEach((item) => {
  lableForInput.addEventListener(item, function (e) {
    e.preventDefault();
  })
});

lableForInput.addEventListener("dragenter", function (e) {
  e.preventDefault();
  lableForInput.classList.add('file-is-there');
});

lableForInput.addEventListener("dragleave", function (e) {
  e.preventDefault();
  lableForInput.classList.remove('file-is-there');
});

lableForInput.addEventListener("drop", function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  inputFile.dispatchEvent(new Event('change'));
});

inputFile.addEventListener('change', function () {
  if (inputFile.value !== '') {
    lableForInput.classList.add('file-is-there');
    return;
  }
  lableForInput.classList.remove('file-is-there');
});