import { mockCategories } from '@/features/categories/repositories/categories.mock';
import { Category } from '../types/category.type';
import { CategoryFormValues } from '../shemas/category.shema';
import { delay } from '@/shared/lib/delay';

const memoryCategoriesRepository = {
  async getCategory(id: number): Promise<Category> {
    await delay(800);

    const category = mockCategories.get(id);

    if (!category) {
      throw new Error(`categoryId #${id} not found`);
    }

    return category;
  },

  async getCategories(): Promise<Category[]> {
    await delay(800);

    const sortedCategories = new Map(
      [...mockCategories].sort(
        ([, a], [, b]) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );

    return [...sortedCategories.values()];
  },

  async addCategory(data: CategoryFormValues) {
    await delay(800);

    const { name } = data;

    const lastId = [...mockCategories.keys()].reduce(
      (max, key) => (key > max ? key : max),
      0,
    );

    const category = {
      id: lastId + 1,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockCategories.set(lastId + 1, category);

    return category;
  },

  async deleteCategory(id: number): Promise<void> {
    await delay(800);

    mockCategories.delete(id);
  },

  async updateCategory(
    id: number,
    data: CategoryFormValues,
  ): Promise<Category> {
    await delay(800);

    const { name } = data;

    const category = mockCategories.get(id);

    if (!category) {
      throw new Error('Category id not found');
    }

    const newCategory = {
      ...category,
      name,
      updatedAt: new Date().toISOString(),
    };

    mockCategories.set(id, newCategory);

    return newCategory;
  },
};

export default memoryCategoriesRepository;
