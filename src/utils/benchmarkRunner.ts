import _sodium from 'libsodium-wrappers';
import { BenchmarkConfig, BenchmarkResult, BenchmarkFormData } from '../types/benchmark';

import {
  CryptoSignDetachedBenchmark,
  CryptoSignVerifyDetachedBenchmark,
  CryptoAeadEncryptBenchmark,
  CryptoAeadDecryptBenchmark
} from '../benchmarks';

const BENCHMARKS = {
  crypto_sign_detached: CryptoSignDetachedBenchmark,
  crypto_sign_verify_detached: CryptoSignVerifyDetachedBenchmark,
  crypto_aead_xchacha20_poly1305_ietf_encrypt: CryptoAeadEncryptBenchmark,
  crypto_aead_chacha20poly1305_encrypt: CryptoAeadEncryptBenchmark,
  crypto_aead_chacha20poly1305_ietf_encrypt: CryptoAeadEncryptBenchmark,
  crypto_aead_aegis256_encrypt: CryptoAeadEncryptBenchmark,
  crypto_aead_aegis128l_encrypt: CryptoAeadEncryptBenchmark,
  crypto_aead_xchacha20_poly1305_ietf_decrypt: CryptoAeadDecryptBenchmark,
  crypto_aead_chacha20poly1305_decrypt: CryptoAeadDecryptBenchmark,
  crypto_aead_chacha20poly1305_ietf_decrypt: CryptoAeadDecryptBenchmark,
  crypto_aead_aegis256_decrypt: CryptoAeadDecryptBenchmark,
  crypto_aead_aegis128l_decrypt: CryptoAeadDecryptBenchmark
}

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

  async runBenchmark(formData: BenchmarkFormData): Promise<BenchmarkResult> {
    await this.init();
    
    if (!this.sodium) {
      throw new Error('Sodium not initialized');
    }

    const config: BenchmarkConfig = {
      algorithm: formData.algorithm,
      iterations: parseInt(formData.iterations),
      dataSize: parseInt(formData.dataSize),
    };

    const benchmark = new BENCHMARKS[config.algorithm](this.sodium, config);
    const result = benchmark.execute();

    return result;
  }
}
