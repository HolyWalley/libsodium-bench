import { BaseBenchmark, Measurement } from './base_benchmark.js';

export class CryptoSignVerifyDetachedBenchmark extends BaseBenchmark {
  private secretKey: Uint8Array | undefined;
  private publicKey: Uint8Array | undefined;
  private arguments: [Uint8Array, Uint8Array][] = [];

  setup() {
    const keyPair = this.sodium.crypto_sign_keypair();
    this.secretKey = keyPair.privateKey;
    this.publicKey = keyPair.publicKey;

    this.arguments = new Array(this.config.iterations).fill(null).map(() => {
      const message = this.sodium.randombytes_buf(this.config.dataSize);
      const signature = this.sodium.crypto_sign_detached(message, this.secretKey!);
      return [signature, message];
    });
  }

  run(): Measurement {
    return this.measureAll((signature: Uint8Array, message: Uint8Array) => {
      this.sodium.crypto_sign_verify_detached(signature, message, this.publicKey!)
    }, this.arguments);
  }

  cleanup() {
  }
}
