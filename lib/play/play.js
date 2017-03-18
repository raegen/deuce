define(['page', 'game', 'utility', 'store', 'router', 'config'], function (Page, Game, Utility, Store, router, config) {
    var page,
        game,
        grid,
        stats,
        selected;

    // card element with access to corresponding Card instance
    function CardComponent(card) {
        var symbol = Utility.createElement('div', 'card-symbol', config.symbols[card.symbol]),
            back   = Utility.createElement('div', 'card-back mdl-card mdl-shadow--2dp'),
            front  = Utility.createElement('div', 'card-front mdl-card mdl-shadow--2dp'),
            logo   = Utility.createElement('i', 'material-icons card-logo', 'fingerprint');

        this.card = card;
        this.element = Utility.createElement('div', 'card-component mdl-cell');

        this.element.appendChild(front);
        this.element.appendChild(back);

        back.appendChild(symbol);
        front.appendChild(logo);

        this.element.addEventListener('click', this.reveal.bind(this));
    }

    // flips a card, thus revealing it
    CardComponent.prototype.reveal = function () {
        var revealed = document.querySelectorAll('.flipped:not(.matched)');

        this.element.classList.add('flipped');

        if (revealed.length === 2) {
            revealed.forEach(
                function (card) {
                    card.classList.remove('flipped');
                }
            );
        } else if (revealed.length === 1 && selected.same(this.card) && selected !== this.card) {
            game.hidden.give(game.revealed, function (hidden) {
                return hidden.symbol === this.card.symbol;
            }.bind(this));

            [revealed[0], this.element].forEach(
                function (card) {
                    card.classList.add('matched');
                }
            );
        }

        selected = this.card;
        game.moves += 1;

        if (!game.hidden.length) {
            // game completed.h
            game.active = false;
            Store.push(game);

            // this.element.querySelector('dialog').showModal();
            router().setRoute('results/' + game.difficulty);
        }
    };

    page = new Page('lib/play/play.html', 'Play', function (user, difficulty) {
        game = new Game(user, difficulty);

        game.onUpdate = function () {
            stats.difficulty.innerText = config.difficulty[this.difficulty];
            stats.duration.innerText = config.format.duration(this.duration);
            stats.moves.innerText = this.moves;
        };

        grid.innerHTML = '';
        grid.setAttribute('cols', Math.sqrt(game.hidden.length));

        game.hidden.forEach(
            function (card) {
                grid.appendChild(new CardComponent(card).element);
            }
        );

        game.active = true;
    });

    grid = page.element.querySelector('#grid');
    stats = {
        difficulty: page.element.querySelector('#stats-difficulty'),
        duration: page.element.querySelector('#stats-duration'),
        moves: page.element.querySelector('#stats-moves')
    };

    return page;
});
