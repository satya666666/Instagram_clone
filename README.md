# Instagram Clone

## Overview

This project is a full-stack social media application designed as a clone of Instagram. It allows users to create accounts, post images and videos (including reels and stories), interact through likes, comments, chats, and messages, follow other users, and more. The backend is built with Spring Boot (Java) for handling API requests, authentication, and data persistence, while the frontend is developed using React.js with Redux for state management and Vite as the build tool.

## Features

- **User Authentication**: Secure login, signup, and JWT-based authorization.
- **Posts**: Create, view, like, and comment on posts.
- **Reels**: Upload and view short videos (reels), with comments and likes.
- **Stories**: Temporary stories that disappear after a set time.
- **Chats and Messaging**: Real-time chat functionality between users.
- **Profile Management**: User profiles with details, followers, and following lists.
- **Search**: Search for users and content.
- **Notifications**: Basic snackbar notifications for actions.
- **Media Upload**: Integration with Cloudinary for image and video uploads.
- **Exception Handling**: Custom error handling for resource not found and other exceptions.

## Tech Stack

### Backend
- Java 17+
- Spring Boot (for RESTful APIs, dependency injection, and security)
- Spring Data JPA (for database interactions)
- MySQL/PostgreSQL (configurable via application.properties)
- JWT (for authentication)
- Maven (build tool)

### Frontend
- React.js (UI library)
- Redux (state management)
- Vite (build tool and development server)
- Axios (for API requests)
- Cloudinary (for media uploads)
- CSS (styling)
- Node.js and npm/yarn (package management)

### Database
- Relational database (e.g., MySQL) for storing users, posts, comments, etc.

### Other Tools
- Git (version control)
- IntelliJ IDEA (for backend development)
- VS Code (for frontend development)

## Project Structure

### Backend (Spring Boot)
```
Instagram_clone/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── socialmedia/
│   │   │           └── socialmediaapp/
│   │   │               ├── ApiResponse.java
│   │   │               ├── LoginResponse.java
│   │   │               ├── config/
│   │   │               │   ├── AppConfig.java
│   │   │               │   ├── JwtConstant.java
│   │   │               │   ├── JwtProvider.java
│   │   │               │   └── JwtValidator.java
│   │   │               ├── Controller/
│   │   │               │   ├── AuthController.java
│   │   │               │   ├── ChatController.java
│   │   │               │   ├── CommentController.java
│   │   │               │   ├── MessageController.java
│   │   │               │   ├── PostController.java
│   │   │               │   ├── ReelsController.java
│   │   │               │   ├── StoryController.java
│   │   │               │   └── UserController.java
│   │   │               ├── ExceptionHandler/
│   │   │               │   ├── ErrorDetails.java
│   │   │               │   ├── GlobalException.java
│   │   │               │   └── ResourceNotFoundException.java
│   │   │               ├── Models/
│   │   │               │   ├── Chat.java
│   │   │               │   ├── Comment.java
│   │   │               │   ├── Message.java
│   │   │               │   ├── Post.java
│   │   │               │   ├── Reels.java
│   │   │               │   ├── ReelsComment.java
│   │   │               │   ├── Story.java
│   │   │               │   └── User.java
│   │   │               ├── Repository/
│   │   │               │   ├── ChatRepo.java
│   │   │               │   ├── CommentRepo.java
│   │   │               │   ├── MessageRepo.java
│   │   │               │   ├── PostRepo.java
│   │   │               │   ├── ReelsCommentRepo.java
│   │   │               │   ├── ReelsRepo.java
│   │   │               │   ├── StoryRepo.java
│   │   │               │   └── UserRepo.java
│   │   │               ├── Request/
│   │   │               │   └── ChatRequest.java
│   │   │               ├── Response/
│   │   │               │   └── AuthResponse.java
│   │   │               ├── Service/
│   │   │               │   ├── ChatService.java
│   │   │               │   ├── CommentService.java
│   │   │               │   ├── MessageService.java
│   │   │               │   ├── PostService.java
│   │   │               │   ├── ReelsService.java
│   │   │               │   ├── StoryService.java
│   │   │               │   └── UserService.java
│   │   │               ├── ServiceImpl/
│   │   │               │   ├── ChatServiceImpl.java
│   │   │               │   ├── CommentServiceImpl.java
│   │   │               │   ├── CustomUserDetailsService.java
│   │   │               │   ├── MessageServiceImpl.java
│   │   │               │   ├── PostServiceImpl.java
│   │   │               │   ├── ReelsServiceImpl.java
│   │   │               │   ├── StoryServiceImpl.java
│   │   │               │   └── UserServiceImpl.java
│   │   │               └── SocialMediaAppApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       ├── templates/
│   │       └── application.properties
│   └── test/
├── target/
├── .gitattributes
├── .gitignore
├── HELP.md
├── mvnw
├── mvnw.cmd
└── pom.xml
```

### Frontend (React)
```
SocialMediaReactPart/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── Login-amico.png
│   │   ├── Login-signup.gif
│   │   ├── Mojo.png
│   │   ├── MT2024123.jpeg
│   │   ├── react.svg
│   │   └── Sign-up.png
│   ├── components/
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   └── UserSuggestions/
│   │       └── UserSuggestions.jsx
│   ├── Config/
│   │   └── api.js
│   ├── Pages/
│   │   ├── Authentication/
│   │   ├── Chat/
│   │   ├── ChatReducer/
│   │   ├── Config/
│   │   ├── CreatePost/
│   │   ├── CreatePostPart/
│   │   ├── CreateReelsPart/
│   │   ├── HomePage/
│   │   ├── HomeRight/
│   │   ├── MessagePage.jsx
│   │   ├── Middle/
│   │   ├── Popularuser/
│   │   ├── Post/
│   │   ├── PostReducer/
│   │   ├── Profile/
│   │   ├── ProfileModel/
│   │   ├── Reels/
│   │   ├── ReelsPart/
│   │   ├── ReelsReducer/
│   │   ├── Search/
│   │   ├── SearchUser/
│   │   ├── SideBar/
│   │   └── storycircle/
│   ├── redux/
│   │   ├── Auth/
│   │   ├── Comment/
│   │   ├── User/
│   │   └── Store.js
│   ├── Utils/
│   │   ├── isLikedByReqUser.js
│   │   ├── Snackbar.js
│   │   └── UploadToCloudinary.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
└── README-REELS.md
```

## Installation

### Prerequisites
- Java 17+ (JDK)
- Node.js 18+
- Maven
- MySQL (or any supported database)
- Cloudinary account (for media uploads)

### Backend Setup
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/instagram-clone.git
   ```
2. Navigate to the backend directory:
   ```
   cd instagram-clone/backend
   ```
3. Update `application.properties` with your database credentials and Cloudinary API keys.
4. Build and run:
   ```
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will run on `http://localhost:8080`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd instagram-clone/frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Update API endpoints in `src/Config/api.js` to point to your backend (e.g., `http://localhost:8080`).
4. Run the development server:
   ```
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## Usage

1. Start the backend server.
2. Start the frontend development server.
3. Open `http://localhost:5173` in your browser.
4. Sign up for a new account or log in.
5. Explore features like posting content, viewing reels, chatting, etc.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.
