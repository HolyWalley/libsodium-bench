import { Algorithm } from '../types/benchmark';

export const AVAILABLE_ALGORITHMS: Algorithm[] = [
  {
    id: 'crypto_sign_detached',
    name: 'crypto_sign_detached',
    description: 'Ed25519 detached signature generation',
    requiresKeyPair: true,
  },
  {
    id: 'crypto_sign_verify_detached',
    name: 'crypto_sign_verify_detached',
    description: 'Ed25519 detached signature verification',
    requiresKeyPair: true,
  },
  {
    id: 'crypto_aead_xchacha20_poly1305_ietf_encrypt',
    name: 'crypto_aead_xchacha20_poly1305_ietf_encrypt',
    description: 'XChaCha20-Poly1305 IETF authenticated encryption',
    requiresSecretKey: true,
  }
];
