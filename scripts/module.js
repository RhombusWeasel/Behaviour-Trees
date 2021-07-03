let mod_log = new bt_logger('/scripts/module.js');

Hooks.once('init', async function() {
    game.settings.register('behaviour-trees', 'ai_active', {
        name: 'AI Active',
        scope: 'world',
        config: true,
        type: Boolean,
        default: true,
        onChange: value => {
          mod_log.info('AI Active: ', value);
        }
    });

    game.settings.register('behaviour-trees', 'ai_log_level', {
        name: 'AI Log Level',
        scope: 'world',      // "world" = sync to db, "client" = local storage 
        config: true,       // false if you dont want it to show in module config
        type: Number,       // Number, Boolean, String,  
        default: 0,
        onChange: value => {
          mod_log.info('AI log level: ', value);
        }
    });
});

Hooks.once('ready', async function() {
    
});
