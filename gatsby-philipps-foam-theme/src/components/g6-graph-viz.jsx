import G6 from '@antv/g6';
import React, { useEffect, useRef, useState } from 'react';
import { useGraphData } from '../use-graph-data';

const G6GraphViz = ({ graphVisible, setGraphVisible }) => {
  const [nodesData, linksData, navigate, highlight] = useGraphData();
  const [graph, setGraph] = useState(null);
  const graphContainerRef = useRef();
  console.log('data', { nodesData, linksData, navigate, highlight });

  useEffect(() => {
    console.log('curr', graphContainerRef.current.scrollWidth);
    if (!graph) {
      const nGraph = new G6.Graph({
        container: graphContainerRef.current,
        height: 500,
        width: 900,
        linkCenter: true,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        fitView: false,
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: 50, // Edge length
          nodeStrength: -1000,
          edgeStrength: 0.6,
          nodeSpacing: 20,
          collideStrength: 0.8,
          nodeSize: 30,
          alpha: 0.3,
          alphaDecay: 0.028,
          alphaMin: 0.01,
          forceSimulation: null,
        },
        defaultNode: {
          style: {
            size: 15,
            style: {
              fill: '#DEE9FF',
              stroke: '#5B8FF9',
            },
          },
          labelCfg: {
            position: 'bottom',
          },
        },
        nodeStateStyles: {
          // The node style when the state 'hover' is true
          hover: {
            fill: '#c9dbff',
          },
        },
        defaultEdge: {
          color: '#e2e2e2',
          style: {
            endArrow: {
              path: G6.Arrow.vee(7, 10, 5),
              fill: '#e2e2e2',
            },
          },
        },
      });
      setGraph(nGraph);

      // Mouse enter a node
      nGraph.on('node:mouseenter', (e) => {
        const nodeItem = e.item; // Get the target item
        nGraph.setItemState(nodeItem, 'hover', true); // Set the state 'hover' of the item to be true
      });

      // Mouse leave a node
      nGraph.on('node:mouseleave', (e) => {
        const nodeItem = e.item; // Get the target item
        nGraph.setItemState(nodeItem, 'hover', false); // Set the state 'hover' of the item to be false
      });

      nGraph.on('node:click', (e) => {
        // eslint-disable-next-line no-underscore-dangle
        navigate(e.item._cfg.model.slug);
        setGraphVisible(false);
      });

      const edges = linksData.map((edge) => {
        edge.id = `${edge.source}-${edge.target}`;
        return edge;
      });

      console.log({ nodes: nodesData, edges });

      nGraph.data({ nodes: nodesData, edges });
      nGraph.render();
    } else {
      const edges = linksData.map((edge) => {
        edge.id = `${edge.source}-${edge.target}`;
        return edge;
      });

      console.log({ nodes: nodesData, edges });

      graph.data({ nodes: nodesData, edges });
      graph.render();
    }
  }, [graph, nodesData, linksData]);

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        graphVisible ? '' : 'hidden'
      } `}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={`fixed inset-0 bg-gray-500 transition-opacity ${
            graphVisible
              ? 'bg-opacity-75 ease-out duration-300'
              : 'bg-opacity-0 ease-in duration-200'
          }`}
          aria-hidden="true"
        >
          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 max-w-screen-lg m-auto">
            <div className="px-4 py-5 sm:px-6 flex justify-between">
              <h2>Graph</h2>
              <button
                type="button"
                className=""
                onClick={() => setGraphVisible(false)}
              >
                X
              </button>
            </div>
            <div className="">
              <div id="graph-container" ref={graphContainerRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default G6GraphViz;
