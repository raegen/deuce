define(['page', 'router'], function (Page, router) {
    var page = new Page('lib/home/home.html', 'Home'),
        form = page.element.querySelector('#form');

    form.querySelector('button').addEventListener('click', function () {
        var data = new FormData(form);

        router().setRoute('play/' + data.get('username') + '/' + data.get('difficulty'));
    });

    return page;
});
