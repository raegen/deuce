(function () {
    var oReq, runner, state = {
        username: null,
        current: null,
        selected: null,
        store: []
    };

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

            form.onsubmit = function () {
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
                var grid = document.getElementById('grid'),
                    stats = {
                        difficulty: document.getElementById('stats-difficulty'),
                        duration: document.getElementById('stats-duration'),
                        moves: document.getElementById('stats-moves')
                    };

                state.username = username;
                state.current = new Game(difficulty);
                state.current.onUpdate = function() {
                    stats.difficulty.innerText = config.difficulty[this.difficulty];
                    stats.duration.innerText = moment.duration(this.duration, 'seconds').format('hh:mm:ss', { trim: false });
                    stats.moves.innerText = this.moves;
                };

                grid.innerHTML = '';
                grid.setAttribute('cols', Math.sqrt(state.current.hidden.length));

                state.current.hidden.forEach(
                    function (card) {
                        grid.appendChild(new CardComponent(card).element);
                    }
                );

                state.current.active = true;
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
            Object.defineProperty(this, 'symbol', {value: symbol});
        }

        Card.prototype.same = function (card) {
            return this.symbol === card.symbol;
        };

        function Deck() {
        }

        //not a real subclass but will serve our purpose
        Deck.prototype = [];

        Deck.deal = function (n, recurrence) {
            //create a pool of card symbol identifiers
            var symbols = Object.keys(config.symbols).map(Number), deck = new Deck(), symbol;

            while (n--) {
                //check if last ${recurrence} cards have the same symbol
                if (symbol === undefined || deck.length >= recurrence && deck.slice(-recurrence).every(function (card) {
                        return card.symbol === symbol;
                    })) {
                    //get a new symbol from the pool if that's the case
                    symbol = symbols.splice([Math.floor(Math.random() * (symbols.length - 1))], 1)[0];
                }

                 deck.push(new Card(symbol));
            }

            deck.shuffle();

            return deck;
        };

        //shuffle the array elements
        Deck.prototype.shuffle = function () {
            var counter = this.length,
                index,
                store;

            while (counter--) {
                index = Math.floor(Math.random() * counter);

                store = this[counter];
                this[counter] = this[index];
                this[index] = store;
            }
        };

        Deck.prototype.give = function (deck, filter) {
            this.filter(filter).forEach(
                function (element) {
                    deck.push(this.splice(this.indexOf(element), 1));
                }.bind(this)
            )
        };

        function Game(difficulty) {
            this.difficulty = difficulty;
            this.duration = 0;
            this.moves = 0;
            this.hidden = Deck.deal(difficulty, 2);
            this.revealed = new Deck();
        }

        Game.prototype.onUpdate = function () {
        };

        //tick duration while game is active
        Object.defineProperty(Game.prototype, 'active',
            {
                get: function () {
                    return !!runner;
                },
                set: function (active) {
                    var update = function () {
                        this.duration += 1;
                        this.onUpdate.call(this);
                    };

                    if (active) {
                        runner = setInterval(update.bind(this), 1000)
                    } else {
                        clearInterval(runner);
                        runner = null;
                    }
                }
            }
        );

        //card element with access to corresponding Card instance
        function CardComponent(card) {
            var symbol = document.createElement('div'),
                back = document.createElement('div'),
                front = document.createElement('div'),
                logo = document.createElement('i');

            this.element = document.createElement('div');
            this.element.className = 'card-component mdl-cell';

            this.card = card;

            symbol.className = 'card-symbol';
            symbol.innerText = config.symbols[card.symbol];

            logo.className = 'material-icons card-logo';
            logo.innerText = 'fingerprint';

            back.className = 'card-back mdl-card mdl-shadow--2dp';
            front.className = 'card-front mdl-card mdl-shadow--2dp';

            this.element.appendChild(front);
            this.element.appendChild(back);

            back.appendChild(symbol);
            front.appendChild(logo);

            this.element.addEventListener('click', this.reveal.bind(this));
        }

        //flips a card, thus revealing it
        CardComponent.prototype.reveal = function () {
            var revealed = document.querySelectorAll('.flipped:not(.matched)');

            this.element.classList.add('flipped');

            if (revealed.length === 2) {
                revealed.forEach(
                    function (card) {
                        card.classList.remove('flipped');
                    }
                );
            } else if (revealed.length === 1 && state.selected.same(this.card) && state.selected !== this.card) {
                state.current.hidden.give(state.current.revealed, function (hidden) {
                    return hidden.symbol === this.card.symbol;
                }.bind(this));

                [revealed[0], this.element].forEach(
                    function (card) {
                        card.classList.add('matched');
                    }
                )
            }

            state.selected = this.card;
            state.current.moves += 1;

            if (!state.current.hidden.length) {
                //game completed
                state.current.active = false;
            }
        };

        //instantiate the pager class
        new App(document.getElementById('app'));
        setTimeout(
            function () {
                document.body.classList.remove('loading');
            }, 500
        )
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
