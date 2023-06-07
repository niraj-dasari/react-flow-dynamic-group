import { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import { BsTriangle } from 'react-icons/bs';

const StaticNode = ({ data }) => {
    return (
        <>
            <Handle type="target" position={Position.Left} />
            <div className="dndnode node">
                <BsTriangle />
            </div>      
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default memo(StaticNode);