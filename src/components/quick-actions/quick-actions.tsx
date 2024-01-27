import {
  component$,
  useStyles$,
  $,
  useOnWindow,
  useSignal,
} from "@builder.io/qwik";
import styles from "./quick-actions.scss?inline";
import Fuse from "fuse.js";

import { InfoIcon } from "../icons/info-icon/info-icon";

import { TextInput } from "../text-input/text-input";
import { ActionList } from "../action-list/action-list";
import { ActionListGroupNoResult } from "../action-list-group-no-result/action-list-group-no-result";
import { ActionListGroupResult } from "../action-list-group-result/action-list-group-result";

import TransitionIf from "../../utils/transition-if";

const actionGroups = [
  {
    title: "Links",
    actions: [
      {
        label: "Sign in",
        role: "link",
        icon: <InfoIcon width={20} height={20} color="var(--icon-400)" />,
        onSelect$: $(() => {
          console.log("Search for action...");
        }),
      },
      {
        label: "Sign up",
        role: "link",
        icon: <InfoIcon width={20} height={20} color="var(--icon-400)" />,
      },
    ],
  },

  {
    title: "Commands",
    actions: [
      {
        label: "Console.log",
        as: "button",
        role: "command",
        icon: <InfoIcon width={20} height={20} color="var(--icon-400)" />,
        onSelect$: $(() => {
          console.log("Search for action...");
        }),
      },
    ],
  },
];

// 2. Set up the Fuse instance
const fuse = new Fuse(actionGroups, {
  keys: ["title", "actions.label"],
  includeMatches: true,
});

export const QuickActions = component$(() => {
  useStyles$(styles);

  const isOpen = useSignal<boolean>(true);
  const focusedIndex = useSignal<number>(0);
  const input = useSignal<string>("");
  const searchResults = useSignal<any[]>([]);
  const animationType = useSignal<string>("slide");

  // Keydown handler
  useOnWindow(
    "keydown",
    $((event) => {
      if (event.metaKey && event.code === "KeyK") {
        event.preventDefault();
        isOpen.value = !isOpen.value;
      }

      if (event.code === "Escape") {
        if (input.value.length > 0 && isOpen.value) {
          event.preventDefault();
          input.value = "";
        } else if (isOpen.value) {
          event.preventDefault();
          // Close the quick actions if open
          isOpen.value = false;
        }
      }

      if (event.code === "ArrowUp") {
        event.preventDefault();
        // Handle ArrowUp event if needed
        isOpen.value = false;
        console.log("ArrowUp");
      }

      if (event.code === "ArrowDown") {
        event.preventDefault();
        isOpen.value = true;
        // Handle ArrowDown event if needed
      }
    })
  );

  // Click handler
  useOnWindow(
    "click",
    $((event) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".quick-actions")) {
        if (isOpen.value) {
          isOpen.value = false;
        }
      }
    })
  );

  // onInput handler
  const onInput$ = $((event: any) => {
    input.value = event.target.value;
    const results = input.value ? fuse.search(input.value) : [];
    searchResults.value = results;
  });

  return (
    <TransitionIf
      if={isOpen.value}
      class="quick-actions"
      enter={
        "quick-actions-animations-enter" +
        (animationType.value ? "-" + animationType.value : "")
      }
      exit={
        "quick-actions-animations-exit" +
        (animationType.value ? "-" + animationType.value : "")
      }
    >
      <div class="quick-actions-head">
        <TextInput value={input.value} onInput$={onInput$} />
      </div>
      <div class="quick-actions-content">
        {/* No results, and no input */}
        {searchResults.value.length === 0 && input.value.length === 0 && (
          <ActionList actionGroups={actionGroups} />
        )}
        {/* No results, and input */}
        {searchResults.value.length === 0 && input.value.length > 0 && (
          <ActionListGroupNoResult />
        )}
        {/* Results */}
        {searchResults.value.length > 0 && (
          <div class="action-list">
            {searchResults.value.map((result, index) => {
              return (
                <ActionListGroupResult
                  key={result.item.title}
                  title={result.item.title}
                  items={result.item.actions.map((action: any) => ({
                    ...action,
                    focusedItemIndex: focusedIndex.value === index ? index : -1,
                  }))}
                />
              );
            })}
          </div>
        )}
      </div>
    </TransitionIf>
  );
});
