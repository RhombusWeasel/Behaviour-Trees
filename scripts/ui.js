Hooks.on("getSceneControlButtons", (controls, b, c) => {
    let ai_tool = {
      name: "setTokenAI",
      title: game.i18n.localize("levels.controls.setTemplateElevation.name"),
      icon: "fas fa-brain",
      toggle: false,
      active: true,
      onClick: (toggle) => {
        console.log('W00t!');
      },
    };
    controls.find((c) => c.name == "token").tools.push(ai_tool);
});