define(['page'], function (Page) {
    var page = new Page('lib/home/home.html', 'Home'),
        form = page.element.querySelector('#form');

    form.onsubmit = function (e) {
        var data = new FormData(this);

        e.preventDefault();

        window.location.hash = 'play/' + data.get('username') + '/' + data.get('difficulty');
        return false;
    };

    return page;
});
