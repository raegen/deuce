define(function() {
    return {
        createElement: function(tagName, className, innerHTML) {
            var element = document.createElement(tagName);
            element.className = className || '';
            element.innerHTML = innerHTML || '';

            return element;
        }
    };
});
