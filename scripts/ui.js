let ui_log = new bt_logger('/scripts/ui.js');

Hooks.on("getSceneControlButtons", (controls, b, c) => {

    if (game.user.isGM) {
        let ai_tool = {
        name: "setTokenAI",
        title: "AI Settings",
        icon: "fas fa-brain",
        toggle: false,
        active: true,
        onClick: (toggle) => {
            let selected = bt.user.get_selected();
            if (selected == false) {
                ui_log.error('No Token Selected.');
            } else {
                ui_log.debug('Selected Token:', selected);
            }
        },
        };
        controls.find((c) => c.name == "token").tools.push(ai_tool);
    }

});