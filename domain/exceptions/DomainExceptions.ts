/**
 * Base class for all domain exceptions.
 *
 * Domain exceptions represent business rule violations that are
 * part of the domain model, NOT infrastructure errors.
 *
 * @example
 * ```ts
 * throw new InvalidCredentialsException();
 * throw new UserNotFoundException('user-123');
 * ```
 */
export abstract class DomainException extends Error {
  public readonly code: string;
  public readonly timestamp: Date;

  constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.timestamp = new Date();

    // Fix prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when authentication credentials are invalid.
 */
export class InvalidCredentialsException extends DomainException {
  constructor(message = 'Invalid credentials provided') {
    super(message, 'AUTH_INVALID_CREDENTIALS');
  }
}

/**
 * Thrown when a user's session or token has expired.
 */
export class SessionExpiredException extends DomainException {
  constructor(message = 'Session has expired. Please log in again.') {
    super(message, 'AUTH_SESSION_EXPIRED');
  }
}

/**
 * Thrown when a user does not have permission to perform an action.
 */
export class UnauthorizedException extends DomainException {
  constructor(message = 'You are not authorized to perform this action') {
    super(message, 'AUTH_UNAUTHORIZED');
  }
}

/**
 * Thrown when a requested entity is not found.
 */
export class EntityNotFoundException extends DomainException {
  constructor(entityName: string, identifier?: string | number) {
    const msg = identifier
      ? `${entityName} with identifier "${identifier}" was not found`
      : `${entityName} was not found`;
    super(msg, 'ENTITY_NOT_FOUND');
  }
}

/**
 * Thrown when a domain validation rule is violated.
 */
export class ValidationException extends DomainException {
  public readonly violations: Record<string, string[]>;

  constructor(violations: Record<string, string[]>, message = 'Validation failed') {
    super(message, 'VALIDATION_ERROR');
    this.violations = violations;
  }
}
