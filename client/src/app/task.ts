export interface Task {
    name: string;
    priority: string;
    level: 'low' | 'medium' | 'high';
    _id?: string;
  }
