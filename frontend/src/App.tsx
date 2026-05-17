import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import WorkflowDetailPage from './pages/WorkflowDetailPage';
import WorkflowHistoryPage from './pages/WorkflowHistoryPage';
import WorkflowRunPage from './pages/WorkflowRunPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/workflows/run" element={<WorkflowRunPage />} />
          <Route path="/workflows" element={<WorkflowHistoryPage />} />
          <Route path="/workflows/:workflowId" element={<WorkflowDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
