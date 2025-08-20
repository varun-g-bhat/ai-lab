import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { verify } from "./http/authApi";
import { verifyUser } from "./store/userAuth";
import { useEffect } from "react";
import PdfChatting from "./pages/PdfChatting/PdfChatting";
import AITutor from "./pages/AI_Tutor/AITutor";
import AITutorLayout from "./Layout/AITutor/AITutorLayout";
import RoadMap from "./pages/AI_Tutor/RoadMap";
import Learning from "./pages/AI_Tutor/Learning";
import Lesson from "./pages/AI_Tutor/Lesson";
import Resources from "./pages/Resources/Resources";
import Quiz from "./pages/AI_Tutor/Quiz";
import CodeEditor from "./pages/CodeEditor/CodeEditor";
import { LabDetailPage } from "./pages/LabDetailsPage/LabDetailsPage";
import { LabListPage } from "./pages/LabListPage/LabListPage";
import TeacherDashboard from "./pages/StudentPerformance/StudentPerformance";
import ManageUsers from "./pages/AdminPage/AdminPage";
import Profile from "./pages/Profile/Profile";
import LabApproval from "./pages/AdminPage/LabApproval";

function App() {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: verify,
    onSuccess: (res) => {
      console.log(res.data);
      dispatch(verifyUser(res.data));
    },
  });

  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Routes>
        <Route path="editor/:id" element={<CodeEditor />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="labs" element={<LabListPage />} />
          <Route path="labs/:id" element={<LabDetailPage />} />
          <Route path="performance/:id" element={<TeacherDashboard />} />
          <Route path="admin" element={<ManageUsers />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="chat-pdf" element={<PdfChatting />} />
          <Route path="resources" element={<Resources />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="profile" element={<Profile />} />
          <Route path="lab-requests" element={<LabApproval />} />

          <Route path="/ai-tutor" element={<AITutorLayout />}>
            <Route index element={<AITutor />} />
            <Route path="learning" element={<Learning />} />
            <Route path="learning/:topicId" element={<RoadMap />} />
            <Route path="lesson/:lessonId" element={<Lesson />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
