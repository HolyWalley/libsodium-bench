import { useState } from 'react'
import { BenchmarkForm } from './components/BenchmarkForm'
import { BenchmarkResults } from './components/BenchmarkResults'
import { BenchmarkManager } from './components/BenchmarkManager'
import { BenchmarkRunner } from './utils/benchmarkRunner'
import { BenchmarkInstance, BenchmarkFormData } from './types/benchmark'
import './App.css'

function App() {
  const [benchmarks, setBenchmarks] = useState<BenchmarkInstance[]>([])

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const handleAddBenchmark = () => {
    const newBenchmark: BenchmarkInstance = {
      id: generateId(),
      algorithm: 'crypto_sign_detached',
      iterations: 1000,
      warmupIterations: 100,
      dataSize: 1024,
      isRunning: false,
    }
    setBenchmarks(prev => [...prev, newBenchmark])
  }

  const handleRemoveBenchmark = (id: string) => {
    setBenchmarks(prev => prev.filter(b => b.id !== id))
  }

  const handleBenchmarkSubmit = async (id: string, formData: BenchmarkFormData) => {
    // Update benchmark state to running
    setBenchmarks(prev => prev.map(b => 
      b.id === id 
        ? { ...b, isRunning: true, algorithm: formData.algorithm, iterations: parseInt(formData.iterations), warmupIterations: parseInt(formData.warmupIterations), dataSize: parseInt(formData.dataSize) }
        : b
    ))

    try {
      const benchmarkRunner = BenchmarkRunner.getInstance()
      const result = await benchmarkRunner.runBenchmark(id, formData)
      
      // Update benchmark with result
      setBenchmarks(prev => prev.map(b => 
        b.id === id 
          ? { ...b, isRunning: false, result }
          : b
      ))
    } catch (error) {
      console.error('Benchmark failed:', error)
      alert('Benchmark failed. Check console for details.')
      
      // Update benchmark to not running
      setBenchmarks(prev => prev.map(b => 
        b.id === id 
          ? { ...b, isRunning: false }
          : b
      ))
    }
  }

  return (
    <div className="app">
      <BenchmarkManager 
        benchmarks={benchmarks} 
        onAddBenchmark={handleAddBenchmark} 
      />
      
      <div className="benchmarks-container">
        {benchmarks.map(benchmark => (
          <div key={benchmark.id} className="benchmark-item">
            <BenchmarkForm 
              benchmark={benchmark}
              onSubmit={handleBenchmarkSubmit}
              onRemove={handleRemoveBenchmark}
            />
            <BenchmarkResults result={benchmark.result} />
          </div>
        ))}
        
        {benchmarks.length === 0 && (
          <div className="empty-state">
            <p>No benchmarks yet. Click "Add Benchmark" to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
