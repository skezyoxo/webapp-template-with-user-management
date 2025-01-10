import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">
          Home Page Placeholder - Replace this content with your application.
        </p>
      </Card>
    </div>
  );
}
