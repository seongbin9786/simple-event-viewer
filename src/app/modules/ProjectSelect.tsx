import { Project } from "@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectSelectProps {
  projectList: Project[];
  selectedProjectId: string | undefined;
  onSelect: (projectId: string) => void;
}

export const ProjectSelect = ({
  projectList,
  selectedProjectId,
  onSelect,
}: ProjectSelectProps) => {
  return (
    <Select value={selectedProjectId} onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="프로젝트를 선택해주세요..." />
      </SelectTrigger>
      <SelectContent>
        {projectList.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            {project.displayName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
