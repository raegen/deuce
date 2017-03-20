define(['page', 'router'], function (Page, router) {
    var page = new Page('lib/home/home.html', 'Home'),
        form = page.element.querySelector('#form');

    form.querySelector('#play').addEventListener('click', function () {
        var data = new FormData(form);

        if (document.getElementById('username').checkValidity()) {
            router().setRoute('play/' + data.get('username') + '/' + data.get('difficulty'));
        }
    });

    page.element.querySelector('#playOuter').addEventListener('click', function () {
        var data = new FormData(form);

        console.log(data);
        page.element.querySelector('#testing').innerHTML = 'play/' + form.querySelector('[name=username]').value + '/' + form.querySelector('[name=difficulty]:checked').value;
        window.location.hash = 'play/' + form.querySelector('[name=username]').value + '/' + form.querySelector('[name=difficulty]:checked').value;
    });

    return page;
});
