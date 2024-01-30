/* eslint-disable qwik/valid-lexical-scope */
import {
  component$,
  useStyles$,
  $,
  useOnWindow,
  useSignal,
  useComputed$,
} from "@builder.io/qwik";
import Fuse from "fuse.js";

import globalStyles from "@/assets/styles/main.scss?inline";
import { Action } from "@/types/types";

import TransitionIf from "../../utils/transition-if";
import { ActionListGroup } from "../action-list-group/action-list-group";
import { ActionListGroupNoResult } from "../action-list-group-no-result/action-list-group-no-result";
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
          index: currentIndex++,
        })),
      };
    }),
    maxIndex: currentIndex,
  };
};

export const QuickActions = component$<Props>((props) => {
  useStyles$(globalStyles);
  useStyles$(styles);

  const focusedIndex = useSignal(0);

  const formattedGroups = useComputed$(() => formatActionGroups(props.items));

  const input = useSignal<string>("");
  const searchResults = useSignal<any[]>([]);

  const isOpen = useSignal<boolean>(props.isOpen || false);
  const animation = useSignal<string>(props.animation || "slide");

  useOnWindow(
    "keydown",
    $((event) => {
      if (event.metaKey && event.code === "KeyK") {
        event.preventDefault();
        isOpen.value = !isOpen.value;
      }

      if (!isOpen.value) return;

      if (event.code === "Escape") {
        event.preventDefault();

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
      }

      if (event.code === "ArrowUp") {
        focusedIndex.value = Math.max(focusedIndex.value - 1, 0);
      }

      if (["ArrowDown", "ArrowUp"].includes(event.code)) {
        setTimeout(() => {
          const item = document.querySelector(
            `[data-index="${focusedIndex.value}"]`
          );

          item?.scrollIntoView({
            block: "nearest",
            inline: "center",
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
    })
  );

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

    // const itemsExpanded = props.actionGroups.flatMap((item) => item.actions.map(action => ({
    //   ...action,
    //   parentLabel: item.title
    // })));

    const fuse = new Fuse(props.items, {
      keys: ["title", "actions.label"],
      threshold: 0.2,
    });

    const results = fuse.search(input.value);

    searchResults.value = results;
  });

  return (
    <div>
      <TransitionIf
        class={[
          "quick-actions",
          animation.value ? `quick-actions-animation-${animation.value}` : "",
        ]}
        enter="quick-actions-animation-enter"
        exit="quick-actions-animation-exit"
        if={isOpen.value}
      >
        <div class="quick-actions-head">
          <TextInput value={input.value} onInput$={onInput$} />
        </div>
        <div class="quick-actions-content">
          {/* No results, and no input */}
          {searchResults.value.length === 0 && input.value.length === 0 && (
            <>
              {formattedGroups.value.items.map((group, index) => (
                <ActionListGroup
                  {...group}
                  focusedIndex={focusedIndex.value}
                  key={group.title + index}
                />
              ))}
            </>
          )}

          {searchResults.value.length === 0 && input.value.length > 0 && (
            <ActionListGroupNoResult />
          )}

          {/*
              Deneme
            */}
          {/* {searchResults.value.map((result, index) => {
            return (
              <ActionListGroup
                items={result.item.actions.map((action: any) => ({
                  ...action,
                  focusedItemIndex:
                        focusedGroupIndex.value === index
                          ? focusedActionIndex.value
                          : undefined
                }))}
                key={result.item.title}
                title={result.item.title}
              />
            );
          })} */}
        </div>
      </TransitionIf>
    </div>
  );
});
