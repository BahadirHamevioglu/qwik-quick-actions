import { Component, QRL } from "@builder.io/qwik";

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
  subItems?: Action[];
  breadCrumbs?: string[];
}

// key-icon.tsx
export interface KeyIconProps {
  icon: any;
}
