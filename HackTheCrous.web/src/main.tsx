import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import RestaurantPage from "./pages/RestaurantPage.tsx";
import RestaurantList from "./pages/RestaurantList.tsx";
import WorkInProgress from "./components/WorkInProgress.tsx";
import CroustyPage from "./pages/CroustyPage.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/crousty" element={<CroustyPage />} />
            <Route path="*" element={<WorkInProgress />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
