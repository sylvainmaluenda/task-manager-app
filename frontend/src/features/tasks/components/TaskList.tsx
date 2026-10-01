import { useEffect, useState } from 'react';
import type { Task, TaskWithCategory } from '../types/task.type';
import { getTasks, deleteTask, updateTask } from '../services/tasks.service';
import { Plus } from 'lucide-react';
import { Button } from '../../../shared/components/shadcn/button';
import { useNavigate } from 'react-router-dom';
import { ActionError } from '../../../shared/components/messages/ActionError';
import { Category } from '@/features/categories/types/category.type';
import { TaskItem } from './TaskItem';
import { ActionSuccess } from '../../../shared/components/messages/ActionSuccess';
import { SelectCategory } from './SelectCategory';

const extractCategories = (tasks: TaskWithCategory[]): Category[] => {
  const uniqueCategories = new Map(
    tasks
      .map((task) => task.category)
      .filter((category): category is Category => category !== null)
      .map((category) => [category.id, category]),
  );

  return [...uniqueCategories.values()];
};

export function TaskList() {
  const [tasks, setTasks] = useState<TaskWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [actionError, setActionError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [categoryIdFilter, setCategoryIdFilter] = useState<number | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const filteredTasks: TaskWithCategory[] = tasks.filter(
    (task) =>
      categoryIdFilter === null || task.category?.id === categoryIdFilter,
  );

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const navigate = useNavigate();

  const openEditForm = (id: number) => {
    navigate(`/dashboard/task/edit/${id}`);
  };

  const openAddForm = () => {
    navigate(`/dashboard/task/add`);
  };

  const handleDelete = async (task: Task) => {
    try {
      setDeletingTaskId(task.id);
      setActionError(null);
      setSuccess(null);

      await deleteTask(task.id);
      setSuccess(`Task "${task.title}" deleted successfully.`);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (e) {
      setActionError((e as Error).message);
    } finally {
      setDeletingTaskId(null);
    }
  };

  const toggleStatus = async (task: Task) => {
    const previousDone = task.done;

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, done: !previousDone } : t)),
    );

    try {
      setActionError(null);
      setSuccess(null);

      const { title, description, categoryId } = task;

      await updateTask(task.id, {
        title,
        description,
        categoryId: categoryId ?? null,
        done: !task.done,
      });

      setSuccess(
        task.done
          ? `Task "${task.title}" marked as to do.`
          : `Task "${task.title}" marked as done.`,
      );
    } catch (e) {
      setActionError((e as Error).message);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, done: previousDone } : t)),
      );
    }
  };

  const categories = extractCategories(tasks);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>Error : {error}</p>;

  return (
    <>
      <div className="flex justify-between">
        <h1>List of tasks</h1>
        <Button className="cursor-pointer" onClick={openAddForm}>
          <Plus />
          Add task
        </Button>
      </div>

      {categories.length >= 2 && (
        <div className="flex gap-2 items-center mb-4">
          <span className="font-bold">Category filter :</span>
          <SelectCategory
            defaultOption={{ label: 'All categories', value: 'all' }}
            categories={categories}
            categoryId={categoryIdFilter}
            onChange={setCategoryIdFilter}
          />
        </div>
      )}

      {tasks.length >= 1 ? (
        <>
          <ActionError error={actionError} />
          <ActionSuccess message={success} />

          <div>
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggleStatus={toggleStatus}
                onEdit={openEditForm}
                isDeleting={deletingTaskId === task.id}
              />
            ))}
          </div>
        </>
      ) : (
        <p>No task found.</p>
      )}
    </>
  );
}
