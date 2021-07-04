class ai_builder extends FormApplication {
    constructor(token) {
        super();
        this.token = token;
        this.log = new bt.logger(token.name);
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
        let data = {
            token: this.token,
            nodes: this._get_nodes()
        };
        this.log.debug(data);
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    _get_nodes() {
        if (this.token?.flags?.behaviour_trees?.ai_data) {
            this.log.debug('AI Data found, loading...', this.token.flags.behaviour_trees.ai_data);
            return JSON.parse(this.token.flags.behaviour_trees.ai_data);
        }
        this.log.info('Creating new AI Data...', this.token);
        return bt.ai.new_node('loop', 'Main Loop');
    }

    async _updateObject(event, data) {
        this.log.debug(data.token);
    }
}

window.ai_builder = ai_builder;