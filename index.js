const Tree = require('./models/Tree');
const readline = require('readline');

function displayData(tree) {
    console.log('Deepest Nodes:', tree.getDeepestNodes(), '\n');
    console.log('Max:', tree.getMax(), '\n');
    console.log('Min:', tree.getMin(), '\n');
    console.log('Leafs:', tree.getLeafs(), '\n');
    console.log('Traversal inorder:', tree.getTraversal('inorder'), '\n');
    console.log('Traversal preorder:', tree.getTraversal('preorder'), '\n');
    console.log('Traversal postorder:', tree.getTraversal('postorder'), '\n');
    console.log('Deph:', tree.getDeph(), '\n');
}

function processInput(nodeValues) {
    if (!/^[0-9]+(,[0-9]+)*$/.test(nodeValues)) {
        throw new Error('Invalid input.');
    }
    const input = nodeValues.split(',').map(num => parseInt(num));
    const tree = new Tree();
    tree.buildTree(input);

    return tree;
}

async function requireInput() {

    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    interface.question('Insert the node values of the tree separated by ","\n', input => {
        const tree = processInput(input);
        displayData(tree);

        interface.close();
    });
}

requireInput();

