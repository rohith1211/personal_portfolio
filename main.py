from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import uvicorn

app = FastAPI()

# Function to send email
def send_email(name: str, email: str, message: str):
    sender_email = "portfoliomail2025@gmail.com"  # Your Gmail address
    receiver_email = "naredlarohith5828@gmail.com"  # Your email address
    password = "portfolio@2000"  # Your Gmail password (if you have 2FA, use the App Password here)

    # Create the email message
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = "New Contact Form Submission"

    body = f"New message from {name} ({email}):\n\n{message}"
    msg.attach(MIMEText(body, "plain"))

    try:
        # Establish the SMTP connection and send the email
        server = smtplib.SMTP("smtp.gmail.com", 587)  # Gmail's SMTP server
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")

# Route to serve the HTML form (optional)
@app.get("/", response_class=HTMLResponse)
async def get_form():
    return """
    <html>
        <body>
            <h2>Contact</h2>
            <form action="/submit-form/" method="POST">
                <label for="name">Name: </label><br>
                <input type="text" id="name" name="name" required><br><br>
                <label for="email">Email: </label><br>
                <input type="email" id="email" name="email" required><br><br>
                <label for="message">Message: </label><br>
                <textarea id="message" name="message" required></textarea><br><br>
                <button type="submit">Send Message</button>
            </form>
        </body>
    </html>
    """

# Route to handle form submission
@app.post("/submit-form/")
async def submit_form(name: str = Form(...), email: str = Form(...), message: str = Form(...)):
    # Send the form data via email
    send_email(name, email, message)

    # Respond with a confirmation message
    return {"message": "Form submission received! Thank you for reaching out."}

# Run the app using Uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
