function Login() {
    return (
        // <div className="container">
            <div className="row justify-content-center">
                <form className="vanilla-form" id="loginForm">
                    <h1>Log in</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" required />
                    <br />
                    <button type="submit" className="btn btn-success float-end">SEND</button>
                    <a href="/register">Need an account? Register.</a>
                </form>
            </div>
        // </div>
    );
}
export default Login;