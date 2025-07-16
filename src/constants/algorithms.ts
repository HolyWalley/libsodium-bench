import { Algorithm } from '../types/benchmark';

export const AVAILABLE_ALGORITHMS: Algorithm[] = [
  {
    id: 'crypto_sign_detached',
    name: 'Detached Signing',
    description: 'Ed25519 detached signature generation',
    requiresKeyPair: true,
  },
  {
    id: 'crypto_sign',
    name: 'Combined Signing',
    description: 'Ed25519 combined signature generation',
    requiresKeyPair: true,
  },
  {
    id: 'crypto_box_easy',
    name: 'Box Encryption',
    description: 'Curve25519 + XSalsa20 + Poly1305 encryption',
    requiresKeyPair: true,
  },
  {
    id: 'crypto_secretbox_easy',
    name: 'Secret Box',
    description: 'XSalsa20 + Poly1305 secret key encryption',
    requiresSecretKey: true,
  },
  {
    id: 'crypto_hash_sha256',
    name: 'SHA-256',
    description: 'SHA-256 hash generation',
  },
  {
    id: 'crypto_hash_sha512',
    name: 'SHA-512',
    description: 'SHA-512 hash generation',
  },
];