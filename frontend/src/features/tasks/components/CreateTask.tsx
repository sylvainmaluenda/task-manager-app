import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskForm } from './TaskForm';
import { addTask } from '@/features/tasks/services/tasks.service';
import { getCategories } from '@/features/categories/services/categories.service';
import type { Category } from '@/features/categories/types/category.type';
import type { TaskFormValues } from '@/features/tasks/shemas/task.shema';

export const CreateTask = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data: TaskFormValues) => {
    await addTask(data);
    navigate('/dashboard/tasks');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Add a task</h1>

      <TaskForm
        categories={categories}
        onSubmit={handleCreate}
        submitLabel="Save"
      />
    </div>
  );
};

export default CreateTask;
