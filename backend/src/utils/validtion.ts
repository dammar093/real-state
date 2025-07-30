import ApiError from "./errorHandler";

class Validation {
  private emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  private passwordRegex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;

  public emailValidation(email: string): void {
    if (!email?.trim()) {
      throw new ApiError(400, "Email is required");
    }
    if (!this.emailRegex.test(email)) {
      throw new ApiError(400, "Please enter a valid email");
    }
  }

  public fullNameValidation(fullName: string): void {
    if (!fullName?.trim()) {
      throw new ApiError(400, "Full name is required");
    }
    if (fullName.trim().length < 2) {
      throw new ApiError(400, "Full name must be at least 2 characters long");
    }
  }

  public passwordValidation(password: string): void {
    if (!password?.trim()) {
      throw new ApiError(400, "Password is required");
    }
    if (password.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters long");
    }
    if (!this.passwordRegex.test(password)) {
      throw new ApiError(400, "Password must contain at least one letter and one special character");
    }
  }
}

export default new Validation();
