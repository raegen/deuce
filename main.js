(function (config) {
    var defaults = {
        difficulty: {
            0: '4x4',
            1: '6x6',
            2: '8x8'
        }
    };

    if (!config) {
        config = {};
    }
    config.difficulty = config.difficulty || defaults.difficulty;

    function App(element) {
        var router;

        if (!element) {
            return;
        }

        this.element = element;

        router = Router(Array.prototype.reduce.call(element.querySelectorAll('[data-route]'),
            function (acc, curr) {
                acc[curr.dataset.route] = this.show.bind(this, curr);

                return acc;
            }.bind(this), {}
        ));
        router.init('start');
    }

    App.prototype.show = function (page) {
        this.element.innerHTML = '';
        this.element.appendChild(page);
    };

    new App(document.getElementById('app'));
}());
