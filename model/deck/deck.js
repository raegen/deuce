define(['config', 'card'], function(config, Card) {
    function Deck() {
    }

    // not a real subclass but will serve our purpose
    Deck.prototype = [];

    Deck.deal = function(n, recurrence) {
        // create a pool of card symbol identifiers
        var symbols = Object.keys(config.symbols).map(Number),
            deck    = new Deck(),
            symbol  = null,
            length  = n;

        function filter(card) {
            return card.symbol === symbol;
        }

        while (length--) {
            // check if last ${recurrence} cards have the same symbol
            if (symbol === null || deck.length >= recurrence && deck.slice(-recurrence).every(filter)) {
                // get a new symbol from the pool if that's the case
                symbol = symbols.splice([Math.floor(Math.random() * (symbols.length - 1))], 1)[0];
            }

            deck.push(new Card(symbol));
        }

        deck.shuffle();

        return deck;
    };

    // shuffle the array elements
    Deck.prototype.shuffle = function() {
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

    Deck.prototype.give = function(deck, filter) {
        this.filter(filter).forEach(
            function(element) {
                deck.push(this.splice(this.indexOf(element), 1));
            }
        );
    };

    return Deck;
});
