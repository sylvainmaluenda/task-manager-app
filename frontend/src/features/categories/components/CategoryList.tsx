import { useEffect, useState } from 'react';
import { CategoryItem } from './CategoryItem';
import { Category } from '@/features/categories/types/category.type';
import {
  deleteCategory,
  getCategories,
} from '@/features/categories/services/categories.service';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/shadcn/button';
import { Plus } from 'lucide-react';
import { ActionSuccess } from '../../../shared/components/messages/ActionSuccess';
import { ActionError } from '../../../shared/components/messages/ActionError';

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [actionError, setActionError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => setError((e as Error).message))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (category: Category) => {
    try {
      setDeletingCategoryId(category.id);
      setActionError(null);
      setSuccess(null);

      await deleteCategory(category.id);
      setSuccess(`Category ${category.name} deleted successfully.`);
      setCategories((prev) => prev.filter((t) => t.id !== category.id));
    } catch (e) {
      setActionError((e as Error).message);
    } finally {
      setDeletingCategoryId(null);
    }
  };

  const navigate = useNavigate();

  const editCategory = (id: number) => {
    navigate(`/dashboard/category/edit/${id}`);
  };

  const addCategory = () => {
    navigate(`/dashboard/category/add`);
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>Error : {error}</p>;

  return (
    <>
      <div className="flex justify-between">
        <h1>List of categories</h1>
        <Button className="cursor-pointer" onClick={addCategory}>
          <Plus />
          Add category
        </Button>
      </div>
      {categories.length >= 1 ? (
        <>
          <ActionError error={actionError} />
          <ActionSuccess message={success} />

          <div>
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                onDelete={handleDelete}
                onEdit={editCategory}
                isDeleting={deletingCategoryId === category.id}
              />
            ))}
          </div>
        </>
      ) : (
        <p>No category found.</p>
      )}
    </>
  );
}
