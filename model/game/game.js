define(['deck'], function(Deck) {
    var runner;

    function Game(user, difficulty) {
        this.user = user || 'anonymous';
        this.difficulty = difficulty;
        this.duration = 0;
        this.moves = 0;
        this.hidden = Deck.deal(difficulty, 2);
        this.revealed = new Deck();
    }

    Game.prototype.onUpdate = function() {
    };

    // tick duration while game is active
    Object.defineProperty(Game.prototype, 'active',
        {
            get: function() {
                return !!runner;
            },
            set: function(active) {
                var update = function() {
                    this.duration += 1;
                    this.onUpdate.call(this);
                };

                clearInterval(runner);
                if (active) {
                    runner = setInterval(update.bind(this), 1000);
                }                else {
                    runner = null;
                }
            }
        }
    );

    return Game;
});
