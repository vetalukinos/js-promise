document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const input = document.getElementById('enter-text'),
        button = document.getElementById('button'),
        output = document.getElementById('output'),
        first = document.getElementById('1'),
        second = document.getElementById('2');
    let language = 'en-ru';

    first.addEventListener('click', () => {
        first.classList.add('checked');
        second.classList.remove('checked');
        language = 'en-ru';
        input.value = '';
        output.textContent = '';
    });
    second.addEventListener('click', () => {
        second.classList.add('checked');
        first.classList.remove('checked');
        language = 'ru-en';
        input.value = '';
        output.textContent = '';
    });


    button.addEventListener('click', () => {

        fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?' +
            'lang=' + language +
            '&key=trnsl.1.1.20200506T093210Z.2a4552b4090db8de.601e9bbc4858eaf0fd5427a00ec98321f307c154' +
            '&text=' + input.value, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                return(response.json());
            })
            .then((data) => {
                output.textContent = data.text.toString();
            })
            .catch((error) => console.log(error));
    });

});



