import socketIO from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componenets/Home";
import ChatPage from "./componenets/ChatPage";
import "./App.css";

//Connect to socket
const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/chat" element={<ChatPage socket={socket} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
