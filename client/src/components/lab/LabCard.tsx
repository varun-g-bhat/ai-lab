import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Users } from "lucide-react";
import { Lab } from "@/types/lab";
import { useNavigate } from "react-router-dom";

interface LabCardProps {
  lab: Lab;
}

export function LabCard({ lab }: LabCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/labs/${lab._id}`);
  };

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {lab.title}
          </CardTitle>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {lab.labcode}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {lab.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{lab.subject}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Section {lab.sec}</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          Created: {new Date(lab.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
