interface TimeBlock {
  startTime: string;
  endTime: string;
  description?: string;
}

interface Task {
  id: string;
  title: string;
  timeline: TimeBlock[];
  todoDescription: string;
  doneDescription: string;
  createdAt: Date;
  updatedAt: Date;
}
