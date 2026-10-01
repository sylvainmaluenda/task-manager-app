import { Plus } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/shadcn/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/shared/components/shadcn/chart';
import { cn } from 'cn';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useUserStore } from '@/features/users/store/user.store';
import { useEffect, useState } from 'react';
import { TaskWithCategory } from '@/features/tasks/types/task.type';
import { capitalize } from '@/shared/lib/capitalize';
import { getTasks } from '@/features/tasks/services/tasks.service';
import { Category } from '@/features/categories/types/category.type';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/shadcn/button';

export const description = 'A pie chart with a label';

type Props = {
  className?: string;
};

const extractTodoCategories = (tasks: TaskWithCategory[]): Category[] => {
  const uniqueCategories = new Map(
    tasks
      .filter((task) => !task.done)
      .map((task) => task.category)
      .filter((category): category is Category => category !== null)
      .map((category) => [category.id, category]),
  );

  return [...uniqueCategories.values()];
};

export function ChartPieLabel({ className }: Props) {
  const [tasks, setTasks] = useState<TaskWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mode = useAuthStore((s) => s.mode);
  const user = useUserStore((s) => s.user)!;

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const categories = extractTodoCategories(tasks);

  const chartData = categories.map((category) => ({
    category: category.name,
    tasks: tasks.filter(
      (task) => !task.done && task.category?.id === category.id,
    ).length,
    fill: `var(--color-${category.name})`,
  }));

  let chartConfig = chartData.reduce<ChartConfig>(
    (acc, data, index) => {
      const chartId = (index % 4) + 1;

      acc[data.category] = {
        label: capitalize(data.category),
        color: `var(--chart-${chartId})`,
      };

      return acc;
    },
    {
      tasks: {
        label: 'Tasks',
      },
    },
  );

  const tasksWithoutCategory = tasks.filter(
    (task) => !task.done && task.category === null,
  );

  if (tasksWithoutCategory.length) {
    chartData.push({
      category: 'na',
      tasks: tasksWithoutCategory.length,
      fill: 'var(--color-na)',
    });

    chartConfig = {
      ...chartConfig,
      na: { label: 'N/A', color: 'var(--chart-5)' },
    };
  }

  const navigate = useNavigate();

  const addCategory = () => {
    navigate(`/dashboard/category/add`);
  };

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>To-do list by category</CardTitle>
        <CardDescription>
          {mode === 'guest' ? 'Guest' : capitalize(user.name)}'s categories
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="relative mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              Chargement...
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p style={{ color: 'red' }}>Erreur : {error}</p>
            </div>
          ) : !chartData.length ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="w-full text-center mb-2">No category found.</p>
              <Button className="cursor-pointer" onClick={addCategory}>
                <Plus />
                Add category
              </Button>
            </div>
          ) : (
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="tasks"
                label
                nameKey="category"
                animationBegin={0}
              />
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing the distribution of to-do tasks by category
        </div>
      </CardFooter>
    </Card>
  );
}
