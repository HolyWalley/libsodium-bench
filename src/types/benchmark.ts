export type AlgorithmType = 'crypto_sign_detached' | 'crypto_sign' | 'crypto_box_easy' | 'crypto_secretbox_easy' | 'crypto_hash_sha256' | 'crypto_hash_sha512';

export interface Algorithm {
  id: AlgorithmType;
  name: string;
  description: string;
  requiresKeyPair?: boolean;
  requiresSecretKey?: boolean;
}

export interface BenchmarkInstance {
  id: string;
  algorithm: AlgorithmType;
  iterations: number;
  warmupIterations: number;
  dataSize: number;
  isRunning: boolean;
  result?: BenchmarkResult;
}

export interface BenchmarkConfig {
  algorithm: AlgorithmType;
  iterations: number;
  warmupIterations: number;
  dataSize: number;
  secretKey?: Uint8Array;
  publicKey?: Uint8Array;
}

export interface BenchmarkResult {
  id: string;
  algorithm: AlgorithmType;
  iterations: number;
  warmupIterations: number;
  dataSize: number;
  averageTime: number;
  minTime: number;
  maxTime: number;
  opsPerSecond: number;
  totalTime: number;
  warmupTime: number;
  timestamp: Date;
}

export interface BenchmarkFormData {
  algorithm: AlgorithmType;
  iterations: string;
  warmupIterations: string;
  dataSize: string;
}