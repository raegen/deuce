define(['home', 'play', 'results', 'router'], function (Home, Play, Results, router) {
    var view,
        title = document.getElementById('page-title');

    function View(element) {
        if (!element) {
            return;
        }

        this.element = element;
    }

    View.prototype.set = function (page) {
        document.body.classList.add('loading');

        // update current page title in header
        title.innerText = page.title;

        // empty the container (detach all attached)
        this.element.innerHTML = '';
        // attach passed page to dom
        this.element.appendChild(page.element);

        // reinit page
        page.initialize.apply(page, Array.prototype.slice.call(arguments, 1));

        setTimeout(function () {
            document.body.classList.remove('loading');
        }, 500);
    };

    // instantiate the pager class
    view = new View(document.getElementById('view'));

    // instantiate router with defined routes
    router({
        'home': view.set.bind(view, Home),
        'play/:username/:difficulty': view.set.bind(view, Play),
        'results/:difficulty': view.set.bind(view, Results)
    }).init('home');
});
