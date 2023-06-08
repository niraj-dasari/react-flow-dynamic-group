import React from 'react';
import { BsTriangle } from 'react-icons/bs';

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div onDragStart={(event) => onDragStart(event, 'StaticNode')} draggable>
                <div className="dndnode node">
                    <BsTriangle />
                </div>
                <p>Node</p>
            </div>
            <br/>
            <div onDragStart={(event) => onDragStart(event, 'ResizableNode')} draggable>
                <div className="dndnode group">
                </div>
                <p>Group</p>
            </div>
        </aside>
    );
};
