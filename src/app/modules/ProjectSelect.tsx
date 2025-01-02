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
  selectedProject?: Project;
  onSelect: (project: Project) => void;
}

export const ProjectSelect = ({
  projectList,
  selectedProject,
  onSelect,
}: ProjectSelectProps) => {
  return (
    <Select
      value={selectedProject?.id}
      onValueChange={(projectId) => {
        const nextselectedProject = projectList.find(
          (project) => project.id === projectId,
        )!;
        onSelect(nextselectedProject);
      }}
    >
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
