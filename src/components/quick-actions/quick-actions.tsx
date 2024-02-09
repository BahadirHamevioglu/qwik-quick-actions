import {
  component$,
  useStyles$,
  $,
  useOnWindow,
  useSignal,
  useComputed$,
  useVisibleTask$
} from "@builder.io/qwik";
import Fuse from "fuse.js";

import globalStyles from "@/assets/styles/main.scss?inline";
import { Action } from "@/types/types";

import TransitionIf from "../../utils/transition-if";
import { ActionListGroup } from "../action-list-group/action-list-group";
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";
import { ActionListGroupNoResult } from "../action-list-group-no-result/action-list-group-no-result";
import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";
import { TextInput } from "../text-input/text-input";

import styles from "./quick-actions.scss?inline";

interface GroupFromProps {
  title: string;
  actions: Omit<Action, "index">[];
}

interface Props {
  isOpen?: boolean;
  animation?: "slide" | "none";
  items: GroupFromProps[];
}

const formatActionGroups = (actionGroups: Props["items"]) => {
  let currentIndex = 0;

  return {
    items: actionGroups.map((group) => {
      return {
        ...group,
        actions: group.actions.map((action) => ({
          ...action,
          index: currentIndex++
        }))
      };
    }),
    maxIndex: currentIndex
  };
};

const useQuickActions = (props: Props) => {
  const isOpen = useSignal<boolean>(props.isOpen || true);
  const focusedIndex = useSignal(0);
  const formattedGroups = useComputed$(() => formatActionGroups(props.items));
  const input = useSignal('');

  const onKeydown$ = $((event: KeyboardEvent) => {
    if (event.metaKey && event.code === "KeyK") {
      event.preventDefault();
      isOpen.value = !isOpen.value;
    }

    if (!isOpen.value) return;

    const SHORTCUT_KEYS = [
      'Escape',
      'ArrowDown',
      'ArrowUp',
      'Enter'
    ];

    if (SHORTCUT_KEYS.includes(event.code)) {
      event.preventDefault();
    }

    console.log({ code: event.code });

    if (event.code === "Escape") {
      if (input.value.length > 0) {
        input.value = "";
      } else {
        isOpen.value = false;
      }
    }

    if (event.code === "ArrowDown") {
      focusedIndex.value = Math.min(
        focusedIndex.value + 1,
        formattedGroups.value.maxIndex - 1
      );

      return;
    }

    if (event.code === "ArrowUp") {
      focusedIndex.value = Math.max(focusedIndex.value - 1, 0);

      return;
    }

    if ([
      "ArrowDown",
      "ArrowUp"
    ].includes(event.code)) {
      setTimeout(() => {
        const item = document.querySelector(
          `[data-index="${focusedIndex.value}"]`
        );

        item?.scrollIntoView({
          block: "nearest",
          inline: "center"
        });
      });
    }

    if (event.code === "Enter") {
      const item = document.querySelector(
        `[data-index="${focusedIndex.value}"]`
      );

      if (item) {
        item.dispatchEvent(new Event("click"));
      }
    }
  });

  /* [WARNING] Replace this part with useOnWindow in next Qwik versions.
  Currently, when you type something to search, and try to navigate with arrows afterwards, 'keydown' listener is triggered twice while using useOnWindow
  */
  useVisibleTask$(() => {
    window.addEventListener('keydown', onKeydown$);
  });

  return {
    isOpen,
    focusedIndex,
    input,
    formattedGroups
  };
};

export const QuickActions = component$<Props>((props) => {
  useStyles$(globalStyles);
  useStyles$(styles);

  const searchResults = useSignal<any[]>([]);

  const animation = useSignal<string>(props.animation || "slide");

  const {
    isOpen, focusedIndex, input, formattedGroups
  } = useQuickActions(props);

  useOnWindow(
    "click",
    $((event) => {
      const target = event.target as HTMLElement;

      if (!target.closest(".quick-actions") && isOpen.value) {
        isOpen.value = false;
      }
    })
  );

  const onInput$ = $((event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    input.value = target.value;

    if (input.value.length === 0) {
      searchResults.value = [];

      return;
    }

    if (input.value.length > 0) {
      focusedIndex.value = 0;
    }

    const expandedItems = formattedGroups.value.items.flatMap((group) =>
      group.actions.flatMap((action) => ({
        ...action,
        index: action.index,
        focusedIndex: action.index
      }))
    );
    const fuse = new Fuse(expandedItems, {
      keys: [
        "label",
        "title"
      ],
      threshold: 0.2
    });
    const results = fuse.search(input.value).flatMap((result, index) => ({
      ...result.item,
      index: index
    }));

    searchResults.value = results;
  });

  return (
    <div>
      <TransitionIf
        class={[
          "quick-actions",
          animation.value ? `quick-actions-animation-${animation.value}` : ""
        ]}
        enter="quick-actions-animation-enter"
        exit="quick-actions-animation-exit"
        if={isOpen.value}
      >
        <div class="quick-actions-head">
          <TextInput
            value={input.value}
            onInput$={onInput$}
          />
        </div>
        <div class="quick-actions-content">
          {searchResults.value.length === 0 && input.value.length === 0 && (
            <>
              <div class="action-groups">
                {formattedGroups.value.items.map((group, index) => {
                  return (
                    <ActionListGroup
                      {...group}
                      focusedIndex={focusedIndex.value}
                      key={group.title + index}
                    />
                  );
                })}
              </div>
            </>
          )}

          {searchResults.value.length === 0 && input.value.length > 0 && (
            <ActionListGroupNoResult />
          )}

          {searchResults.value.length > 0 && input.value.length > 0 && (
            <>
              <div class="action-results">
                <ActionListGroupTitle title={`Search Results for "${input.value}" (${searchResults.value.length})`} />
                {searchResults.value.map((group) => {
                  return (
                    <ActionListGroupItem
                      {...group}
                      isFocused={focusedIndex.value === group.index}
                      key={group.label + group.index}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </TransitionIf>
    </div>
  );
});
