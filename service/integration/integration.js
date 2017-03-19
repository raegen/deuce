define(['facebook'], function (facebook) {
    return {
        providers: {
            facebook: {
                share: function (rank, callback) {
                    facebook.ui({
                        method: 'share',
                        href: 'http://ec2-35-156-124-133.eu-central-1.compute.amazonaws.com/deuce',
                        title: 'I\'ve reached rank ' + rank + ' in Deuce game!',
                        description: 'Well done.',
                        picture: 'http://i0.kym-cdn.com/entries/icons/facebook/000/000/554/facepalm.jpg'
                    }, callback);
                }
            },
            twitter: {
                share: function (rank, callback) {
                    var text = 'I\ve reached rank ' + rank + ' in Deuce game!',
                        popup;

                    popup = window.open('https://twitter.com/intent/tweet?text=' + text);
                    popup.onbeforeunload = callback;
                }
            }
        },
        share: function (providers) {
            var args = arguments.slice(1);

            providers.forEach(
                function (provider) {
                    provider.share.apply(provider, args);
                }
            );
        }
    };
});
