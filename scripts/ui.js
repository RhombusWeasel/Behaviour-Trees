let ui_log = new bt.logger('/scripts/ui.js');

const ui_hud = {
    render: async (token) => {
        ui_log.debug('HUD rendered.', token);
    }
}

Hooks.on('ready', () => {
    Hooks.on('renderTokenConfig', ui_hud.render);
});

Hooks.on('renderTokenHUD', async (hud, html, token) => {
    ui_log.debug('Behaviour Tree HUD.', hud, html, token);
    if (game.user.isGM) {
        let ai_tool = await renderTemplate('/modules/behaviour_trees/templates/hud.html', {});
        ai_tool.click = (event) => {
            ui_log.debug(event);
            new ai_builder(token).render(true);
        };
        html.find('div.right').append(ai_tool);
    }

});