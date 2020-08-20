import os from 'os';
import { ValidationError } from 'class-validator';

export const getIPAddress = (): string => {
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
};

export function parseValidationError(error: ValidationError) {
  return {
    [error.property]: Object.values(error.constraints),
  };
}
