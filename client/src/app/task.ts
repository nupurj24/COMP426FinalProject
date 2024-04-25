export interface Task {
    title: string;
    description: string;
    level: 'low' | 'medium' | 'high';
    _id?: string;
  }
