define(['config'], function (config) {
    function Record(object, keys) {
        keys.forEach(
            function (key) {
                if (object.hasOwnProperty(key)) {
                    this[key] = object[key];
                }
            }.bind(this)
        );
    }

    function Store() {
        var data = JSON.parse(localStorage.getItem(config.store.name)) || [];

        // deserialize & merge
        Array.prototype.push.apply(this, Array.prototype.map.call(
            data,
            function (object) {
                return new Record(object, ['user', 'difficulty', 'moves', 'duration']);
            }
        ));
    }

    Store.prototype = [];

    // wrap native push method to allow for localStorage update
    Store.prototype.push = function (object) {
        var record = Array.prototype.push.call(this, new Record(object, ['user', 'difficulty', 'moves', 'duration']));

        this.filter(
            function (element) {
                return this[this.length - 1].difficulty === element.difficulty;
            }.bind(this)
        ).slice(0, Math.max(this.length - 10)).forEach(
            function (element) {
                this.splice(this.indexOf(element), 1);
            }.bind(this)
        );

        window.localStorage.setItem(config.store.name, JSON.stringify(this));

        return record; // for consistency with Array.prototype.push
    };

    return new Store();
});
