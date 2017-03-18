define([ 'page', 'utility', 'store', 'config' ], function(Page, Utility, Store, config) {
    var page;

    function rankSort(a, b) {
        return a.moves !== b.moves ? a.moves - b.moves : a.duration - b.duration;
    }

    function ResultRowComponent(record, rank) {
        var index,
            user,
            moves,
            duration;

        index = Utility.createElement('td', null, rank);
        user = Utility.createElement('td', 'mdl-data-table__cell--non-numeric', record.user);
        moves = Utility.createElement('td', 'mdl-data-table__cell--non-numeric', record.moves);
        duration = Utility.createElement('td', null, config.format.duration(record.duration));

        this.element = Utility.createElement('tr');
        this.element.appendChild(index);
        this.element.appendChild(user);
        this.element.appendChild(moves);
        this.element.appendChild(duration);
    }

    page = new Page('lib/results/results.html', 'Rank list', function(difficulty) {
        var list = this.element.querySelector('#rank-list tbody');
        list.innerHTML = '';

        Store.slice().sort(rankSort)
        // could have done filtering in forEach, but would segregate index and it would be uglier
        // so as with sets this small (< 30) the overhead is negligible, I've opted for soc and readability
            .filter(
                function(record) { return record.difficulty === difficulty;}
            )
            .forEach(
                function(record, index) {
                    var row = new ResultRowComponent(record, index + 1);

                    list.appendChild(row.element);
                }
            );
    });

    return page;
});
