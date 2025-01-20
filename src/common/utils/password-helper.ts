import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/auth.dto';

export function encryptPassword(body: RegisterDto) {
  return body.password = bcrypt.hashSync(body.email + body.password, Math.round(Math.random() * 10));
}

export function campareHashPassword(password: string, hashPassword: string) {
  return bcrypt.compareSync(password,hashPassword);
}
