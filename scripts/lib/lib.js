const DEBUG = 0;
const INFO = 1;
const WARN = 2;
const ERROR = 3;

class logger {

    constructor(ident) {
        this.ident = ident
    }
    log(lvl) {
        console.log(lvl, '| Behaviour-Trees |', this.ident, arguments);
    }
    debug() {
        if (game.settings.get('behaviour-trees', 'ai_log_level') >= DEBUG) {
            this.log('DEBUG', arguments);
        }
    }

}

get_selected() {
    return false;
}