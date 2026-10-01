import { ChartPieDonutText } from './ChartPieDonutText';
import { ChartPieLabel } from './ChartPieLabel';

export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ChartPieDonutText />
      <ChartPieLabel className="mt-6" />
    </>
  );
}
