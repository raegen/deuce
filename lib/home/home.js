define(['page', 'router'], function (Page, router) {
    var page = new Page('lib/home/home.html', 'Home'),
        form = page.element.querySelector('#form');

    form.onsubmit = function () {
        this.action = '#play/' + this.querySelector('[name=username]').value + '/' + this.querySelector('[name=difficulty]:checked').value;
    };

    return page;
});
