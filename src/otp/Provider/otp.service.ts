import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  private otps = new Map<number, { otp: string; expiresAt: Date }>();

  public generateOtp(userId: number): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    this.otps.set(userId, { otp, expiresAt });
    return otp;
  }

  public validateOtp(userId: number, otp: string): boolean {
    const storedOtp = this.otps.get(userId);
    if (!storedOtp) return false;

    const { otp: storedValue, expiresAt } = storedOtp;
    if (otp === storedValue && new Date() <= expiresAt) {
      this.otps.delete(userId);
      return true;
    }
    return false;
  }
}
