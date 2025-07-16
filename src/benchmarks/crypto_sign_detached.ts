import { BaseBenchmark, Measurement } from './base_benchmark.js';

export class CryptoSignDetachedBenchmark extends BaseBenchmark {
  private secretKey: Uint8Array | undefined;
  private arguments: Uint8Array[][] = [];

  setup() {
    const keyPair = this.sodium.crypto_sign_keypair();
    this.secretKey = keyPair.privateKey;

    this.arguments = new Array(this.config.iterations).fill(null).map(() =>
      [this.sodium.randombytes_buf(this.config.dataSize)]
    );
  }

  run(): Measurement {
    return this.measureAll((message: Uint8Array) => {
      this.sodium.crypto_sign_detached(message, this.secretKey!);
    }, this.arguments);
  }

  cleanup() {
  }
}
