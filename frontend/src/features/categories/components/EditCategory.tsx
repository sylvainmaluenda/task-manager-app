import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getCategory,
  updateCategory,
} from '@/features/categories/services/categories.service';
import type { Category } from '@/features/categories/types/category.type';
import { CategoryFormValues } from '@/features/categories/shemas/category.shema';
import { CategoryForm } from './CategoryForm';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const taskCategory = await getCategory(Number(id));
        setCategory(taskCategory);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleUpdate = async (data: CategoryFormValues) => {
    if (!category) return;

    await updateCategory(category.id, data);

    navigate('/dashboard/categories');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!category) return <p>Category not found</p>;

  return (
    <div>
      <h1>Category : {category.name}</h1>

      <CategoryForm
        defaultValues={category}
        onSubmit={handleUpdate}
        submitLabel="Update"
      />
    </div>
  );
};

export default EditCategory;
