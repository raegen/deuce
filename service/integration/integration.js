define(['facebook'], function (facebook) {
    return {
        providers: {
            facebook: {
                share: function () {
                    facebook.ui({
                        method: 'share',
                        href: 'https://www.google.com'
                    });
                }
            }
        },
        share: function (providers, content) {
            providers.forEach(
                function (provider) {
                    provider.share(content);
                }
            );
        }
    };
});
