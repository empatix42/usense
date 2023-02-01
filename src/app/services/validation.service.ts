import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  passwordStatus!: string;

  constructor() {}

  changePasswordStatus(password: string): string {
    const hasLetters = /[a-zA-Z]+/.test(password);
    const hasDigits = /[\d]+/.test(password);
    const hasSymbols = /[^a-zA-Z0-9]+/.test(password);

    const isEmpty = !password;
    const isTooShort = password.length < 8;

    const isWeak = hasLetters || hasDigits || hasSymbols;

    const isMedium =
      (hasLetters && hasSymbols) ||
      (hasLetters && hasDigits) ||
      (hasDigits && hasSymbols);

    const isStrong = hasLetters && hasDigits && hasSymbols;

    switch (true) {
      case isStrong:
        this.passwordStatus = 'strong';
        break;
      case isMedium:
        this.passwordStatus = 'medium';
        break;
      case isWeak:
        this.passwordStatus = 'weak';
        break;
      case isEmpty:
        this.passwordStatus = '';
        break;
      default:
        this.passwordStatus = 'too short';
    }

    if (!isEmpty && isTooShort) this.passwordStatus = 'too short';

    return this.passwordStatus;
  }
}
