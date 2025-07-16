import { BaseBenchmark, Measurement } from './base_benchmark.js';

export class CryptoAeadXChaCha20Poly1305IetfEncryptBenchmark extends BaseBenchmark {
  private secretKey: Uint8Array | undefined;
  private nonce: Uint8Array | undefined;
  private arguments: [Uint8Array, Uint8Array, Uint8Array][] = [];

  setup() {
    this.secretKey = this.sodium.randombytes_buf(this.sodium.crypto_aead_xchacha20poly1305_ietf_KEYBYTES);
    this.nonce = this.sodium.randombytes_buf(this.sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES);

    this.arguments = new Array(this.config.iterations).fill(null).map(() => {
      const message = this.sodium.randombytes_buf(this.config.dataSize);
      const additionalData = this.sodium.randombytes_buf(16); // Example additional data
      return [message, additionalData, this.nonce!];
    });
  }

  run(): Measurement {
    return this.measureAll((message: Uint8Array, additionalData: Uint8Array, nonce: Uint8Array) => {
      this.sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
        message,
        additionalData,
        null, // No secret nonce for this AEAD
        nonce,
        this.secretKey!
      )
    }, this.arguments);
  }

  cleanup() {
    // No specific cleanup needed for this benchmark
  }
}
