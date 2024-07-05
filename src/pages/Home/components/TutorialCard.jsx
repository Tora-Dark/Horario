export default function TutorialCard({ icon, title, description }) {
    return (
      <div className="bg-background rounded-lg shadow-lg p-6 flex flex-col gap-4">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    );
  }
  