import {
  Component, QRL
} from "@builder.io/qwik";

// quick-actions.tsx
export interface QuickActionsProps {
  isOpen?: boolean;
  animationType?: string;
  actionGroups: GroupFromProps[];
}

export interface GroupFromProps {
  title: string;
  actions: Omit<Action, 'index'>[];
}

export interface Group {
  title: string;
  actions: Action[];
}

export interface Action {
  label: string;
  role: string;
  icon: Component<object>;
  onSelect$?: QRL<() => void>;
  index: number;
}

// key-icon.tsx
export interface KeyIconProps {
  icon: any;
}
