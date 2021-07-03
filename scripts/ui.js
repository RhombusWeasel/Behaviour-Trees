let ident = '/scripts/ui.js';

Hooks.on("getSceneControlButtons", (controls, b, c) => {

    if (game.user.isGM) {
        let ai_tool = {
        name: "setTokenAI",
        title: "AI Settings",
        icon: "fas fa-brain",
        toggle: false,
        active: true,
        onClick: (toggle) => {
            let selected = get_selected();
            if (selected == false) {
                debug_log(ident, 'Added')
            }
        },
        };
        controls.find((c) => c.name == "token").tools.push(ai_tool);
    }

});