define(['page'], function (Page) {
    var page = new Page('lib/home/home.html', 'Home'),
        form = page.element.querySelector('#form');

    form.onsubmit = function (e) {
        var data = new FormData(this), test = document.createElement('div');

        e.preventDefault();

        div.innerHTML = 'play/' + data.get('username') + '/' + data.get('difficulty');
        window.location.hash = 'play/' + data.get('username') + '/' + data.get('difficulty');
        form.appendChild(div);
        return false;
    };

    return page;
});
