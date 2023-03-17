const generateAuthError = (message: string) => {
  switch (message) {
    case 'EMAIL_EXISTS':
      return 'User with this email already exists';
    case 'USER_DISABLED':
      return 'User account disabled by administrator.';
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
    case 'INVALID_EMAIL':
      return 'Invalid email or password';
    default:
      return 'Too many login attempts, please try again later';
  }
};

export default generateAuthError;
