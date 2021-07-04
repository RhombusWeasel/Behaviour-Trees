class ai_builder extends FormApplication {
    constructor(token) {
        super();
        this.token = token;
        this.log = new bt_logger(token.name);
    }

    static get defaultOptions() {
        this.log.debug(this);
        return mergeObject(super.defaultOptions, {
            classes: ['module'],
            popOut: true,
            template: `/templates/builder.html`,
            id: `ai_builder_${this.token.id}`,
            title: 'AI Builder',
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