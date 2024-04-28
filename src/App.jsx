import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import AddJobPage from "./pages/AddJobPage";
import NotFoundPage from "./NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";

const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default App;
