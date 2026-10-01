import { Plus } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

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
import { useEffect, useState } from 'react';
import { TaskWithCategory } from '@/features/tasks/types/task.type';
import { getTasks } from '@/features/tasks/services/tasks.service';
import { cn } from 'cn';
import { useUserStore } from '@/features/users/store/user.store';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { capitalize } from '@/shared/lib/capitalize';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/shadcn/button';

export const description = 'A donut chart with text';

type Props = {
  className?: string;
};

const chartConfig = {
  visitors: {
    label: 'Tasks',
  },
  done: {
    label: 'Done',
    color: 'var(--chart-1)',
  },
  todo: {
    label: 'To-do',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function ChartPieDonutText({ className }: Props) {
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

  const tasksDone = tasks.filter((task) => task.done);
  const tasksTodo = tasks.filter((task) => !task.done);

  const chartData = [
    { status: 'done', tasks: tasksDone.length, fill: 'var(--color-done)' },
    { status: 'todo', tasks: tasksTodo.length, fill: 'var(--color-todo)' },
  ];

  const totalTasks = tasks.length;

  const navigate = useNavigate();

  const openAddForm = () => {
    navigate(`/dashboard/task/add`);
  };

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Task completion</CardTitle>
        <CardDescription>
          {mode === 'guest' ? 'Guest' : capitalize(user.name)}'s tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="relative mx-auto aspect-square max-h-[250px]"
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              Loading...
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p style={{ color: 'red' }}>Erreur : {error}</p>
            </div>
          ) : !totalTasks ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="w-full text-center mb-2">No task found.</p>
              <Button className="cursor-pointer" onClick={openAddForm}>
                <Plus />
                Add task
              </Button>
            </div>
          ) : (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="tasks"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
                animationBegin={0}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {tasksDone.length.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total: {totalTasks.toLocaleString()}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing the distribution of total tasks between done and to-do tasks
        </div>
      </CardFooter>
    </Card>
  );
}
