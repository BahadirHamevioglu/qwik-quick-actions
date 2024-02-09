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
import { ActionListGroupItem } from "../action-list-group-item/action-list-group-item";
import { ActionListGroup } from "../action-list-group/action-list-group";
import { ActionListGroupNoResult } from "../action-list-group-no-result/action-list-group-no-result";
import { TextInput } from "../text-input/text-input";

import styles from "./quick-actions.scss?inline";
import { ActionListGroupTitle } from "../action-list-group-title/action-list-group-title";

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

  const isOpen = useSignal<boolean>(props.isOpen || true);
  const animation = useSignal<string>(props.animation || "slide");

  useOnWindow(
    "keydown",
    $((event) => {
      console.log("TETİKLENDİM 1");
      if (event.metaKey && event.code === "KeyK") {
        event.preventDefault();
        isOpen.value = !isOpen.value;

        console.log("TETİKLENDİM 2");
      }

      if (!isOpen.value) return;

      if (event.code === "Escape") {
        console.log("TETİKLENDİM 3");

        event.preventDefault();

        if (input.value.length > 0) {
          console.log("TETİKLENDİM 4");
          input.value = "";
        } else {
          console.log("TETİKLENDİM 5");
          isOpen.value = false;
        }
      }

      if (event.code === "ArrowDown") {
        console.log("TETİKLENDİM 6");
        focusedIndex.value = Math.min(
          focusedIndex.value + 1,
          formattedGroups.value.maxIndex - 1
        );
        console.log("TETİKLENDİM 7");
        return;
      }

      if (event.code === "ArrowUp") {
        console.log("TETİKLENDİM 8");
        focusedIndex.value = Math.max(focusedIndex.value - 1, 0);
        console.log("TETİKLENDİM 9");
        return;
      }

      if (["ArrowDown", "ArrowUp"].includes(event.code)) {
        setTimeout(() => {
          console.log("TETİKLENDİM 10");
          const item = document.querySelector(
            `[data-index="${focusedIndex.value}"]`
          );
          console.log("TETİKLENDİM 11");

          item?.scrollIntoView({
            block: "nearest",
            inline: "center",
          });
          console.log("TETİKLENDİM 12");
        });
      }

      if (event.code === "Enter") {
        console.log("TETİKLENDİM 13");
        const item = document.querySelector(
          `[data-index="${focusedIndex.value}"]`
        );

        if (item) {
          item.dispatchEvent(new Event("click"));
          console.log("TETİKLENDİM 14");
        }
        console.log("TETİKLENDİM 15");
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

    if (input.value.length > 0) {
      focusedIndex.value = 0;
    }

    const expandedItems = formattedGroups.value.items.flatMap((group) =>
      group.actions.flatMap((action) => ({
        ...action,
        index: action.index,
        focusedIndex: action.index,
      }))
    );
    const fuse = new Fuse(expandedItems, {
      keys: ["label", "title"],
      threshold: 0.2,
    });
    const results = fuse.search(input.value).flatMap((result, index) => ({
      ...result.item,
      index: index,
    }));

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
                <ActionListGroupTitle
                  title={`Search Results for "${input.value}" (${searchResults.value.length})`}
                />
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
