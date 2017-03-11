(function () {
    var rq;

    function init(config) {
        if (!config) {
            return;
        }

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

        function Card(symbol) {
            Object.defineProperty(this, 'symbol', {value: symbol});
            this.face = 0;
        }

        new App(document.getElementById('app'));
    }

    rq = new XMLHttpRequest();
    rq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            init(JSON.parse(this.responseText));
        }
    };
    rq.open("GET", "config.json");
    rq.send();
}());
