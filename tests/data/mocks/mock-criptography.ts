import { Decrypter } from "src/data/protocols/criptography/decrypter";
import { Encrypter } from "src/data/protocols/criptography/encrypter";
import { HashComparer } from "src/data/protocols/criptography/hash-compare";
import { Hasher } from "src/data/protocols/criptography/hasher";

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve("hashed_password");
    }
  }
  return new HasherStub();
};

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return Promise.resolve("any_value");
    }
  }
  return new DecrypterStub();
};

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(id: string): Promise<string> {
      return Promise.resolve("any_token");
    }
  }
  return new EncrypterStub();
};

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashComparerStub();
};
