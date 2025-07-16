import React from 'react';
import { BenchmarkInstance } from '../types/benchmark';

interface BenchmarkManagerProps {
  benchmarks: BenchmarkInstance[];
  onAddBenchmark: () => void;
}

export const BenchmarkManager: React.FC<BenchmarkManagerProps> = ({ benchmarks, onAddBenchmark }) => {
  const runningCount = benchmarks.filter(b => b.isRunning).length;
  const completedCount = benchmarks.filter(b => b.result).length;

  return (
    <div className="benchmark-manager">
      <div className="manager-header">
        <h1>LibSodium Benchmark</h1>
        <div className="manager-stats">
          <span className="stat">Total: {benchmarks.length}</span>
          <span className="stat">Running: {runningCount}</span>
          <span className="stat">Completed: {completedCount}</span>
        </div>
      </div>
      
      <button 
        className="add-benchmark-btn"
        onClick={onAddBenchmark}
      >
        + Add Benchmark
      </button>
    </div>
  );
};