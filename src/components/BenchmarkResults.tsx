import React from 'react';
import { BenchmarkResult } from '../types/benchmark';
import { AVAILABLE_ALGORITHMS } from '../constants/algorithms';

interface BenchmarkResultsProps {
  result: BenchmarkResult | undefined;
}

export const BenchmarkResults: React.FC<BenchmarkResultsProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="benchmark-results">
        <h3>Results</h3>
        <p>No results yet. Run the benchmark to see results.</p>
      </div>
    );
  }

  const algorithm = AVAILABLE_ALGORITHMS.find(alg => alg.id === result.algorithm);

  return (
    <div className="benchmark-results">
      <h3>Results</h3>
      <div className="result-item">
        <h4>{algorithm?.name || result.algorithm}</h4>
        <div className="result-grid">
          <div className="result-stat">
            <span className="label">Iterations:</span>
            <span className="value">{result.iterations.toLocaleString()}</span>
          </div>
          <div className="result-stat">
            <span className="label">Warmup Iterations:</span>
            <span className="value">{result.warmupIterations.toLocaleString()}</span>
          </div>
          <div className="result-stat">
            <span className="label">Data Size:</span>
            <span className="value">{result.dataSize.toLocaleString()} bytes</span>
          </div>
          <div className="result-stat">
            <span className="label">Average Time:</span>
            <span className="value">{result.averageTime.toFixed(3)} ms</span>
          </div>
          <div className="result-stat">
            <span className="label">Min Time:</span>
            <span className="value">{result.minTime.toFixed(3)} ms</span>
          </div>
          <div className="result-stat">
            <span className="label">Max Time:</span>
            <span className="value">{result.maxTime.toFixed(3)} ms</span>
          </div>
          <div className="result-stat">
            <span className="label">Ops/Second:</span>
            <span className="value">{Math.round(result.opsPerSecond).toLocaleString()}</span>
          </div>
          <div className="result-stat">
            <span className="label">Total Time:</span>
            <span className="value">{result.totalTime.toFixed(3)} ms</span>
          </div>
          <div className="result-stat">
            <span className="label">Warmup Time:</span>
            <span className="value">{result.warmupTime.toFixed(3)} ms</span>
          </div>
          <div className="result-stat">
            <span className="label">Timestamp:</span>
            <span className="value">{result.timestamp.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};