import CreateTask from './features/tasks/components/CreateTask';
import { CategoryList } from './features/categories/components/CategoryList';
import DashboardLayout from './features/layout/components/DashboardLayout';
import AuthPage from '@/features/auth/pages/AuthPage';
import EditCategory from './features/categories/components/EditCategory';
import EditTask from './features/tasks/components/EditTask';
import NotFound from './shared/PageNotFound';
import { TaskList } from './features/tasks/components/TaskList';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import CreateCategory from './features/categories/components/CreateCategory';

import { useAuthStore } from '@/features/auth/store/auth.store';
import EditProfile from './features/users/components/EditProfile';
import Dashboard from './features/dashboard/components/Dashboard';

const RequireAuth = () => {
  const { token, mode } = useAuthStore();

  if (!token && mode !== 'guest') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="login" element={<AuthPage />} />
        <Route path="register" element={<AuthPage />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<TaskList />} />
            <Route path="task/edit/:id" element={<EditTask />} />
            <Route path="task/add" element={<CreateTask />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="category/edit/:id" element={<EditCategory />} />
            <Route path="category/add" element={<CreateCategory />} />
            <Route path="me" element={<EditProfile />}></Route>
          </Route>
        </Route>

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
