import { Card } from "flowbite-react";

export default function FeatureCard({ icon, title, description }) {
    return (
        <Card>

      <div className="bg-background  rounded-lg shadow-lg p-6 flex flex-col gap-4">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
        </Card>
    );
  }
  