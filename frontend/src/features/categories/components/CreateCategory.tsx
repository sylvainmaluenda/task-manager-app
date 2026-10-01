import { useNavigate } from 'react-router-dom';

import { addCategory } from '@/features/categories/services/categories.service';
import { CategoryFormValues } from '@/features/categories/shemas/category.shema';
import { CategoryForm } from './CategoryForm';

export const CreateCategory = () => {
  const navigate = useNavigate();

  const handleCreate = async (data: CategoryFormValues) => {
    await addCategory(data);
    navigate('/dashboard/categories');
  };

  return (
    <div>
      <h1>Add a category</h1>

      <CategoryForm onSubmit={handleCreate} submitLabel="Save" />
    </div>
  );
};

export default CreateCategory;
