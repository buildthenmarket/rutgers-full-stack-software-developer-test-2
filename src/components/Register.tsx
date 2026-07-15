function Register() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className="vanilla-form" id="registerForm">
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" required></input>
                    <br />
                    <label htmlFor="password">Repeat Password:</label>
                    <input id="passwordConfirm" name="passwordConfirm" required></input>
                    <br />
                    <button type="submit" className="btn btn-success float-end">SEND</button>
                    <a href="login">Have an account? Login.</a>
                </form>
            </div>
        </div>
    );
}
export default Register;