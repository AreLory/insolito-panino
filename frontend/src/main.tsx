import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { AlertProvider } from "./context/AlertContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AlertProvider>
        <AuthProvider>
        <App />
        </AuthProvider>
      </AlertProvider>
    </Provider>
  </StrictMode>,
);
