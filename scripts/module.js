let mod_log = new logger('/scripts/module.js');

Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {
    game.settings.register('behaviour-trees', 'ai_log_level', {
        name: 'AI Log Level',
        scope: 'world',      // "world" = sync to db, "client" = local storage 
        config: true,       // false if you dont want it to show in module config
        type: Number,       // Number, Boolean, String,  
        default: 0,
        onChange: value => {
          mod_log.debug('AI Active: ', value);
        }
    });
});
