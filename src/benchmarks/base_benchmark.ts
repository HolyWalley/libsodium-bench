import { BenchmarkConfig, BenchmarkResult } from "../types/benchmark";
import _sodium from 'libsodium-wrappers';

export interface Measurement {
  averageTime: number;
  minTime: number;
  maxTime: number;
  totalTime: number;
  opsPerSecond: number;
}

export class BaseBenchmark {
  public config: BenchmarkConfig
  public sodium: typeof _sodium;

  constructor(sodium: typeof _sodium, config: BenchmarkConfig) {
    this.sodium = sodium;
    this.config = config
  }

  setup() {
    console.log(`Setting up benchmark: ${this.config.algorithm}`);
    // Setup code goes here
  }

  run(): Measurement {
    console.log(`Running benchmark: ${this.config.algorithm}`);
    // Benchmark logic goes here

    return {
      averageTime: 0,
      minTime: 0,
      maxTime: 0,
      totalTime: 0,
      opsPerSecond: 0,
    }
  }

  cleanup() {
    console.log(`Cleaning up benchmark: ${this.config.algorithm}`);
    // Cleanup code goes here
  }

  execute(): BenchmarkResult {
    console.log(`Starting benchmark: ${this.config.algorithm}`);
    this.setup();
    const measurements = this.run();
    this.cleanup();
    console.log(`Finished benchmark: ${this.config.algorithm}`);

    return {
      algorithm: this.config.algorithm,
      iterations: this.config.iterations,
      dataSize: this.config.dataSize,
      ...measurements,
      timestamp: new Date(),
    }
  }

  measureAll(callback: Function, iterations: unknown[][]): Measurement {
    const times: number[] = [];
    let totalTime = 0;

    iterations.forEach((iteration) => {
      const time = this.measure(() => {
        callback(...iteration);
      });
      times.push(time);
      totalTime += time;
    })

    const averageTime = totalTime / iterations.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    const opsPerSecond = iterations.length / (totalTime / 1000);

    return {
      averageTime,
      minTime,
      maxTime,
      totalTime,
      opsPerSecond,
    };
  }

  private measure(callback: () => void): number {
    const start = performance.now();
    callback();
    const end = performance.now();
    return end - start;
  }
}
