let mod_log = new bt.logger('/scripts/module.js');

async function preload_handlebars_templates() {
  const template_paths = [
      "modules/behaviour_trees/templates/partials/draw_space.hbs",
  ]
  return loadTemplates(template_paths)
}

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

    preload_handlebars_templates();
});

Hooks.once('ready', async function() {
    bt.journal = game.journal.getName('BT');
    mod_log.debug('Node Data:', bt.journal);
    if (bt.journal == undefined) {
        bt.journal = JournalEntry.create({
            name: 'BT',
            content: JSON.stringify({})
        });
        mod_log.debug('New Node Data:', bt.journal);
        bt.node_data = {}
    } else {
        let raw_data = bt.journal.data.content//.substring(3, bt.journal.data.content.length - 4);
        bt.node_data = JSON.parse(raw_data);
        mod_log.info('Node Data loaded.', bt.node_data);
    }
});
