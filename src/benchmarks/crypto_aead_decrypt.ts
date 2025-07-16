import { BaseBenchmark, Measurement } from './base_benchmark.js';

export class CryptoAeadDecryptBenchmark extends BaseBenchmark {
  private secretKey: Uint8Array | undefined;
  private nonce: Uint8Array | undefined;
  private arguments: [Uint8Array, Uint8Array, Uint8Array][] = [];

  setup() {
    this.secretKey = this.sodium.randombytes_buf(this.secretKeyLength());
    this.nonce = this.sodium.randombytes_buf(this.nonceLength());

    // Pre-encrypt messages for decryption benchmarking
    this.arguments = new Array(this.config.iterations).fill(null).map(() => {
      const message = this.sodium.randombytes_buf(this.config.dataSize);
      const additionalData = this.sodium.randombytes_buf(16);
      
      // Encrypt the message first
      const ciphertext = this.encryptMessage(message, additionalData, this.nonce!);
      
      return [ciphertext, additionalData, this.nonce!];
    });
  }

  run(): Measurement {
    return this.measureAll(this.runAlgorithm.bind(this), this.arguments);
  }

  cleanup() {
    // No specific cleanup needed for this benchmark
  }

  private encryptMessage(message: Uint8Array, additionalData: Uint8Array, nonce: Uint8Array): Uint8Array {
    switch (this.config.algorithm) {
      case 'crypto_aead_xchacha20_poly1305_ietf_decrypt':
        return this.sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
          message,
          additionalData,
          null,
          nonce,
          this.secretKey!
        );
      case 'crypto_aead_chacha20poly1305_decrypt':
        return this.sodium.crypto_aead_chacha20poly1305_encrypt(
          message,
          additionalData,
          null,
          nonce,
          this.secretKey!
        );
      case 'crypto_aead_chacha20poly1305_ietf_decrypt':
        return this.sodium.crypto_aead_chacha20poly1305_ietf_encrypt(
          message,
          additionalData,
          null,
          nonce,
          this.secretKey!
        );
      case 'crypto_aead_aegis256_decrypt':
        return this.sodium.crypto_aead_aegis256_encrypt(
          message,
          additionalData,
          null,
          nonce,
          this.secretKey!
        );
      case 'crypto_aead_aegis128l_decrypt':
        return this.sodium.crypto_aead_aegis128l_encrypt(
          message,
          additionalData,
          null,
          nonce,
          this.secretKey!
        );
      default:
        throw new Error(`Unsupported algorithm: ${this.config.algorithm}`);
    }
  }

  private runAlgorithm(ciphertext: Uint8Array, additionalData: Uint8Array, nonce: Uint8Array): Uint8Array {
    switch (this.config.algorithm) {
      case 'crypto_aead_xchacha20_poly1305_ietf_decrypt':
        return this.sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
          null,
          ciphertext,
          additionalData,
          nonce,
          this.secretKey!
        );
      case 'crypto_aead_chacha20poly1305_decrypt':
        return this.sodium.crypto_aead_chacha20poly1305_decrypt(
          null,
          ciphertext,
          additionalData,
          nonce,
          this.secretKey!
        );
      case 'crypto_aead_chacha20poly1305_ietf_decrypt':
        return this.sodium.crypto_aead_chacha20poly1305_ietf_decrypt(
          null,
          ciphertext,
          additionalData,
          nonce,
          this.secretKey!
        );
      case 'crypto_aead_aegis256_decrypt':
        return this.sodium.crypto_aead_aegis256_decrypt(
          null,
          ciphertext,
          additionalData,
          nonce,
          this.secretKey!
        );
      case 'crypto_aead_aegis128l_decrypt':
        return this.sodium.crypto_aead_aegis128l_decrypt(
          null,
          ciphertext,
          additionalData,
          nonce,
          this.secretKey!
        );
      default:
        throw new Error(`Unsupported algorithm: ${this.config.algorithm}`);
    }
  }

  private secretKeyLength(): number {
    switch (this.config.algorithm) {
      case 'crypto_aead_xchacha20_poly1305_ietf_decrypt':
        return this.sodium.crypto_aead_xchacha20poly1305_ietf_KEYBYTES;
      case 'crypto_aead_chacha20poly1305_decrypt':
        return this.sodium.crypto_aead_chacha20poly1305_KEYBYTES;
      case 'crypto_aead_chacha20poly1305_ietf_decrypt':
        return this.sodium.crypto_aead_chacha20poly1305_ietf_KEYBYTES;
      case 'crypto_aead_aegis256_decrypt':
        return this.sodium.crypto_aead_aegis256_KEYBYTES;
      case 'crypto_aead_aegis128l_decrypt':
        return this.sodium.crypto_aead_aegis128l_KEYBYTES;
      default:
        throw new Error(`Unsupported algorithm: ${this.config.algorithm}`);
    }
  }

  private nonceLength(): number {
    switch (this.config.algorithm) {
      case 'crypto_aead_xchacha20_poly1305_ietf_decrypt':
        return this.sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES;
      case 'crypto_aead_chacha20poly1305_decrypt':
        return this.sodium.crypto_aead_chacha20poly1305_NPUBBYTES;
      case 'crypto_aead_chacha20poly1305_ietf_decrypt':
        return this.sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES;
      case 'crypto_aead_aegis256_decrypt':
        return this.sodium.crypto_aead_aegis256_NPUBBYTES;
      case 'crypto_aead_aegis128l_decrypt':
        return this.sodium.crypto_aead_aegis128l_NPUBBYTES;
      default:
        throw new Error(`Unsupported algorithm: ${this.config.algorithm}`); 
    }
  }
}