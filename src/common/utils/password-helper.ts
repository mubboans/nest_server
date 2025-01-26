import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/auth.dto';

export function encryptPassword(body: RegisterDto) {
  body.password = bcrypt.hashSync(body.password, Math.round(Math.random() * 10));
  return body
}

export function campareHashPassword(password: string, hashPassword: string) {
  return bcrypt.compareSync(password,hashPassword);
}
