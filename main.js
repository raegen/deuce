(function () {
    var oReq;

    function init(config) {
        function App(element) {
            var router, form = document.getElementById('form');

            if (!element) {
                return;
            }

            this.element = element;

            //instantiate router with routes defined by markup ([data-route] attribute)
            router = Router(Array.prototype.reduce.call(element.querySelectorAll('[data-route]'),
                function (acc, curr) {
                    acc[curr.dataset.route] = this.show.bind(this, curr);

                    return acc;
                }.bind(this), {}
            ));

            form.onsubmit = function() {
                window.location.hash = form.getAttribute('action');
                return false;
            };

            router.on('once', '/start', function () {
                var username = document.querySelector('[name=username]'),
                    difficulty;

                form.addEventListener('change', function () {
                    difficulty = document.querySelector('[name=difficulty]:checked');
                    form.action = '#game/' + username.value + '/' + difficulty.value;
                });
            });

            router.on('/game/:username/:difficulty', function (username, difficulty) {
                var deck = Deck.deal(difficulty, 2),
                    grid = document.getElementById('grid');

                grid.innerHTML = '';
                grid.classList.add('cols--' + Math.sqrt(deck.length));

                deck.forEach(
                    function (card) {
                        grid.appendChild(CardComponent(card));
                    }
                );
            });

            router.init('start');
        }

        App.prototype.show = function (page) {
            //empty the container (detach all attached)
            this.element.innerHTML = '';
            //attach passed page to dom
            this.element.appendChild(page);
        };

        function Card(symbol) {
            Object.defineProperty(this, 'symbol', {
                get: function () {
                    return config.symbols[symbol];
                }
            });
        }

        function Deck() {
        }

        //not a real subclass but will serve our purpose
        Deck.prototype = [];

        Deck.deal = function (n, recurrence) {
            //create a pool of card symbol identifiers
            var symbols = Object.keys(config.symbols).map(Number), deck = new Deck(), symbol;

            while (n--) {
                //check if last ${recurrence} cards have the same symbol
                if (!symbol || deck.length >= recurrence && deck.slice(-recurrence).every(function (card) {
                        return card.symbol === symbol;
                    })) {
                    //get a new symbol from the pool if that's the case
                    symbol = symbols.splice([Math.floor(Math.random() * symbols.length - 1)], 1)[0];
                }

                deck.push(new Card(symbol));
            }

            return deck;
        };

        //card element with access to corresponding Card instance
        function CardComponent(card) {
            var element = document.createElement('div'),
                paper = document.createElement('div');

            element.className = 'card-component mdl-cell';

            paper.className = 'mdl-card mdl-shadow--2dp';
            element.appendChild(paper);

            return element;
        }

        //instantiate the pager class
        new App(document.getElementById('app'));
    }

    //get config
    oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //init app with fetched config
            init(JSON.parse(this.responseText));
        }
    };
    oReq.open('GET', 'config.json');
    oReq.send();
}());
