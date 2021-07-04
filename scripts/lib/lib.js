const DEBUG = 0;
const INFO = 1;
const WARN = 2;
const ERROR = 3;

class bt_logger {

    constructor(ident) {
        this.ident = ident
    }
    log(lvl) {
        console.log('%c| Behaviour-Trees |', 'font-size: 32px', '%c'+lvl, 'font-size: 32px', this.ident, arguments[1], arguments);
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

}

let bt = {
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
    }
};