import { BaseBenchmark, Measurement } from './base_benchmark.js';

export class CryptoBoxSealBenchmark extends BaseBenchmark {
  private publicKey: Uint8Array | undefined;
  private arguments: [Uint8Array][] = [];

  setup() {
    this.publicKey = this.sodium.crypto_box_keypair().publicKey;

    // Generate random messages for the specified number of iterations
    this.arguments = new Array(this.config.iterations).fill(null).map(() =>
      [this.sodium.randombytes_buf(this.config.dataSize)]
    );
  }

  run(): Measurement {
    return this.measureAll((message: Uint8Array) => 
      this.sodium.crypto_box_seal(message, this.publicKey!),
      this.arguments
    )
  }
}
