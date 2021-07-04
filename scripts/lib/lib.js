const DEBUG = 0;
const INFO = 1;
const WARN = 2;
const ERROR = 3;

let bt = {

    FAIL: 0,
    PASS: 1,
    WAIT: 2,

    logger: class bt_logger {

        constructor(ident) {
            this.ident = ident
        }
    
        log(lvl) {
            console.log('%c| Behaviour-Trees | '+lvl, 'font-size: 32px', this.ident, arguments[1], arguments);
        }
    
        debug() {
            if (game.settings.get('behaviour-trees', 'ai_log_level') <= DEBUG) {
                this.log('DEBUG', arguments);
            }
        }
    
        info() {
            if (game.settings.get('behaviour-trees', 'ai_log_level') <= INFO) {
                this.log('INFO', arguments);
            }
        }
    
        warn() {
            if (game.settings.get('behaviour-trees', 'ai_log_level') <= WARN) {
                this.log('WARNING', arguments);
            }
        }
    
        error() {
            if (game.settings.get('behaviour-trees', 'ai_log_level') <= ERROR) {
                this.log('ERROR', arguments);
            }
        }
    
    },
    
    user : {
        get_selected: function() {
            for (let t = 0; t < canvas.tokens.placeables.length; t++) {
                let tgt = canvas.tokens.placeables[t]
                if (tgt._controlled) {
                    return tgt;
                }
            }
            return false;
        },
    },
    
    token: {},
    
    nodes: {

        new: function(type, label) {
            return {
                type: type,
                label: label,
                branches: [],
                current: 0,
                result: bt.nodes.WAIT
            };
        },
        reset: function(state) {
            for (let branch = 0; branch < state.branches.length; branch++) {
                bt.nodes.reset(state.branches[branch]);
            }
            state.current = 0
            state.value = bt.WAIT
        },
        loop: {
            update: function(state, token) {
                let node = state.branches[state.current].type;
                let result = bt.nodes[node].update(state.branches[state.current], token);
                if (result != bt.WAIT) {
                    state.current += 1;
                    state.value = result;
                }
                if (state.current > state.branches.length) {
                    bt.nodes.reset(state);
                }
            }
        },
        and: {
            update: function(state, token) {
                let node = state.branches[state.current].type;
                let result = bt.nodes[node].update(state.branches[state.current], token);
                if (state == bt.PASS) {
                    if (state.current > state.branches.length) {
                        return bt.PASS;
                    }
                }else if (state == bt.FAIL) {
                    return bt.FAIL;
                }
                return bt.WAIT;
            }
        },
    },
};