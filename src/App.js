import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  useStore,
  Background,
  updateNode,
  useUpdateNodeInternals
} from 'reactflow';
import 'reactflow/dist/style.css';
import ResizableNode from './ResizableNode';
import StaticNode from './StaticNode';
import Sidebar from './Sidebar';

import './index.css';

const nodeTypes = {
  ResizableNode,
  StaticNode
};

const initialNodes = [
 {
  id:'3',
  type: "ResizableNode",
  position: {x : 100, y: 100}
 }
];



let id = 0;
const getId = () => `dndnode_${id++}`;


const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {getIntersectingNodes}  = useReactFlow();

  const onNodeDrag = useCallback((event, node) => {
    console.log(node);
    const intersections = getIntersectingNodes(node).map((n) => n.id);

    console.log(intersections);
    console.log(nodes.filter(n => n.type != 'ResizableNode')[0])
    const parent = nodes.filter(n => n.type == 'ResizableNode')[0].id.toString;
    // const child = nodes.filter(n => n.type != 'ResizableNode')[0];

    
      // setNodes((nds) =>
      //   nds.map((n) => {
      //     if (n.id === node.id) {
      //       // when you update a simple type you can just update the value
      //       n.parentNode = parent;
      //       n.extent= 'parent';
      //     }
  
      //     return n;
      //   })
      // );
      console.log(node)


    // setNodes((ns) =>
    //   ns.map((n) => ({
    //     ...n,
    //     parentNode: intersections.includes(child.id) ? 'parent' : '',
    //     extent: intersections.includes(child.id)? 'parent': ''
    //   }))
    // );

  }, []);

  const onNodesDelete = (deleted) => {
    setNodes(nodes.filter((node) => !deleted.includes(node)));
  };

  const onNodeClick = (event, node) => {
    
  }

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const NodesDebugger = () => {
    const nodes = useStore(state => state.nodes);
  
    console.log(nodes);
  
    return null;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` }
      };

      console.log(newNode)
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  return (
    <div style={{ width: '100vw', height: '100vh' }} className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          onNodeDrag={onNodeDrag}
          onNodesDelete={onNodesDelete}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background />
          <NodesDebugger/>
          <Controls />
        </ReactFlow>
      </div>

    </div>
  );
}


const App = () => {
  return (
    <ReactFlowProvider>
      <DnDFlow />
    </ReactFlowProvider>
  )
}
export default App;