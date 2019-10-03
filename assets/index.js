'use strict';

const getData = _ => {
    getNews();

    // setInterval(_ => {
    //     document.getElementById('dateTime').innerText = moment().format('Do  MMMM  YYYY');
    //     document.getElementById('dateTime').innerText += '\n ' + moment().format('h:mm:ss A');
    // }, 1000)
    console.log('yusgduhshdbsh')

    setInterval(getNews, 1000 * 60 * 60)
}

const getNews = _ => {
    axios.get('/news')
        .then(response => {
            document.getElementById('news').innerHTML ="";
            for(let i=0; i<= 3; i++) {
                document.getElementById('news').innerHTML += `<div class="col s12"> ${response.data[i]}</div><br>`
            }
        })
        .catch(err => {
            console.log(err);
        });
}

setInterval( () => {
    axios.get('/messages')
    .then(response => {
        document.getElementById('marquee').innerText = response.data;
    })
}, 1000)