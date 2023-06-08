import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const ResizableNode = ({ data }) => {
  return (
    <>
      <NodeResizer/>
      {/* <Handle type="target" position={Position.Left} /> */}
      <div style={{height:'200px', width:'300px'}}></div>
      {/* <Handle type="source" position={Position.Right} /> */}
    </>
  );
};

export default memo(ResizableNode);