import os from 'os';
import crypto from 'crypto';
import moment from 'moment';

export function getIPAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    const iface = interfaces[key];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1') {
        return alias.address;
      }
    }
  }
}

export function hashPassword(password: string): string {
  return crypto
    .createHash('md5')
    .update(password)
    .update(process.env.PASSWORD_SALT)
    .digest('hex');
}

export function formatTime(time: Date | string, hasTime: boolean = true): string {
  const newTime: string = moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
  const [date, _time] = newTime.split(' ');
  if (hasTime) {
    return `${date} ${_time}`;
  }
  return date;
}

