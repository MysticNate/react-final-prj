import React from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProviderWrapper } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { TransactionProvider } from "./contexts/TransactionContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import LoginChecker from "./comps/LoginChecker";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TransactionsPage from "./pages/TransactionsPage";
import Profile from "./pages/Profile";

export default function App() { 
  return (
    <ThemeProviderWrapper>
      <UserProvider>
          <TransactionProvider>
              <CategoryProvider>
                  <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                          path="/*"
                          element={
                              <LoginChecker>
                                  <Routes>
                                      <Route
                                          path="/"
                                          element={<HomePage />}
                                      />
                                      <Route
                                          path="/TransactionsPage"
                                          element={<TransactionsPage />}
                                      />
                                      <Route
                                          path="/Profile"
                                          element={<Profile />}
                                      />
                                  </Routes>
                              </LoginChecker>
                          }
                      />
                  </Routes>
              </CategoryProvider>
          </TransactionProvider>
      </UserProvider>
    </ThemeProviderWrapper>
  );
}
