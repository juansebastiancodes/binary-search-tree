const Node = require('./Node');

module.exports = class Tree {
    constructor() {
        this.rootNode = null;
    }

    // add a node to the tree taking in account the binary tree sort structure
    addNode (value) {
        const node = new Node(value);
        if (this.rootNode == null) {
            this.rootNode = node;
            return;
        }
        this.rootNode.addNode(node);
    }

    // deletes a node, if it has childs it is replaced accordingly to the structure
    deleteNode (value) {
        if (this.rootNode == null) {
            return;
        }
        this.rootNode.deleteNode(value);
    }

    // build a bts from an array of integers 
    buildTree (nodesValues) {
        for (const value of nodesValues) {
            this.addNode(value);
        }
        return;
    }

    // search a value accross the tree, returns true or false depending if that value is in the tree or not
    searchValue (value) {
        if (!this.rootNode) {
            return false;
        }
        return this.rootNode.searchValue(value);
    }

    // obtain an integer that represents the deepness of the tree
    getDeph () {
        if (!this.rootNode) {
            return 0;
        } 
        return this.rootNode.getDeph(this.root);
    }

    getTraversal(traversalType) {
        if (!this.rootNode) {
            return null;
        }
        const result = [];
        const allowedTraversals = ['inorder', 'preorder', 'postorder'];
        if (allowedTraversals.indexOf(traversalType) < 0) {
            throw new Error(`${traversalType} is not an allowed traversal.`)
        }
        return this.rootNode.getTraversal({ traversalType, result });
    }

    // obtain an array of the elements that belongs to the last level
    getLeafs () {
        if (!this.rootNode) {
            return null;
        }
        return this.rootNode.getLeafs();
    }

    // obtain the nodes that are in the last level
    getDeepestNodes() {
        if (!this.rootNode) {
            return null;
        }
        const deepestNodes = this.rootNode.getDeepestNodes({});
        const deph = this.rootNode.getDeph();
        
        return { deepest: deepestNodes, deph};
    }

    // Get maximum node value from the tree
    getMax() {
        if (this.rootNode == null) {
            return null;
        }
        return this.rootNode.getMax();
    }

    // Get minimum node value from the tree
    getMin() {
        if (this.rootNode == null) {
            return null;
        }
        return this.rootNode.getMin();
    }
}