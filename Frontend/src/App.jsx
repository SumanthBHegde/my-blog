import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

//pages
import HomePage from "./pages/home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <div className="App font-OpenSans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
