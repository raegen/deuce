requirejs.config({
    baseUrl: '.',
    paths: {
        page: './lib/page/page',
        home: './lib/home/home',
        play: './lib/play/play',
        results: './lib/results/results',
        game: './model/game/game',
        card: './model/deck/card',
        deck: './model/deck/deck',
        store: './service/store/store',
        router: './service/router/router',
        integration: './service/integration/integration',
        facebook: './service/integration/provider/facebook',
        utility: './service/utility/utility',
        facebookSDK: '//connect.facebook.net/en_US/all'
    },
    shim: {
        facebookSDK: {
            exports: 'FB'
        }
    }
});

requirejs(['main']);
