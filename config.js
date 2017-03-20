define(function () {
    return {
        click: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch) ? 'touchstart' : 'click',
        rank: {
            sort: function (a, b) {
                return a.moves !== b.moves ? a.moves - b.moves : a.duration - b.duration;
            }
        },
        format: {
            duration: function (value) {
                return moment.duration(value, 'seconds').format('hh:mm:ss', {trim: false});
            }
        },
        integration: {
            provider: {
                facebook: {
                    key: '1766244913704310'
                }
            }
        },
        store: {name: 'deuce'},
        difficulty: {
            16: '4x4',
            36: '6x6',
            64: '8x8'
        },
        symbols: {
            0: 'assets/image/1.png',
            1: 'assets/image/2.png',
            2: 'assets/image/3.png',
            3: 'assets/image/4.png',
            4: 'assets/image/5.png',
            5: 'assets/image/6.png',
            6: 'assets/image/7.png',
            7: 'assets/image/8.png',
            8: 'assets/image/9.png',
            9: 'assets/image/10.png',
            10: 'assets/image/11.png',
            11: 'assets/image/12.png',
            12: 'assets/image/13.png',
            13: 'assets/image/14.png',
            14: 'assets/image/15.png',
            15: 'assets/image/16.png',
            16: 'assets/image/17.png',
            17: 'assets/image/18.png',
            18: 'assets/image/19.png',
            19: 'assets/image/20.png',
            20: 'assets/image/21.png',
            21: 'assets/image/22.png',
            22: 'assets/image/23.png',
            23: 'assets/image/24.png',
            24: 'assets/image/25.png',
            25: 'assets/image/26.png',
            26: 'assets/image/27.png',
            27: 'assets/image/28.png',
            28: 'assets/image/29.png',
            29: 'assets/image/30.png',
            30: 'assets/image/31.png',
            31: 'assets/image/32.png'
        }
    };
});
