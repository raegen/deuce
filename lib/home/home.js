define(['page'], function (Page) {
    var page = new Page('lib/home/home.html', 'Home'),
        form = page.element.querySelector('#form');

    form.onsubmit = function () {
        var username = this.querySelector('[name=username]');

        this.action = '#play/' + username.value + '/' + this.querySelector('[name=difficulty]:checked').value;

        // iOS compatibility - https://bugs.webkit.org/show_bug.cgi?id=28649
        return username.checkValidity();
    };

    return page;
});
