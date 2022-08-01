module.exports = class Node {
    constructor(value) {
        this.leftChild = null;
        this.rightChild = null;
        this.value = value;
    }

    addNode(node) {
        if (node.value === this.value) {
            throw new Error('Binary search trees cant store duplicated data.')
        }
        // if the new node value is lower than the actual node must be added to the leftChild
        if (node.value < this.value) {
            if (this.leftChild == null) {
                this.leftChild = node;
                return;
            }
            // if there is already a leftChild it must be added in a deepest level
            this.leftChild.addNode(node);
        }
        if (node.value > this.value) {
            if (this.rightChild == null) {
                this.rightChild = node;
                return;
            }
            // if there is already a rightChild it must be added in a deepest level
            this.rightChild.addNode(node);
        }
    }

    deleteNode(value) {
        if (value < this.value && this.leftChild) {
            this.leftChild = this.leftChild.deleteNode(value);
        }
        if (value > this.value && this.leftChild) {
            this.rightChild = this.rightChild.deleteNode(value);
        }
        if (this.value === value) {
            if (!this.rightChild && !this.leftChild) {
                return null;
            }
            if (!this.rightChild) {
                return this.leftChild;
            }
            if (!this.leftChild) {
                return this.rightChild;
            }
            // if the node has two childs must replace the value for a leaf value and delete that leaf
            const subTreeMaxValue = this.leftChild.getMax();// the leaf must be the greater of the subtree
            this.value = subTreeMaxValue;
            this.leftChild = this.leftChild.deleteNode(subTreeMaxValue);
        }
        return this;
    }

    // obtain the max value of the node subtree
    getMax() {
        if (!this.rightChild) {
            return this.value;
        }
        return this.rightChild.getMax();
    }

    // obtain the mix value of the node subtree
    getMin() {
        if (!this.leftChild) {
            return this.value;
        }
        return this.leftChild.getMin();
    }

    // search a value accross the tree, returns true or false depending if that value is in the tree
    searchValue(value) {
        if (value === this.value) {
            return true;
        }
        if (value < this.value && this.leftChild) {
            return this.leftChild.searchValue(value);
        }
        if (value > this.value && this.rightChild) {
            return this.rightChild.searchValue(value);
        }
        return false;
    }

    getTraversal({ traversalType, result }) {
        const traversalAlgorithms = {
            inorder: () => {
                if (this.value) {
                    this.leftChild && this.leftChild.getTraversal({ traversalType: 'inorder', result });
                    result.push(this.value);
                    this.rightChild && this.rightChild.getTraversal({ traversalType: 'inorder', result });
                }
            },
            preorder: () => {
                if (this.value) {
                    result.push(this.value);
                    this.leftChild && this.leftChild.getTraversal({ traversalType: 'preorder', result });
                    this.rightChild && this.rightChild.getTraversal({ traversalType: 'preorder', result });
                }
            },
            postorder: () => {
                if (this.value) {
                    this.leftChild && this.leftChild.getTraversal({ traversalType: 'postorder', result });
                    this.rightChild && this.rightChild.getTraversal({ traversalType: 'postorder', result });
                    result.push(this.value);
                }
            },
        };

        traversalAlgorithms[traversalType]();
        return result;
    }

    getDeph() {
        let leftDeepness = 0;
        let rightDeepness = 0;
        if (!this.leftChild && !this.rightChild) {
            return 1;
        }
        if (this.rightChild) {
            rightDeepness = this.rightChild.getDeph() + 1;
        }
        if (this.leftChild) {
            leftDeepness = this.leftChild.getDeph() + 1;
        }

        return Math.max(rightDeepness, leftDeepness);
    }

    getLeafs() {
        if (!this.rightChild && !this.leftChild) {
            return [this.value];
        }
        const leftDeepest = this.leftChild?.getLeafs() || [];
        const rightDeepest = this.rightChild?.getLeafs() || [];

        return [...leftDeepest, ...rightDeepest];

    }
    // Obtain the values of the last level nodes
    getDeepestNodes({ prevDeph = 0, totalDeph = 0 }) {
        const actualDeph = prevDeph + 1;
        if (totalDeph === 0) {
            totalDeph = this.getDeph();
        }
        if (!this.rightChild && !this.leftChild && actualDeph === totalDeph) {
            return [this.value];
        }
        const leftDeepest = this.leftChild?.getDeepestNodes({ prevDeph: actualDeph, totalDeph }) || [];
        const rightDeepest = this.rightChild?.getDeepestNodes({ prevDeph: actualDeph, totalDeph }) || [];

        const deepestNodes = [...leftDeepest, ...rightDeepest];

        return deepestNodes;
    }
}