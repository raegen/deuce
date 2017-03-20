define(['page', 'game', 'utility', 'store', 'router', 'integration', 'config'], function (Page, Game, Utility, Store, router, integration, config) {
    var page,
        game,
        grid,
        stats,
        selected,
        rank,
        dialog;

    // card element with access to corresponding Card instance
    function CardComponent(card) {
        var symbol = Utility.createElement('div', 'card-symbol', '<img src="' + config.symbols[card.symbol] + '">'),
            back   = Utility.createElement('div', 'card-back mdl-card mdl-shadow--2dp'),
            front  = Utility.createElement('div', 'card-front mdl-card mdl-shadow--2dp'),
            logo   = Utility.createElement('div', 'card-logo');

        this.card = card;
        this.element = Utility.createElement('div', 'card-component mdl-cell');

        this.element.appendChild(front);
        this.element.appendChild(back);

        back.appendChild(symbol);
        front.appendChild(logo);

        this.element.addEventListener(config.click, this.reveal.bind(this));
    }

    // flips a card, thus revealing it
    CardComponent.prototype.reveal = function () {
        var revealed = document.querySelectorAll('.flipped:not(.matched)'), stored;

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

            stored = Store[Store.length - 1];

            rank = Store.filter(
                    function (record) {
                        return record.difficulty === game.difficulty;
                    }
                ).sort(config.rank.sort).indexOf(stored) + 1;

            dialog.showModal();
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

    dialog = page.element.querySelector('dialog');

    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    dialog.querySelector('.close').addEventListener('click', function () {
        dialog.close();
        router().setRoute('results/' + game.difficulty);
    });

    page.element.querySelector('dialog .share-facebook').addEventListener('click', function () {
        integration.providers.facebook.share(rank);
    });
    page.element.querySelector('dialog .share-twitter').addEventListener('click', function () {
        integration.providers.twitter.share(rank);
    });

    return page;
});
