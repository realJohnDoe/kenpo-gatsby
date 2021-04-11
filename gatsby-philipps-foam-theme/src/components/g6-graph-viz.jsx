import G6 from '@antv/g6';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useThemeState from '../state/useThemeState';
import { useGraphData } from '../use-graph-data';

const prepareNodes = (nodes, darkMode) => {
  nodes.map((n) => {
    // eslint-disable-next-line no-param-reassign
    if (!n.syle) n.style = {};
    if (!n.labelCfg) n.labelCfg = {};
    if (!n.labelCfg.style) n.labelCfg.style = {};
    n.labelCfg.style.fill = darkMode ? '#b4bec2' : '#292929';
    n.style.fill = darkMode ? '#35354d' : '#DEE9FF';
    return n;
  });
  return nodes;
};

const prepareEdges = (edges, darkMode) => {
  edges.map((e) => {
    e.id = `${e.source}-${e.target}`;
    if (!e.style) e.style = {};
    e.style.color = darkMode ? '#737a7d' : '#e2e2e2';
    return e;
  });
  return edges;
};

const G6GraphViz = ({ graphVisible, setGraphVisible }) => {
  const [nodesData, linksData, navigate, highlight] = useGraphData();
  const { theme } = useThemeState();
  const [graph, setGraph] = useState(null);
  const graphContainerRef = useRef();
  console.log('hook Data', { nodesData, linksData, navigate, highlight });

  const darkMode = theme === 'dark';
  console.log({ darkMode });

  const nodes = useMemo(() => prepareNodes(nodesData, darkMode), [
    nodesData,
    darkMode,
  ]);
  const edges = useMemo(() => prepareEdges(linksData, darkMode), [
    linksData,
    darkMode,
  ]);

  console.log('nodes after fct', nodes);

  useEffect(() => {
    console.log('rerender');
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

      nGraph.on('node:touchstart', (e) => {
        // eslint-disable-next-line no-underscore-dangle
        navigate(e.item._cfg.model.slug);
        setGraphVisible(false);
      });

      console.log('data', { nodes, edges });

      nGraph.data({ nodes, edges });
      nGraph.render();
    } else {
      console.log('data', { nodes, edges });

      graph.data({ nodes, edges });
      graph.render();
    }
  }, [graph, edges, navigate, nodes, setGraphVisible, theme]);

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
          className={`fixed inset-0 backdrop-filter backdrop-blur-md transition-opacity flex ${
            graphVisible
              ? 'bg-opacity-75 dark:bg-opacity-75 ease-out duration-300'
              : 'bg-opacity-0 ease-in duration-200'
          }`}
          aria-hidden="true"
        >
          <div className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg divide-y divide-gray-200 max-w-screen-lg m-auto">
            <div className="px-4 py-5 sm:px-6 flex justify-between dark:text-gray-200">
              <h2 className="text-xl font-semibold">Graph</h2>
              <button
                type="button"
                className=""
                onClick={() => setGraphVisible(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
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
