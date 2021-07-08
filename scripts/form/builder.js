var isDown;
var offset = [];
var mousePosition;

// Make the DIV element draggable:
function dragElement(elmnt, owner) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    let header = document.getElementById(elmnt.id + "-header")
    owner.log.debug(elmnt.id, header);
    header.onmousedown = dragMouseDown;
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
        this.nodes = [];
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
            nodes: this.get_nodes()
        };
        return data;
    }

    get_node_data(data, id) {
        let node = bt?.node_data?.[id] ? bt.node_data[id] : false;
        if (node) {
            data.push(node);
            if (node.branches) {
                for (let i = 0; i < node.branches.length; i++) {
                    const child = node.branches[i];
                    data = this.get_node_data(data, child);
                }
            }
        }
        return data;
    }

    get_nodes() {
        let data = []
        if (this.token?.data?.flags?.behaviour_trees?.master_node) {
            let m_node = this.token.data.flags.behaviour_trees.master_node
            this.log.debug('AI Data found, loading...', m_node);
            data.push(this.get_node_data(data, m_node))
        } else {
            let node = bt.ai.new_node('loop', 'Loop', 300, 100, 'none');
            bt.node_data[node.uuid] = node;
            bt.journal.update({
                content: JSON.stringify(bt.node_data)
            });
            data.push(node);
        }
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find(".new-ai-data").click(this._on_new_data.bind(this));
        html.find(".clear-ai-data").click(this._on_clear_data.bind(this));
        html.find(".save-ai-data").click(this._on_save_data.bind(this));
        let drag = document.getElementsByClassName("moveable");
        console.log('DRAG LIST', drag);
        for (let i = 0; i < drag.length; i++) {
            const element = drag[i];
            this.log.debug('activateListeners()', element);
            dragElement(element, this);
        } 
    }

    _on_new_data(event) {
        event.preventDefault();
    }

    _on_clear_data(event) {
        event.preventDefault();
        this.log.debug('_clear_data()');
        this.token.unsetFlag('behaviour_trees', 'ai_data');
    }

    _on_save_data(event) {
        event.preventDefault();
    }

    async _updateObject(event, data) {
        this.log.debug(data.token);
    }
}

window.ai_builder = ai_builder;