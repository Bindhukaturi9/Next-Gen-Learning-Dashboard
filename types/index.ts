export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  description?: string;
  color?: string;
  created_at: string;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

export interface StatCard {
  label: string;
  value: string | number;
  delta?: string;
  icon: string;
  color: string;
}
