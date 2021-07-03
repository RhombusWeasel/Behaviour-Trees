let ui_log = new bt_logger('/scripts/ui.js');

const ui_hud = {
    render: async (token) => {
        ui_log.debug('HUD rendered.', token);
    }
}

Hooks.on('ready') {
    Hooks.on('renderTokenConfig', ui_hud.render);
}

Hooks.on("'renderTokenHUD'", (hud, html, token) => {

    if (game.user.isGM) {
        ui_log.debug('Behaviour Tree HUD.', hud, html, token);
        let ai_tool = renderTemplate('/modules/behaviour_trees/templates/hud.html', {});
        html.find('div.right')
            .append(ai_tool)
            .click((event) => {
                
            }
        );
        
    }

});