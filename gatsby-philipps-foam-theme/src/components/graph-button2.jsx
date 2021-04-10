import React, { useState } from 'react';
import G6GraphViz from './g6-graph-viz';
import './graph-button.css';

const GraphButton2 = () => {
  const [graphVisible, setGraphVisible] = useState(false);

  return (
    <>
      <button
        type="button"
        title="Show Graph visualisation"
        aria-label="Show Graph visualisation"
        className="graph-button"
        onClick={() => setGraphVisible(true)}
      >
        GSX
      </button>
      {typeof window !== 'undefined' ? (
        <G6GraphViz
          graphVisible={graphVisible}
          setGraphVisible={setGraphVisible}
        />
      ) : null}
    </>
  );
};

export default GraphButton2;
