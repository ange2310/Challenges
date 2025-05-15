class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const insertNode = (node, value) => {
      if (!node) return new Node(value);
      if (value < node.value) node.left = insertNode(node.left, value);
      else node.right = insertNode(node.right, value);
      return node;
    };
    this.root = insertNode(this.root, value);
  }

  contains(value) {
    const search = (node, value) => {
      if (!node) return false;
      if (node.value === value) return true;
      return value < node.value
        ? search(node.left, value)
        : search(node.right, value);
    };
    return search(this.root, value);
  }

  inorder(node = this.root, result = []) {
    if (!node) return result;
    this.inorder(node.left, result);
    result.push(node.value);
    this.inorder(node.right, result);
    return result;
  }

  preorder(node = this.root, result = []) {
    if (!node) return result;
    result.push(node.value);
    this.preorder(node.left, result);
    this.preorder(node.right, result);
    return result;
  }

  postorder(node = this.root, result = []) {
    if (!node) return result;
    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);
    return result;
  }

  toD3Format(node = this.root) {
    if (!node) return null;
    return {
      name: `${node.value}`,
      children: [this.toD3Format(node.left), this.toD3Format(node.right)].filter(Boolean)
    };
  }
}
export default BinaryTree;

