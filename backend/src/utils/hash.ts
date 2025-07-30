import bcrypt from "bcryptjs";

class HashText {
  private saltRounds: number = 10;
  private password: string = "";

  public hashPassword(password: string): string {
    this.password = password;
    const hash = bcrypt.hashSync(this.password, this.saltRounds);
    return hash;
  }
}

export default new HashText()