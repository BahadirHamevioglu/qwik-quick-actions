import {
  component$, useStylesScoped$
} from "@builder.io/qwik";

import styles from "./action-list-group-title.scss?inline";

interface ActionListGroupTitleProps {
  title?: string;
}

export const ActionListGroupTitle = component$(
  (props: ActionListGroupTitleProps) => {
    const { title = "No Title Provided!" } = props;

    useStylesScoped$(styles);

    return <div class="action-list-group-title">{title}</div>;
  }
);
