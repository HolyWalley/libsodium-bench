import React, { useState } from 'react';
import { BenchmarkFormData, BenchmarkInstance } from '../types/benchmark';
import { AVAILABLE_ALGORITHMS } from '../constants/algorithms';

interface BenchmarkFormProps {
  benchmark: BenchmarkInstance;
  onSubmit: (id: string, formData: BenchmarkFormData) => void;
  onRemove: (id: string) => void;
}

export const BenchmarkForm: React.FC<BenchmarkFormProps> = ({ benchmark, onSubmit, onRemove }) => {
  const [formData, setFormData] = useState<BenchmarkFormData>({
    algorithm: benchmark.algorithm,
    iterations: benchmark.iterations.toString(),
    dataSize: benchmark.dataSize.toString()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(benchmark.id, formData);
  };

  const handleInputChange = (field: keyof BenchmarkFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedAlgorithm = AVAILABLE_ALGORITHMS.find(alg => alg.id === formData.algorithm);

  return (
    <form onSubmit={handleSubmit} className="benchmark-form">
      <div className="form-header">
        <h2>Benchmark Configuration</h2>
        <button 
          type="button" 
          className="remove-btn"
          onClick={() => onRemove(benchmark.id)}
          disabled={benchmark.isRunning}
        >
          ×
        </button>
      </div>

      <div className="form-group">
        <label htmlFor={`algorithm-${benchmark.id}`}>Algorithm:</label>
        <select
          id={`algorithm-${benchmark.id}`}
          value={formData.algorithm}
          onChange={(e) => handleInputChange('algorithm', e.target.value)}
          disabled={benchmark.isRunning}
        >
          {AVAILABLE_ALGORITHMS.map(alg => (
            <option key={alg.id} value={alg.id}>
              {alg.name}
            </option>
          ))}
        </select>
        {selectedAlgorithm && (
          <p className="algorithm-description">{selectedAlgorithm.description}</p>
        )}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`iterations-${benchmark.id}`}>Iterations:</label>
          <input
            type="number"
            id={`iterations-${benchmark.id}`}
            min="1"
            max="100000"
            value={formData.iterations}
            onChange={(e) => handleInputChange('iterations', e.target.value)}
            disabled={benchmark.isRunning}
          />
        </div>

        <div className="form-group">
          <label htmlFor={`dataSize-${benchmark.id}`}>Data Size (bytes):</label>
          <input
            type="number"
            id={`dataSize-${benchmark.id}`}
            min="1"
            max="1048576"
            value={formData.dataSize}
            onChange={(e) => handleInputChange('dataSize', e.target.value)}
            disabled={benchmark.isRunning}
          />
        </div>
      </div>

      <button type="submit" disabled={benchmark.isRunning}>
        {benchmark.isRunning ? 'Running Benchmark...' : 'Run Benchmark'}
      </button>
    </form>
  );
};
