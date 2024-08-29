package bujii.be.exceptions;

public class LoginError extends RuntimeException {
    public LoginError(String message) {
        super(message);
    }

    @Override
    public String getMessage() {
        return super.getMessage();
    }
}
