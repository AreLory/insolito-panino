# 🍔 L'Insolito Panino – Street Food Ordering App

Web application for managing products and orders in a street food environment.

This project was inspired by my direct experience working for several years at **L'Insolito Panino**, a street food business that allowed me to continue my studies. Working on the front line, I observed several recurring issues, especially during peak hours:

- long waiting times
- difficulty consulting the menu
- many customer questions about product ingredients

For this reason, I decided to develop a web application designed for similar businesses, with the goal of **optimizing the ordering process**, reducing the workload for staff interacting directly with customers, and making the purchasing experience faster and easier.

The app is primarily designed to **improve the customer experience**, focusing on a simple and intuitive interface. The goal is to reduce confusion while browsing the menu by clearly displaying ingredients, product variants, and customization options.

Since this is my first **full stack project**, I also focused heavily on code organization and project structure, trying to simulate a real team development environment and keeping the code as **modular and scalable** as possible.

---

# 🚀 Technologies Used

## Frontend

- React
- TypeScript
- Redux Toolkit
- React Context API
- Axios
- React Router

## Backend

- Node.js
- Express
- MongoDB

---

# 📁 Project Structure (Frontend)


```
src
┣ assets
┃ ┗ img
┣ components
┃ ┣ cart
┃ ┣ checkout
┃ ┣ home
┃ ┣ menu
┃ ┣ order
┃ ┗ shared
┣ config
┣ context
┣ features
┃ ┣ activeOrder
┃ ┣ cart
┃ ┣ categories
┃ ┣ checkout
┃ ┗ products
┣ hooks
┣ pages
┣ store
┣ types
┣ utils
┣ App.tsx
┣ index.css
┗ main.tsx
```

# 📁 Project Structure (Backend)


```
src
 ┣ controllers
 ┣ middlewares
 ┣ models
 ┣ routes
 ┣ types
 ┗ app.ts
```

The project structure separates:

- **reusable components**
- **pages**
- **state management**
- **application logic**

This helps keep the code modular, scalable, and easy to maintain.

---

# Features

- menu browsing
- product customization
- cart management
- order creation
- user authentication
- global state management with Redux

---

# ⚛️ React Concepts Used

One of the main goals of this project was not only to build a working application, but also to deepen my understanding of several React concepts that I had not fully mastered before.

## State Management

I used:

- **useState** and **useEffect** for local state management and side effects such as API calls
- **Redux Toolkit** and **React Context** for global state management

### React Context

Used for global functionalities such as:

- authentication via **JWT tokens**
- application **alert management**

### Redux Toolkit

Redux manages more structured application data through dedicated slices:

- products
- categories
- cart
- active order
- checkout

To improve performance, I used **createSelector** to create memoized selectors and optimize the recalculation of derived data, avoiding unnecessary component re-renders.

---

# 🪝 Custom Hooks

I used many React hooks and library hooks, but I also created some **custom hooks** to isolate the logic of specific functionalities.

In particular, I created hooks dedicated to handling API calls, separating the fetching logic from components and making the code more reusable and easier to read.

---

# 🔁 Conditional Rendering and Error Handling

One area I focused on improving was **conditional rendering** and **error handling**, which were previously some of my weaker points.

In addition to a standard **Loader** component for data fetching, I implemented a system of **custom alerts** that communicate the status of operations to the user:

- success
- error
- warning
- informational messages

---

# 🌐 API Calls

The project requires multiple interactions with the backend, so I worked extensively with **asynchronous functions**, using:

- `async / await`
- `try / catch` blocks

to properly handle errors and keep the UI in a consistent state.

---

# 🐞 Debugging and Development

During development I frequently used debugging tools such as:

- **Redux DevTools**
- **console.log**

to analyze the application state and identify possible data synchronization issues.

This process helped me better understand the **data flow** within the application and how global state management works.

---

# 🎯 Project Goals

This project allowed me to deepen my knowledge in several aspects of frontend and full stack development:

- complex state management
- scalable React project architecture
- custom hook creation
- asynchronous API handling
- improved error handling
- debugging and global state analysis
