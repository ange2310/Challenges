import React from 'react';
import Tree from 'react-d3-tree';

const TreeVisualizer = ({ treeData }) => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tree data={treeData} orientation="vertical" />
    </div>
  );
};

export default TreeVisualizer;
