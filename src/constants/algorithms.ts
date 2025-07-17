import { Algorithm } from '../types/benchmark';

export const AVAILABLE_ALGORITHMS: Algorithm[] = [
  {
    id: 'crypto_sign_detached',
    name: 'crypto_sign_detached',
    description: 'Ed25519 detached signature generation'
  },
  {
    id: 'crypto_sign_verify_detached',
    name: 'crypto_sign_verify_detached',
    description: 'Ed25519 detached signature verification'
  },
  {
    id: 'crypto_aead_xchacha20_poly1305_ietf_encrypt',
    name: 'crypto_aead_xchacha20_poly1305_ietf_encrypt',
    description: 'The XChaCha20 variant, introduced in libsodium 1.0.12. It can safely encrypt a practically unlimited number of messages of any sizes, and random nonces are safe to use.'
  },
  {
    id: 'crypto_aead_chacha20poly1305_encrypt',
    name: 'crypto_aead_chacha20poly1305_encrypt',
    description: 'The original construction can safely encrypt up to 2^64 messages with the same key (even more with most protocols), without any practical limit to the size of a message (up to 2^64 bytes for a 128-bit tag).',
  },
  {
    id: 'crypto_aead_chacha20poly1305_ietf_encrypt',
    name: 'crypto_aead_chacha20poly1305_ietf_encrypt',
    description: 'The IETF variant. It can safely encrypt a practically unlimited number of messages, but individual messages cannot exceed 64*(2^32)-64 bytes (approximatively 256 GB).',
  },
  {
    id: 'crypto_aead_aegis256_encrypt',
    name: 'crypto_aead_aegis256_encrypt',
    description: 'AEGIS-256 is a modern AES-based cipher with unique properties making it easier and safer to use than common alternatives'
  },
  {
    id: 'crypto_aead_aegis128l_encrypt',
    name: 'crypto_aead_aegis128l_encrypt',
    description: 'AEGIS-128L is a modern AES-based cipher with unique properties making it easier and safer to use than common alternatives'
  },
  {
    id: 'crypto_aead_xchacha20_poly1305_ietf_decrypt',
    name: 'crypto_aead_xchacha20_poly1305_ietf_decrypt',
    description: 'XChaCha20-Poly1305 IETF decryption - benchmarks decryption performance'
  },
  {
    id: 'crypto_aead_chacha20poly1305_decrypt',
    name: 'crypto_aead_chacha20poly1305_decrypt',
    description: 'ChaCha20-Poly1305 original decryption - benchmarks decryption performance'
  },
  {
    id: 'crypto_aead_chacha20poly1305_ietf_decrypt',
    name: 'crypto_aead_chacha20poly1305_ietf_decrypt',
    description: 'ChaCha20-Poly1305 IETF decryption - benchmarks decryption performance'
  },
  {
    id: 'crypto_aead_aegis256_decrypt',
    name: 'crypto_aead_aegis256_decrypt',
    description: 'AEGIS-256 decryption - benchmarks decryption performance'
  },
  {
    id: 'crypto_aead_aegis128l_decrypt',
    name: 'crypto_aead_aegis128l_decrypt',
    description: 'AEGIS-128L decryption - benchmarks decryption performance'
  },
  {
    id: 'crypto_box_seal',
    name: 'crypto_box_seal',
    description: 'Anonymous encryption using Curve25519, XSalsa20 and Poly1305'
  },
  {
    id: 'crypto_box_seal_open',
    name: 'crypto_box_seal_open',
    description: 'Anonymous decryption using Curve25519, XSalsa20 and Poly1305'
  }
];
