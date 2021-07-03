const DEBUG = 0;
const INFO = 1;
const WARN = 2;
const ERROR = 3;

class logger {

    constructor(ident) {
        this.ident = ident
    }
    log(lvl) {
        console.log('| Behaviour-Trees |', lvl, this.ident, arguments);
    }
    debug() {
        console.log(game.settings.get('behaviour-trees', 'ai_log_level'), arguments);
        if (game.settings.get('behaviour-trees', 'ai_log_level') <= DEBUG) {
            this.log('DEBUG', arguments);
        }
    }

    info() {
        console.log(game.settings.get('behaviour-trees', 'ai_log_level'), arguments);
        if (game.settings.get('behaviour-trees', 'ai_log_level') <= INFO) {
            this.log('INFO', arguments);
        }
    }

    warn() {
        console.log(game.settings.get('behaviour-trees', 'ai_log_level'), arguments);
        if (game.settings.get('behaviour-trees', 'ai_log_level') <= WARN) {
            this.log('WARNING', arguments);
        }
    }

    error() {
        console.log(game.settings.get('behaviour-trees', 'ai_log_level'), arguments);
        if (game.settings.get('behaviour-trees', 'ai_log_level') <= ERROR) {
            this.log('ERROR', arguments);
        }
    }

}

let bt = {
    user : {
        get_selected: function() {
            return false;
        },
    }
};