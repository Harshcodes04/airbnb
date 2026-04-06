# Airbnb Clone - Backend Practice Project

A comprehensive Airbnb-style web application built from scratch. This project was primarily developed as a **learning-based practice project** to deeply understand how backend systems, databases, authentication, and routing work together in a real-world scenario.

Through this project, I explored and implemented core backend concepts using **Node.js, Express, MongoDB, and Mongoose**, seamlessly integrating them with dynamically rendered front-end views using **EJS and Tailwind CSS**.

## ✨ Key Features & Concepts Learned

- **User Authentication & Authorization**: Secure signup, login, and logout functionalities with hashed passwords and session management.
- **Role-Based Access Control**: Different user roles (Host vs. Guest) with distinct permissions (e.g., only hosts can add or edit homes).
- **CRUD Operations**: Full Create, Read, Update, and Delete capabilities for homes and property listings.
- **Data Validation**: Server-side form validation to ensure data integrity before storing it in the database.
- **File Uploads**: Handling local file/image uploads for property photos.
- **Dynamic Routing & Views**: Using EJS templates to render dynamic data based on the user's session state and database records.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Templating**: EJS (Embedded JavaScript templating)
- **Styling**: Tailwind CSS
- **Authentication/Sessions**: `bcryptjs`, `express-session`, `connect-mongodb-session`
- **Other Tools**: `multer` (file uploads), `express-validator` (validation)

---

## 🚀 How to Run Locally

If you'd like to run this project on your own machine to explore the code or try it out, follow these steps:

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd airbnb
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

This app uses environment variables to securely store configuration details like database credentials and secret keys. You need to create your own configuration file.

1. Create a new file named `.env` in the root folder of the project.
2. Open `.env.example` to see the required variables, or copy the content below into your newly created `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_super_secret_key
PORT=5001
```

3. Replace `your_mongodb_connection_string` with a valid MongoDB URI (you can get one for free using MongoDB Atlas).
4. Replace `your_super_secret_key` with any random string you prefer for session encryption.

### 4. Start the Application

Once your `.env` is set up and dependencies are installed, you can start the development server:

```bash
npm start
```

*This command runs the backend server with `nodemon` and concurrently builds the Tailwind CSS files.*

Open [http://localhost:5001](http://localhost:5001) in your browser to view the application!

---

**Note:** Since this is a learning-focused project, you might find different iterations or variations in how certain features were implemented as my understanding grew throughout the process.
