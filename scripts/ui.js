let ui_log = new bt_logger('/scripts/ui.js');

Hooks.on("'renderTokenHUD'", (hud, html, token) => {

    if (game.user.isGM) {
        ui_log.debug('Behaviour Tree HUD.', hud, html, token);
        let ai_tool = `
            <div>
                <a><i class="fas fa-brain"></i></a>
            </div>
        `
        html.find('div.right')
            .append(ai_tool)
            .click((event) => {
                
            }
        );
        
    }

});