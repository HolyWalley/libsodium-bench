import { BaseBenchmark, Measurement } from './base_benchmark.js';

export class CryptoBoxSealOpenBenchmark extends BaseBenchmark {
  private publicKey: Uint8Array | undefined;
  private privateKey: Uint8Array | undefined;
  private arguments: [Uint8Array][] = [];

  setup() {
    const keypair = this.sodium.crypto_box_keypair();
    this.publicKey = keypair.publicKey;
    this.privateKey = keypair.privateKey;

    this.arguments = new Array(this.config.iterations).fill(null).map(() =>
      [this.sodium.crypto_box_seal(this.sodium.randombytes_buf(this.config.dataSize), this.publicKey!)]
    );
  }

  run(): Measurement {
    return this.measureAll((ciphertext: Uint8Array) => 
      this.sodium.crypto_box_seal_open(ciphertext, this.publicKey!, this.privateKey!),
      this.arguments
    )
  }
}
