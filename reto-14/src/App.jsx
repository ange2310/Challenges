import React, { useEffect, useState } from 'react';

import BinaryTree from './util/BinaryTree';

import TreeVisualizer from './components/TreeVisualizer';

function App() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const tree = new BinaryTree();
    [10, 5, 15, 3, 7, 12, 18].forEach(n => tree.insert(n));

    console.log('Inorder:', tree.inorder());
    console.log('Preorder:', tree.preorder());
    console.log('Postorder:', tree.postorder());
    console.log('¿Contiene 7?', tree.contains(7));
    console.log('¿Contiene 99?', tree.contains(99));

    setTreeData(tree.toD3Format());
  }, []);

  return (
    <div>
      <h1>Visualización de Árbol Binario</h1>
      {treeData && <TreeVisualizer treeData={treeData} />}
    </div>
  );
}

export default App;
