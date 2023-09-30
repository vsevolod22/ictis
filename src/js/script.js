// const menuActive = document.querySelector('.menu');
// const hamburgerActive = document.querySelector('.hamburger');
// console.log(menuActive);

// hamburgerActive.addEventListener('click', el => {
//     el.currentTarget.classList.toggle('hamburger_active');
//     menuActive.classList.toggle('menu_active');
// })

const links = document.querySelectorAll('ul');


links.forEach(link => {
    link.addEventListener('click', el => {
       el.target.classList.toggle('hover');
       el.target.querySelectorAll('li').forEach(link => {
        link.classList.toggle('hide');
       })
       el.target.querySelectorAll('ul').forEach(link => {
        link.classList.toggle('hide');
       })
       el.target.querySelectorAll('span').forEach(span => {
        span.classList.toggle('rotate');
       });
    });
});

// document.getElementById('davaToday').valueAsDate = new Date();
// Добавление полей для каждого человека в зависимости от количества
document.getElementById('numPeople').addEventListener('input', el => {
const numPeople = el.currentTarget.value;
const peopleFields = document.getElementById('peopleFields');
peopleFields.innerHTML = '';

if (numPeople > 0 && numPeople < 30) {
    for (let i = 1; i <= numPeople; i++) {
        const personFields = document.createElement('div');
        personFields.innerHTML = `
            <h2 class="businessTrip__title">Человек ${i}</h2>
            <label id="first__label" for="fullName${i}">ФИО:</label>
            <input class="input" type="text" id="fullName${i}" name="fullName${i}" required><br><br>
    
            <label for="position${i}">Должность:</label>
            <input class="input" type="text" id="position${i}" name="position${i}" required><br><br>
    
            <label for="department${i}">Кафедра:</label>
            <input class="input" type="text" id="department${i}" name="department${i}" required><br><br>
    
            <label for="email${i}">Email-адрес:</label>
            <input class="input" type="email" id="email${i}" name="email${i}" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"><br><br>
    
            <label for="phone${i}">Номер телефона:</label>
            <input required="" class="input" id="phonenumber${i}" type="tel" name="phonenumber${i}" value="+7 (___) ___-__-__" pattern="^\\+7 \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}$">




        `;
        
        peopleFields.appendChild(personFields);
    }


}

});
// Функция открытия модального окна
function eventModalOpen(selector) {
    const modal = document.querySelector(selector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Функция закрытия модального окна
function eventModalClose(selector) {
    const modal = document.querySelector(selector);
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function postData(url = '', data = {}) {
    
    // Опции запроса, включая метод, заголовки и тело запроса (в данном случае JSON-данные)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  

    return fetch(url, options)
      .then(response => response.json())
      .catch(error => {
        console.error('Ошибка при отправке запроса:', error);
        throw error;
      });
  }
  
  const form = document.getElementById('travelForm');
  form.addEventListener('submit', event => {
      event.preventDefault();
  
      const formData = new FormData(form);

      const jsonData = {};
      formData.forEach((value, key) => {
          jsonData[key] = value;
      });
  
      jsonData.numPeople = formData.get('numPeople');
      jsonData.people = [];
  
      for (let i = 1; i <= jsonData.numPeople; i++) {
          const personData = {
              fullName: formData.get(`fullName${i}`),
              position: formData.get(`position${i}`),
              department: formData.get(`department${i}`),
              email: formData.get(`email${i}`),
              phonenumber: formData.get(`phonenumber${i}`)
          };
          jsonData.people.push(personData);
      }
  
      postData('http://localhost:5000/requests', jsonData)
          .then(data => {
              console.log(data);
              alert('Данные отправлены')
              form.reset();
          })
          .catch(error => {
              console.error('Ошибка при отправке запроса:', error);
          });
  });
  $(document).ready(function() {

	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});