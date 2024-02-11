import {
  component$, useStylesScoped$, $, QRL
} from "@builder.io/qwik";

import styles from "./breadcrumb.scss?inline";

interface Props {
  items: string[];
  onClick$?: QRL<() => void>;
}

export const Breadcrumb = component$((props: Props) => {
  const {
    items, onClick$
  } = props;
  useStylesScoped$(styles);

  const handleItemClick$ = $(() => {
    const lastItem = items[items.length - 1];

    if (lastItem) {
      onClick$?.();
    }
  });

  return (
    <div class="breadcrumb">
      {
        items.map((item, index) => {
          return (
            <div
              class="breadcrumb-item"
              key={index}
              onClick$={handleItemClick$}
            >
              {item}
            </div>
          );
        })
      }
    </div>
  );
});