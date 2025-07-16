import _sodium from 'libsodium-wrappers';
import { BenchmarkConfig, BenchmarkResult, BenchmarkFormData, AlgorithmType } from '../types/benchmark';

export class BenchmarkRunner {
  private static instance: BenchmarkRunner;
  private sodium: typeof _sodium | null = null;

  private constructor() {}

  static getInstance(): BenchmarkRunner {
    if (!BenchmarkRunner.instance) {
      BenchmarkRunner.instance = new BenchmarkRunner();
    }
    return BenchmarkRunner.instance;
  }

  async init(): Promise<void> {
    if (!this.sodium) {
      await _sodium.ready;
      this.sodium = _sodium;
    }
  }

  async runBenchmark(id: string, formData: BenchmarkFormData): Promise<BenchmarkResult> {
    await this.init();
    
    if (!this.sodium) {
      throw new Error('Sodium not initialized');
    }

    const config: BenchmarkConfig = {
      algorithm: formData.algorithm,
      iterations: parseInt(formData.iterations),
      warmupIterations: parseInt(formData.warmupIterations),
      dataSize: parseInt(formData.dataSize),
    };

    const message = new Uint8Array(config.dataSize);
    crypto.getRandomValues(message);

    let secretKey: Uint8Array | undefined;
    let publicKey: Uint8Array | undefined;
    let nonce: Uint8Array | undefined;

    // Setup keys based on algorithm
    if (config.algorithm === 'crypto_sign_detached' || config.algorithm === 'crypto_sign') {
      const keyPair = this.sodium.crypto_sign_keypair();
      secretKey = keyPair.privateKey;
      publicKey = keyPair.publicKey;
    } else if (config.algorithm === 'crypto_box_easy') {
      const keyPair = this.sodium.crypto_box_keypair();
      secretKey = keyPair.privateKey;
      publicKey = keyPair.publicKey;
      nonce = this.sodium.randombytes_buf(this.sodium.crypto_box_NONCEBYTES);
    } else if (config.algorithm === 'crypto_secretbox_easy') {
      secretKey = this.sodium.randombytes_buf(this.sodium.crypto_secretbox_KEYBYTES);
      nonce = this.sodium.randombytes_buf(this.sodium.crypto_secretbox_NONCEBYTES);
    }

    // Warmup
    const warmupStart = performance.now();
    for (let i = 0; i < config.warmupIterations; i++) {
      this.executeAlgorithm(config.algorithm, message, secretKey, publicKey, nonce);
    }
    const warmupTime = performance.now() - warmupStart;

    // Benchmark
    const times: number[] = [];
    const benchmarkStart = performance.now();

    for (let i = 0; i < config.iterations; i++) {
      const start = performance.now();
      this.executeAlgorithm(config.algorithm, message, secretKey, publicKey, nonce);
      const end = performance.now();
      times.push(end - start);
    }

    const totalTime = performance.now() - benchmarkStart;
    const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    const opsPerSecond = 1000 / averageTime;

    const result: BenchmarkResult = {
      id,
      algorithm: config.algorithm,
      iterations: config.iterations,
      warmupIterations: config.warmupIterations,
      dataSize: config.dataSize,
      averageTime,
      minTime,
      maxTime,
      opsPerSecond,
      totalTime,
      warmupTime,
      timestamp: new Date(),
    };

    return result;
  }

  private executeAlgorithm(
    algorithm: AlgorithmType,
    message: Uint8Array,
    secretKey?: Uint8Array,
    publicKey?: Uint8Array,
    nonce?: Uint8Array
  ): void {
    if (!this.sodium) throw new Error('Sodium not initialized');

    switch (algorithm) {
      case 'crypto_sign_detached':
        if (!secretKey) throw new Error('Secret key required for crypto_sign_detached');
        this.sodium.crypto_sign_detached(message, secretKey);
        break;
        
      case 'crypto_sign':
        if (!secretKey) throw new Error('Secret key required for crypto_sign');
        this.sodium.crypto_sign(message, secretKey);
        break;
        
      case 'crypto_box_easy':
        if (!secretKey || !publicKey || !nonce) throw new Error('Keys and nonce required for crypto_box_easy');
        this.sodium.crypto_box_easy(message, nonce, publicKey, secretKey);
        break;
        
      case 'crypto_secretbox_easy':
        if (!secretKey || !nonce) throw new Error('Secret key and nonce required for crypto_secretbox_easy');
        this.sodium.crypto_secretbox_easy(message, nonce, secretKey);
        break;
        
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
  }
}
