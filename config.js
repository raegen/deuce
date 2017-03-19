define(function () {
    return {
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
            0: '🂡',
            1: '🂱',
            2: '🃁',
            3: '🃑',
            4: '🂢',
            5: '🂲',
            6: '🃂',
            7: '🃒',
            8: '🂣',
            9: '🂳',
            10: '🃃',
            11: '🃓',
            12: '🂤',
            13: '🂴',
            14: '🃄',
            15: '🃔',
            16: '🂥',
            17: '🂵',
            18: '🃅',
            19: '🃕',
            20: '🂦',
            21: '🂶',
            22: '🃆',
            23: '🃖',
            24: '🂧',
            25: '🂷',
            26: '🃇',
            27: '🃗',
            28: '🂨',
            29: '🂸',
            30: '🃈',
            31: '🃘',
            32: '🂩',
            33: '🂹',
            34: '🃉',
            35: '🃙',
            36: '🂪',
            37: '🂺',
            38: '🃊',
            39: '🃚',
            40: '🂫',
            41: '🂻',
            42: '🃋',
            43: '🃛',
            44: '🂬',
            45: '🂼',
            46: '🃌',
            47: '🃜',
            48: '🂭',
            49: '🂽',
            50: '🃍',
            51: '🃝',
            52: '🂮',
            53: '🂾',
            54: '🃎',
            55: '🃞'
        }
    };
});
