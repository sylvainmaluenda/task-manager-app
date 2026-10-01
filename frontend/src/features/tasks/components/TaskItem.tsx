import { Loader2 } from 'lucide-react';
import type { Task, TaskWithCategory } from '../types/task.type';
import { Switch } from '../../../shared/components/shadcn/switch';
import { Button } from '../../../shared/components/shadcn/button';
import { capitalize } from '@/shared/lib/capitalize';

interface Props {
  task: TaskWithCategory;
  onDelete: (task: Task) => void;
  onEdit: (id: number) => void;
  onToggleStatus: (task: Task) => void;
  isDeleting: boolean;
}

export function TaskItem({
  task,
  onDelete,
  onEdit,
  onToggleStatus,
  isDeleting,
}: Props) {
  return (
    <div
      className={`rounded-md grid grid-cols-1 mb-4 p-4 shadow ${
        task.done ? 'bg-emerald-500/10' : 'bg-white'
      }`}
    >
      <div className="flex justify-between">
        {/* TITLE */}
        <div className="task-title flex justify-between items-center">
          <div className={task.done ? 'line-through' : ''}>
            <span className="font-bold">{capitalize(task.title)}</span>
            {task.category?.name && ` (${capitalize(task.category.name)})`}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 items-center justify-center">
          <Switch
            checked={task.done}
            disabled={isDeleting}
            onCheckedChange={() => onToggleStatus(task)}
            title={task.done ? 'Task done' : 'Task to do'}
            className="data-[state=checked]:bg-emerald-600"
          />
          {task.done ? (
            <Button
              className="cursor-pointer"
              onClick={() => onDelete(task)}
              disabled={isDeleting}
              variant="destructive"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete
            </Button>
          ) : (
            <Button
              className="cursor-pointer"
              onClick={() => onEdit(task.id)}
              variant="secondary"
            >
              Edit
            </Button>
          )}
        </div>
      </div>
      <div>
        {/* DESCRIPTION */}
        {task.description && (
          <div className="text-sm text-gray-500 mt-4">{task.description}</div>
        )}
      </div>
    </div>
  );
}
