function ContactUs() {

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <form className="vanilla-form" id="contactForm">
                    <h1>Contact Us</h1>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    <br />
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>
                    <br />
                    <button type="submit" className="btn btn-success float-end">SEND</button>
                </form>
            </div>
        </div>
    );
}
export default ContactUs;