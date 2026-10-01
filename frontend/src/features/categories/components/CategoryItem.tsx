import { Category } from '@/features/categories/types/category.type';
import { capitalize } from '@/shared/lib/capitalize';
import { Button } from '../../../shared/components/shadcn/button';
import { Loader2 } from 'lucide-react';

interface Props {
  category: Category;
  onDelete: (category: Category) => void;
  onEdit: (id: number) => void;
  isDeleting: boolean;
}

export function CategoryItem({
  category,
  onDelete,
  onEdit,
  isDeleting,
}: Props) {
  return (
    <div className="rounded-md grid grid-cols-1 mb-4 p-4 shadow bg-white">
      <div className="flex justify-between">
        {/* NAME */}
        <div className="task-title flex justify-between items-center">
          <span className="font-bold">{capitalize(category.name)}</span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 items-center justify-center">
          <Button
            className="cursor-pointer"
            onClick={() => onEdit(category.id)}
            disabled={isDeleting}
            variant="secondary"
          >
            Edit
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => onDelete(category)}
            disabled={isDeleting}
            variant="destructive"
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
