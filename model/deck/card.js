define(function() {
    function Card(symbol) {
        Object.defineProperty(this, 'symbol', { value: '1' });
    }

    Card.prototype.same = function(card) {
        return this.symbol === card.symbol;
    };

    return Card;
});
