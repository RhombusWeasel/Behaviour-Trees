const DEBUG = 0;
const INFO = 1;
const WARN = 2;
const ERROR = 3;

class logger {

    constructor(ident) {
        this.ident = ident
    }
    log() {
        console.log('Behaviour-Trees |', this.ident, arguments);
    }
    debug() {
        if (game.settings.get('ai', 'ai_log_level') >= DEBUG) {
            this.log(arguments);
        }
    }

}

class user_utils {

    constructor() {

    }
    get_selected() {
        return false;
    }

}