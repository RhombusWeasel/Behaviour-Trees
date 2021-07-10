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
        const ai_tool = await renderTemplate('/modules/behaviour_trees/templates/hud.html', {});
        html.find('div.right').append(ai_tool).click((event) => {
            ui_log.debug('HUD Click Event.', event);
            let clicked, ai_button;
            for ( const button of html.find('div.control-icon') ) {
                if (button === event.target.parentElement) clicked = button
                if (button.dataset.action === 'bt-ai-selector') ai_button = button
            }
            if (clicked == ai_button) {
                new ai_builder(token).render(true);
            }
        });
    }
});