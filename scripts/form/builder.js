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
        return {
            token: this.token,
            nodes: this._get_nodes()
        };
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    _get_nodes() {
        if (this.token?.flags?.behaviour_trees?.ai_data) {
            return JSON.parse(this.token.flags.behaviour_trees.ai_data);
        }
        return bt.ai.new_node('loop', 'Main Loop');
    }

    async _updateObject(event, data) {
        this.log.debug(data.token);
    }
}

window.ai_builder = ai_builder;