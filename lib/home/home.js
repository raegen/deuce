define(['page', 'router', 'integration'], function (Page, router) {
    var page = new Page('lib/home/home.html', 'Home'),
        form = page.element.querySelector('#form');

    form.onsubmit = function () {
        var data = new FormData(this);

        router().setRoute('play/' + data.get('username') + '/' + data.get('difficulty'));
        return false;
    };

    return page;
});
