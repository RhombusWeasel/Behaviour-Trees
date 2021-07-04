class ai_builder extends FormApplication {
    constructor(token) {
        super();
        this.token = token;
        this.log = new bt_logger(token.name);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['module', 'form'],
            template: '/modules/behaviour_trees/templates/builder.html',
            title: 'AI Builder',
            resizable: true
        });
    }

    getData() {
        return {
            token: this.token,
        };
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    async _updateObject(event, data) {
        this.log.debug(data.token);
    }
}

window.ai_builder = ai_builder;