// 📄 types/error.ts

/**
 * アプリ全体で使える共通エラークラス
 * TypeScript で try/catch しやすくするためのもの
 */
export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ApiError extends Error {
  status?: number;
  constructor(message?: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ValidationError";
  }
}
