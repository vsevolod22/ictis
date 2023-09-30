"use strict";

// const menuActive = document.querySelector('.menu');
// const hamburgerActive = document.querySelector('.hamburger');
// console.log(menuActive);
// hamburgerActive.addEventListener('click', el => {
//     el.currentTarget.classList.toggle('hamburger_active');
//     menuActive.classList.toggle('menu_active');
// })
var links = document.querySelectorAll('ul');
links.forEach(function (link) {
  link.addEventListener('click', function (el) {
    el.target.classList.toggle('hover');
    el.target.querySelectorAll('li').forEach(function (link) {
      link.classList.toggle('hide');
    });
    el.target.querySelectorAll('ul').forEach(function (link) {
      link.classList.toggle('hide');
    });
    el.target.querySelectorAll('span').forEach(function (span) {
      span.classList.toggle('rotate');
    });
  });
}); // document.getElementById('davaToday').valueAsDate = new Date();
// Добавление полей для каждого человека в зависимости от количества

document.getElementById('numPeople').addEventListener('input', function (el) {
  var numPeople = el.currentTarget.value;
  var peopleFields = document.getElementById('peopleFields');
  peopleFields.innerHTML = '';

  if (numPeople > 0 && numPeople < 30) {
    for (var i = 1; i <= numPeople; i++) {
      var personFields = document.createElement('div');
      personFields.innerHTML = "\n            <h2 class=\"businessTrip__title\">\u0427\u0435\u043B\u043E\u0432\u0435\u043A ".concat(i, "</h2>\n            <label id=\"first__label\" for=\"fullName").concat(i, "\">\u0424\u0418\u041E:</label>\n            <input class=\"input\" type=\"text\" id=\"fullName").concat(i, "\" name=\"fullName").concat(i, "\" required><br><br>\n    \n            <label for=\"position").concat(i, "\">\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C:</label>\n            <input class=\"input\" type=\"text\" id=\"position").concat(i, "\" name=\"position").concat(i, "\" required><br><br>\n    \n            <label for=\"department").concat(i, "\">\u041A\u0430\u0444\u0435\u0434\u0440\u0430:</label>\n            <input class=\"input\" type=\"text\" id=\"department").concat(i, "\" name=\"department").concat(i, "\" required><br><br>\n    \n            <label for=\"email").concat(i, "\">Email-\u0430\u0434\u0440\u0435\u0441:</label>\n            <input class=\"input\" type=\"email\" id=\"email").concat(i, "\" name=\"email").concat(i, "\" required pattern=\"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$\"><br><br>\n    \n            <label for=\"phone").concat(i, "\">\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430:</label>\n            <input required=\"\" class=\"input\" id=\"phonenumber").concat(i, "\" type=\"tel\" name=\"phonenumber").concat(i, "\" value=\"+7 (___) ___-__-__\" pattern=\"^\\+7 \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}$\">\n\n\n\n\n        ");
      peopleFields.appendChild(personFields);
    }
  }
}); // Функция открытия модального окна

function eventModalOpen(selector) {
  var modal = document.querySelector(selector);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
} // Функция закрытия модального окна


function eventModalClose(selector) {
  var modal = document.querySelector(selector);
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function postData() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Опции запроса, включая метод, заголовки и тело запроса (в данном случае JSON-данные)
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch(url, options).then(function (response) {
    return response.json();
  })["catch"](function (error) {
    console.error('Ошибка при отправке запроса:', error);
    throw error;
  });
}

var form = document.getElementById('travelForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  var formData = new FormData(form);
  var jsonData = {};
  formData.forEach(function (value, key) {
    jsonData[key] = value;
  });
  jsonData.numPeople = formData.get('numPeople');
  jsonData.people = [];

  for (var i = 1; i <= jsonData.numPeople; i++) {
    var personData = {
      fullName: formData.get("fullName".concat(i)),
      position: formData.get("position".concat(i)),
      department: formData.get("department".concat(i)),
      email: formData.get("email".concat(i)),
      phonenumber: formData.get("phonenumber".concat(i))
    };
    jsonData.people.push(personData);
  }

  postData('http://localhost:5000/requests', jsonData).then(function (data) {
    console.log(data);
    alert('Данные отправлены');
    form.reset();
  })["catch"](function (error) {
    console.error('Ошибка при отправке запроса:', error);
  });
});
$(document).ready(function () {
  //E-mail Ajax Send
  $("form").submit(function () {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php",
      //Change
      data: th.serialize()
    }).done(function () {
      alert("Thank you!");
      setTimeout(function () {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });
});