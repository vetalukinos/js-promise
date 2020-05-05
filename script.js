document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {

        const getData = () => {

            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', './cars.json');
                request.setRequestHeader('Content-type', 'application/json');
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        const data = JSON.parse(request.responseText); //данные
                        data.cars.forEach(item => {
                            if (item.brand === select.value) {
                                const {brand, model, price} = item;
                                output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                            }
                        });
                        resolve(data);

                    } else {
                        reject(request.statusText);
                    }
                });
                request.send();
            });

        };


        getData()
            .then()
            .catch(() => {
                output.innerHTML = 'Произошла ошибка';
            });

    });

});