import { Encrypt } from "../../../data/protocols/encrypt";
import bcrypt from "bcrypt";

export class BcryptAdapter implements Encrypt {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt);
    return null;
  }
}
