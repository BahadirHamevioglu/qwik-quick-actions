import {
  Component, QRL
} from "@builder.io/qwik";

export interface Group {
  title: string;
  actions: Action[];
}

export interface Action {
  label: string;
  role: string;
  icon: Component<object> | any;
  onSelect$?: QRL<() => void>;
  index: number;
  subItems?: Action[];
}

// key-icon.tsx
export interface KeyIconProps {
  icon: any;
}
