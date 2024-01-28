import { QRL } from "@builder.io/qwik";

// quick-actions.tsx
export interface QuickActionsProps {
  isOpen?: boolean;
  animationType?: string;
  actionGroups?: QuickActionsGroupProps[];
}

export interface QuickActionsGroupProps {
  title: string;
  actions: QuickActionsActionProps[];
}

interface QuickActionsActionProps {
  label: string;
  role: string;
  icon: any;
  onSelect$?: QRL<() => void>;
}

export interface ActionListGroupProps {
  title: string;
  items: ActionListGroupItemProps[];
}

interface ActionListGroupItemProps {
  label: string;
  role: string;
  icon: any;
  onSelect$: QRL<() => void>;
  focusedItemIndex: number;
}

export interface ActionListGroupItemForComponentProps {
  icon: any;
  label: string;
  shortcut?: string;
  href?: string;

  onSelect$: QRL<() => void>;
  role?: string;

  isFocused?: boolean;
}

// action-list-group-result.tsx
export interface ActionListGroupResultProps {
  title: string;
  items: ActionListGroupResultItemProps[];
}

interface ActionListGroupResultItemProps {
  label: string;
  role: string;
  icon: any;
  onSelect$: QRL<() => void>;
  focusedItemIndex: number;
}

// key-icon.tsx
export interface KeyIconProps {
  icon: any;
}
