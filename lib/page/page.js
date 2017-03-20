define(function () {
    return function Page(template, title, initialize) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', template, false);
        xmlHttp.send();

        this.initialize = initialize || function () {
        };
        this.element = document.createElement('div');
        this.element.className = 'page';
        this.element.innerHTML = xmlHttp.responseText;
        this.title = title;

        componentHandler.upgradeElements(this.element.querySelectorAll('[class*="mdl-"]:not(form)'));
    };
});
