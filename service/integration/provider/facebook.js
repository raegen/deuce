define(['facebookSDK', 'config'], function (facebookSDK, config) {
    facebookSDK.init({
        appId: config.integration.provider.facebook.key
    });

    return facebookSDK;
});
