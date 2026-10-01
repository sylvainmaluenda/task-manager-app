import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskForm } from './TaskForm';
import { getTask, updateTask } from '@/features/tasks/services/tasks.service';
import { getCategories } from '@/features/categories/services/categories.service';
import type { Task } from '@/features/tasks/types/task.type';
import type { Category } from '@/features/categories/types/category.type';
import type { TaskFormValues } from '@/features/tasks/shemas/task.shema';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [taskData, categoriesData] = await Promise.all([
          getTask(Number(id)),
          getCategories(),
        ]);

        setTask(taskData);
        setCategories(categoriesData);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleUpdate = async (data: TaskFormValues) => {
    if (!task) return;

    await updateTask(task.id, data);

    navigate('/dashboard/tasks');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <div>
      <h1>Task : {task.title}</h1>

      <TaskForm
        categories={categories}
        defaultValues={task}
        onSubmit={handleUpdate}
        submitLabel="Update"
      />
    </div>
  );
};

export default EditTask;
