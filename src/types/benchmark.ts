export type AlgorithmType = 'crypto_sign_detached' | 
  'crypto_sign_verify_detached' | 
  'crypto_aead_xchacha20_poly1305_ietf_encrypt' |
  'crypto_aead_chacha20poly1305_encrypt' |
  'crypto_aead_chacha20poly1305_ietf_encrypt' |
  'crypto_aead_aegis256_encrypt' |
  'crypto_aead_aegis128l_encrypt' |
  'crypto_aead_xchacha20_poly1305_ietf_decrypt' |
  'crypto_aead_chacha20poly1305_decrypt' |
  'crypto_aead_chacha20poly1305_ietf_decrypt' |
  'crypto_aead_aegis256_decrypt' |
  'crypto_aead_aegis128l_decrypt'
;

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
  dataSize: number;
  isRunning: boolean;
  result?: BenchmarkResult;
}

export interface BenchmarkConfig {
  algorithm: AlgorithmType;
  iterations: number;
  dataSize: number;
  secretKey?: Uint8Array;
  publicKey?: Uint8Array;
}

export interface BenchmarkResult {
  algorithm: AlgorithmType;
  iterations: number;
  dataSize: number;
  averageTime: number;
  minTime: number;
  maxTime: number;
  opsPerSecond: number;
  totalTime: number;
  timestamp: Date;
}

export interface BenchmarkFormData {
  algorithm: AlgorithmType;
  iterations: string;
  dataSize: string;
}
