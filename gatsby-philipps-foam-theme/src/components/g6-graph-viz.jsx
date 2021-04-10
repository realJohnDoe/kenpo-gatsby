import G6 from '@antv/g6';
import React, { useEffect, useRef, useState } from 'react';
import { useGraphData } from '../use-graph-data';

const G6GraphViz = ({ graphVisible, setGraphVisible }) => {
  const [nodesData, linksData, navigate, highlight] = useGraphData();
  const [graph, setGraph] = useState(null);
  const graphContainerRef = useRef();
  console.log('data', { nodesData, linksData, navigate, highlight });

  useEffect(() => {
    if (!graph) {
      const nGraph = new G6.Graph({
        container: graphContainerRef.current,
        height: 500,
        width: 800,
        linkCenter: true,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        layout: {
          type: 'force',
          preventOverlap: true,
          // inkDistance: 150, // Edge length
          nodeSize: 130,
          edgeStrength: 0.2,
        },
        defaultNode: {
          style: {
            opacity: 0.8,
            lineWidth: 1,
            stroke: '#475569',
          },
          labelCfg: {
            position: 'bottom',
            style: {
              background: {
                fill: '#ffffffd6',
                padding: [2, 2, 2, 2],
                radius: 4,
                stroke: '#E2E8F0',
              },
            },
          },
        },
        defaultEdge: {
          color: '#e2e2e2',
          style: {
            opacity: 0.6,

            endArrow: true,
          },
        },
      });

      const nodes = nodesData.map((node) => {
        node.name = node.label;
        return node;
      });

      const edges = linksData.map((edge) => {
        edge.id = `${edge.source}-${edge.target}`;
        return edge;
      });

      console.log({ nodes, edges });

      nGraph.data({ nodes, edges });
      nGraph.render();

      setGraph(nGraph);
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
          className={`fixed inset-0 bg-gray-500 transition-opacity transition-opacity ${
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
            <div className="px-4 py-5 sm:p-6">
              <div id="graph-container" ref={graphContainerRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default G6GraphViz;
