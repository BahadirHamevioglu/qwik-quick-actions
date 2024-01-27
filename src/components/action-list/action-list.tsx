import { component$, useStyles$, ComponentBaseProps } from "@builder.io/qwik";
import { ActionListGroup } from "../action-list-group/action-list-group";

import styles from "./action-list.scss?inline";

interface ActionListProps extends ComponentBaseProps {
  actionGroups: Array<{
    id?: string | number;
    title: string;
    actions: Array<{
      label: string;
      role?: string;
      icon?: any;
      onSelect$?: () => void;
      focusedItemIndex?: number;
    }>;
  }>;
}

export const ActionList = component$((props: ActionListProps) => {
  useStyles$(styles);
  const { actionGroups } = props;
  return (
    <div class="action-list">
      {actionGroups.map((group, index) => (
        <ActionListGroup
          key={group.id ?? index}
          title={group.title}
          actions={group.actions}
        />
      ))}
    </div>
  );
});
