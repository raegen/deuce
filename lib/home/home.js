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

        page.element.querySelector('#testing').innerHTML = 'play/' + data.get('username') + '/' + data.get('difficulty');
        window.location.hash = 'play/' + data.get('username') + '/' + data.get('difficulty');
    });

    return page;
});
