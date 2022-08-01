const assert = require('assert');
const { triggerAsyncId } = require('async_hooks');
const { expect } = require('chai');
const Tree = require('../models/Tree');

describe('Add Node', () => {
    it('should add a node to the tree following the bts rules', () => {
        const tree = new Tree();
        tree.addNode(30);
        tree.addNode(25);
        tree.addNode(40);
        tree.addNode(15);
        tree.addNode(27);
        tree.addNode(33);
        expect(tree).to.be.eqls(
            {
                rootNode: {
                    leftChild: {
                        leftChild: {
                            leftChild: null,
                            rightChild: null,
                            value: 15,
                        },
                        rightChild: {
                            leftChild: null,
                            rightChild: null,
                            value: 27,
                        },
                        value: 25,
                    },
                    rightChild: {
                        leftChild: {
                            leftChild: null,
                            rightChild: null,
                            value: 33,
                        },
                        rightChild: null,
                        value: 40,
                    },
                    value: 30,
                },
            }
        )
    });
});

describe('Build tree', () => {
    it('should build a tree from an array', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33]);
        expect(tree).to.be.eqls(
            {
                rootNode: {
                    leftChild: {
                        leftChild: {
                            leftChild: null,
                            rightChild: null,
                            value: 15,
                        },
                        rightChild: {
                            leftChild: null,
                            rightChild: null,
                            value: 27,
                        },
                        value: 25,
                    },
                    rightChild: {
                        leftChild: {
                            leftChild: null,
                            rightChild: null,
                            value: 33,
                        },
                        rightChild: null,
                        value: 40,
                    },
                    value: 30,
                },
            }
        )
    });
});

describe('Delete Node', () => {
    it('should delete a node without childrens', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 17, 26, 29, 31, 37, 43]);
        tree.deleteNode(29);
        expect(tree).to.be.eqls(
            {
                rootNode: {
                    leftChild: {
                        leftChild: {
                            leftChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 3,
                            },
                            rightChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 17,
                            },
                            value: 15,
                        },
                        rightChild: {
                            leftChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 26,
                            },
                            rightChild: null,
                            value: 27,
                        },
                        value: 25,
                    },
                    rightChild: {
                        leftChild: {
                            leftChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 31,
                            },
                            rightChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 37,
                            },
                            value: 33,
                        },
                        rightChild: {
                            leftChild: null,
                            rightChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 43,
                            },
                            value: 41,
                        },
                        value: 40,
                    },
                    value: 30,
                },
            }
        )
    });

    it('should delete a node with one children', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 5, 26, 29, 31, 37, 43]);
        tree.deleteNode(43);
        expect(tree).to.be.eqls(
            {
                rootNode: {
                    leftChild: {
                        leftChild: {
                            leftChild: {
                                leftChild: null,
                                rightChild: {
                                    leftChild: null,
                                    rightChild: null,
                                    value: 5,
                                },
                                value: 3,
                            },
                            rightChild: null,
                            value: 15,
                        },
                        rightChild: {
                            leftChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 26,
                            },
                            rightChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 29,
                            },
                            value: 27,
                        },
                        value: 25,
                    },
                    rightChild: {
                        leftChild: {
                            leftChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 31,
                            },
                            rightChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 37,
                            },
                            value: 33,
                        },
                        rightChild: {
                            leftChild: null,
                            rightChild: null,
                            value: 41,
                        },
                        value: 40,
                    },
                    value: 30,
                },
            }
        )
    });

    it('should delete a node with two childrens', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 17, 26, 29, 31, 37, 43]);
        tree.deleteNode(25);
        expect(tree).to.be.eqls(
            {
                rootNode: {
                    leftChild: {
                        leftChild: {
                            leftChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 3,
                            },
                            rightChild: null,
                            value: 15,
                        },
                        rightChild: {
                            leftChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 26,
                            },
                            rightChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 29,
                            },
                            value: 27,
                        },
                        value: 17,
                    },
                    rightChild: {
                        leftChild: {
                            leftChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 31,
                            },
                            rightChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 37,
                            },
                            value: 33,
                        },
                        rightChild: {
                            leftChild: null,
                            rightChild: {
                                leftChild: null,
                                rightChild: null,
                                value: 43,
                            },
                            value: 41,
                        },
                        value: 40,
                    },
                    value: 30,
                },
            }
        )
    });
});

describe('Traversal', () => {
    it('should return inorder traversal', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 17, 26, 29, 31, 37, 43]);
        const inorderTraversal = tree.getTraversal('inorder');
        expect(inorderTraversal).to.be.eqls([3, 15, 17, 25, 26, 27, 29, 30, 31, 33, 37, 40, 41, 43])
    });
    it('should return postorder traversal', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 17, 26, 29, 31, 37, 43]);
        const postorderTraversal = tree.getTraversal('postorder');
        expect(postorderTraversal).to.be.eqls([3, 17, 15, 26, 29, 27, 25, 31, 37, 33, 43, 41, 40, 30])
    });
    it('should return preorder traversal', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 17, 26, 29, 31, 37, 43]);
        const preorderTraversal = tree.getTraversal('preorder');
        expect(preorderTraversal).to.be.eqls([30, 25, 15, 3, 17, 27, 26, 29, 40, 33, 31, 37, 41, 43])
    });
});

describe('Deph', () => {
    it('should return deph of the 4 levels tree', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 17, 26, 29, 31, 37, 43]);
        const deph = tree.getDeph();
        expect(deph).to.be.eqls(4)
    });
    it('should return deph of the 3 levels tree', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15]);
        const deph = tree.getDeph();
        expect(deph).to.be.eqls(3);
    });
    it('should return deph of the 0 levels tree', () => {
        const tree = new Tree();
        tree.buildTree([]);
        const deph = tree.getDeph();
        expect(deph).to.be.eqls(0);
    });
});

describe('Deepest Nodes', () => {
    it('should return depest nodes of the tree with deph level', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 17, 26, 29, 31, 37, 43]);
        const deepestNodes = tree.getDeepestNodes();
        expect(deepestNodes).to.be.eqls({
            deepest: [3, 17, 26, 29, 31, 37, 43],
            deph: 4,
        })
    });
});

describe('Maximum Value', () => {
    it('should return the maximum value of the tree', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 17, 26, 29, 31, 37, 43]);
        const max = tree.getMax();
        expect(max).to.be.eqls(43);
    });
});

describe('Minimum Value', () => {
    it('should return the maximum value of the tree', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 17, 26, 29, 31, 37, 43]);
        const min = tree.getMin();
        expect(min).to.be.eqls(3);
    });
});

describe('Leafs', () => {
    it('should return an array with the leafs of the tree', () => {
        const tree = new Tree();
        tree.buildTree([30, 25, 40, 15, 27, 33, 41, 3, 17, 26, 29, 31, 37, 43]);
        const leafs = tree.getLeafs();
        expect(leafs).to.be.eqls([3, 17, 26, 29, 31, 37, 43]);
    });
});