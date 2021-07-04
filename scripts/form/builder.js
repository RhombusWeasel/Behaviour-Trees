var isDown;
var offset = [];
var mousePosition;

// Make the DIV element draggable:


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

class ai_builder extends FormApplication {
    constructor(token) {
        super();
        this.token = canvas.tokens.placeables.find(i => i.name == token.name);
        this.log = new bt.logger(token.name);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['module', 'form'],
            template: '/modules/behaviour_trees/templates/builder.html',
            title: 'AI Builder',
            resizable: true
        });
    }

    getData() {
        let data = {
            token: this.token,
            nodes: [this._get_nodes()]
        };
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        this.log.debug(html);
        //html.find(".moveable-header").click(this._on_mouse_down.bind(this));
        //html.find(".moveable-header").click(this._on_mouse_up.bind(this));
        //html.find(".moveable-header").click(this._on_mouse_move.bind(this));
        html.find(".clear-ai-data").click(this._on_clear_data.bind(this));
        let drag = document.getElementsByClassName("moveable-header");
        console.log('DRAG LIST', drag);
        drag.forEach(element => {
            dragElement(element); 
        });
    }

    _on_clear_data(event) {
        this.log.debug('_clear_data()');
        this.token.unsetFlag('behaviour_trees', 'ai_data');
    }

    _get_nodes() {
        if (this.token?.data?.flags?.behaviour_trees?.ai_data) {
            this.log.debug('AI Data found, loading...', this.token.data.flags.behaviour_trees.ai_data);
            return JSON.parse(this.token.data.flags.behaviour_trees.ai_data);
        }
        this.log.info('Creating new AI Data...', this.token);
        //return bt.ai.new_node('loop', 'Main Loop');
        let data = {
            type: 'loop',
            label: 'Main Loop',
            current: 0,
            pos: {x: 50, y: 10},
            result: bt.nodes.WAIT,
            branches: [
                {
                    type: 'or',
                    label: 'Query',
                    current: 0,
                    result: bt.nodes.WAIT,
                    branches: [
                        {
                            type: 'loop',
                            label: 'Main Loop',
                            current: 0,
                            pos: {x: 50, y: 50},
                            result: bt.nodes.WAIT,
                            branches: [
                                
                            ],
                        }
                    ],
                },
                {
                    type: 'and',
                    label: 'Sequence',
                    current: 0,
                    result: bt.nodes.WAIT,
                    branches: [
                        {
                            type: 'loop',
                            label: 'Main Loop',
                            current: 0,
                            pos: {x: 100, y: 50},
                            result: bt.nodes.WAIT,
                            branches: [
                                
                            ],
                        }
                    ],
                }
            ],
        }
        this.token.setFlag('behaviour_trees', 'ai_data', JSON.stringify(data));
        return data;
    }

    _on_mouse_down(event) {
        //event.preventDefault();
        // this.log.debug('Mouse DOWN event', event);
        // let element = event.currentTarget;
        // let div = element.closest(".moveable");
        // isDown = true;
        // offset = [
        //     div.offsetLeft - element.clientX,
        //     div.offsetTop - element.clientY
        // ];
    }

    _on_mouse_up(event) {
        //event.preventDefault();
        this.log.debug('Mouse UP event', event);
        isDown = false
    }

    _on_mouse_move(event) {
        event.preventDefault();
        this.log.debug('Mouse MOVE event', event);
        let element = event.currentTarget;
        let div = element.closest(".moveable");
        if (isDown) {
            mousePosition = {
        
                x : event.clientX,
                y : event.clientY
        
            };
            div.style.left = (mousePosition.x + offset[0]) + 'px';
            div.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
        this.render()
    }

    async _updateObject(event, data) {
        this.log.debug(data.token);
    }
}

window.ai_builder = ai_builder;