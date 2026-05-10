import { Card } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color?: string;
}) {
  return (
    <Card className="p-5 bg-white">
      <h3 className="text-gray-500">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </Card>
  );
}