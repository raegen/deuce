define(['page'], function (Page) {
    var page = new Page('lib/home/home.html', 'Home'),
        form = page.element.querySelector('#form');

    form.addEventListener('change', function () {
        var data = new FormData(this);

        this.setAttribute('action', '#play/' + data.get('username') + '/' + data.get('difficulty'))
    });

    return page;
});
