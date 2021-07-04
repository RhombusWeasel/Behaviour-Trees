const DEBUG = 0;
const INFO = 1;
const WARN = 2;
const ERROR = 3;

const uuid_keys = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ'

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
    /** UUID
     * Pass any number of integers, returns a uuid with char blocks equal to each int '-' seperated
     */
    uuid: function() {
        let str = ''
        for (let a = 0; a < arguments.length; a++) {
            for (let i = 0; i < arguments[a]; i++) {
                str += uuid_keys[Math.floor(Math.random() * uuid_keys.length)];
            }
            str += '-'
        }
        return str
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
    
    ai: {
        new_node: function(type, label, x, y, parent) {
            return {
                type: type,
                label: label,
                pos: {x: x, y: y},
                parent: parent,
                uuid: bt.uuid(4, 4, 4, 4),
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
    },

    nodes: {
        loop: {
            update: function(state, token) {
                let node = state.branches[state.current].type;
                let result = bt.nodes[node].update(state.branches[state.current], token);
                if (result != bt.WAIT) {
                    state.current += 1;
                    state.value = result;
                }
                if (state.current > state.branches.length) {
                    bt.ai.reset(state);
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