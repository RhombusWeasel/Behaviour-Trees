/*
Behaviour Trees:
A behaviour tree is a collection of node objects organised into a tree structure, there are two 'classes' of node:
    BRANCHES are logic circuits, AND, OR, XOR etc, these are organized into the shape you need for your AI
    LEAVES are custom functions that return one of 3 values, PASS, FAIL or WAIT
Once the tree is set up then the master node will call it's first child's update function which will call
it's first child's update function and so on down the tree until a leaf node is found, this leaf will execute and return PASS, FAIL or WAIT
Returning PASS or FAIL will end execution of this child in the parent node and on the next call of the master node the next leaf will be found.
Returning WAIT will result in the same leaf node being called on the next pass which allows for processing over successive 'ticks',
this can allow for nodes getting a list of coordinates for example to pathfind it's way to a point and another node that moves to every point in the list before returning PASS
Data can be passed between nodes in a 'blackboard' that is passed from the master node to every child, this blackboard is a dictionary and can be written to and read by any node.
*/

let ai_log = new logger('/scripts/lib/ai.js');

const FAIL = 0;
const PASS = 1;
const WAIT = 2;

class ai_node {
    constructor() {
        this.branches = [];
        this.current  = 0;
    }
    _reset() {
        this.current = 0;
        this.branches.forEach(branch => {
            branch._reset();
        });
        this.reset();
    }
    reset() {}
    _update(bb) {
        let state = this.branches[this.current]._update(bb);
        if (state != WAIT) {
            this.current += 1
        }
        this.update(bb)
        return state
    }
    update(bb, state) {}
}
/* 
Loop Node:
    Standard node to loop through all children, this is the base node that all others will be attached to.
    Each update it will call it's current child's update function which will recursively update it's children until 
    a leaf node returns a value which is passed back up the tree to the parent.
    Once all children have resolved the loop node will recursively reset itself and start the loop again, this can
    be layered with other logic gate nodes to build up very complex behaviour.
    The master node has a blackboard which is a dictionary that is passed to each child recursively allowing data to be passed between nodes
    which serves as a memory for the ai.
*/
class loop_node extends ai_node {
    constructor() {
        super();
        this.type = 'loop';
        this.blackboard = {};
    }
    _update(bb) {
        let state = this.branches[this.current]._update(this.blackboard);
        if (state != WAIT) {
            this.current += 1;
        }
        return this.update(bb, state);
    }
    update(bb, state) {
        if (this.current > this.branches.length) {
            this._reset();
        }
    }
}
/*
Inverter Node:
    An inverter node should only ever have one child node and will invert the output of the child node
*/
class invert_node extends ai_node {
    constructor() {
        super();
        this.type = 'inverter';
    }
    update(bb, state) {
        if (state == PASS) {
            return FAIL;
        }else if (state == FAIL) {
            return PASS;
        }
        return WAIT;
    }
}
/*
AND Node:
    An AND node will return FAIL as soon as one of it's child nodes fails, returning PASS only when it has executed all nodes.
*/
class and_node extends ai_node {
    constructor() {
        super();
        this.type = 'and';
    }
    update(bb, state) {
        if (state == PASS) {
            if (this.current > this.branches.length) {
                return PASS;
            }
        }else if (state == FAIL) {
            return FAIL;
        }
        return WAIT;
    }
}
/*
OR Node:
    An OR node will return FAIL only if ALL of it's child nodes have failed, returning PASS as soon as any child node passes.
*/
class or_node extends ai_node {
    constructor() {
        super()
        this.type = 'or'
    }
    update(bb, state) {
        if (state == PASS) {
            return PASS;
        }else if (state == FAIL && this.current > this.branches.length) {
            return FAIL
        }
        return WAIT;
    }
}
/*
XOR Node:
    An XOR node will return PASS if ONLY one of it's child nodes passes, this node will require some memory.
*/
class xor_node extends ai_node {
    constructor() {
        super();
        this.type = 'xor';
        this.has_pass = false;
    }
    reset() {
        this.has_pass = false;
    }
    update(bb, state) {
        if (state == PASS) {
            if (this.has_pass) {
                return FAIL;
            }else {
                this.has_pass = true;
            }
        }
        if (this.current > this.branches.length && this.has_pass) {
            return PASS;
        }
        return WAIT;
    }
}