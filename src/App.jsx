import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Log from "./pages/Login";
import Signup from "./pages/Register";
import AuthProvider from "./context/AuthContext";

function App() {
    return (
        <div id="app" data-theme="dark">
            <div id="container">
                <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Notes />} path="/notes" />
                        <Route element={<Log />} path="/" />
                        <Route element={<Signup/>} path="/signup" />
                    </Routes>
                </BrowserRouter>
                </AuthProvider>
            </div>
        </div>
    );
}

export default App;