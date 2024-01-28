/* eslint-disable qwik/valid-lexical-scope */
import {
  component$,
  useStyles$,
  $,
  useOnWindow,
  useSignal
} from "@builder.io/qwik";
import Fuse from "fuse.js";

import globalStyles from '@/assets/styles/main.scss?inline';

import { QuickActionsProps } from "../../types/types";
import TransitionIf from "../../utils/transition-if";
import { ActionListGroup } from "../action-list-group/action-list-group";
import { ActionListGroupNoResult } from "../action-list-group-no-result/action-list-group-no-result";
import { TextInput } from "../text-input/text-input";

import styles from "./quick-actions.scss?inline";

export const QuickActions = component$<QuickActionsProps>(
  (props) => {
    useStyles$(globalStyles);
    useStyles$(styles);

    const focusedGroupIndex = useSignal<number>(0);
    const focusedActionIndex = useSignal<number>(0);
    const input = useSignal<string>("");
    const searchResults = useSignal<any[]>([]);

    const isOpen = useSignal<boolean>(props.isOpen || true);
    const animationType = useSignal<string>(props.animationType || "slide");

    // Keydown handler
    useOnWindow(
      "keydown",
      $((event) => {
        if (event.metaKey && event.code === "KeyK") {
          event.preventDefault();
          isOpen.value = !isOpen.value;
        }

        const handleArrowUp = $(() => {
          if (!isOpen.value) return;
          if (searchResults.value.length === 0 && input.value.length > 0)
            return;

          if (searchResults.value.length > 0) {
            if (focusedActionIndex.value > 0) {
              focusedActionIndex.value -= 1;
            } else {
              if (focusedGroupIndex.value > 0) {
                focusedGroupIndex.value -= 1;
              } else {
                focusedGroupIndex.value = searchResults.value.length - 1;
              }
              focusedActionIndex.value =
                searchResults.value[focusedGroupIndex.value].item.actions
                  .length - 1;
            }
          } else {
            // Handle navigation within the full list if no search results
            if (focusedActionIndex.value > 0) {
              focusedActionIndex.value -= 1;
            } else {
              if (focusedGroupIndex.value > 0) {
                focusedGroupIndex.value -= 1;
              } else {
                focusedGroupIndex.value = props.actionGroups.length - 1;
              }
              focusedActionIndex.value =
                props.actionGroups[focusedGroupIndex.value].actions.length - 1;
            }
          }
        });

        const handleArrowDown = $(() => {
          if (!isOpen.value) return;
          if (searchResults.value.length === 0 && input.value.length > 0)
            return;

          if (searchResults.value.length > 0 && input.value.length > 0) {
            const currentActions =
              searchResults.value[focusedGroupIndex.value].item.actions;

            if (focusedActionIndex.value < currentActions.length - 1) {
              focusedActionIndex.value += 1;
            } else {
              focusedActionIndex.value = 0;

              if (focusedGroupIndex.value < searchResults.value.length - 1) {
                focusedGroupIndex.value += 1;
              } else {
                focusedGroupIndex.value = 0;
              }
            }
          } else {
            // Handle navigation within the full list if no search results
            const currentActions =
              props.actionGroups[focusedGroupIndex.value].actions;

            if (focusedActionIndex.value < currentActions.length - 1) {
              focusedActionIndex.value += 1;
            } else {
              focusedActionIndex.value = 0;

              if (focusedGroupIndex.value < props.actionGroups.length - 1) {
                focusedGroupIndex.value += 1;
              } else {
                focusedGroupIndex.value = 0;
              }
            }
          }
        });

        const handleEnter = $((event?: any) => {
          if (!isOpen.value) return;
          if (searchResults.value.length === 0 && input.value.length > 0)
            return;

          let action;

          if (searchResults.value.length > 0) {
            // If we have search results, trigger the action from the search results
            const group = searchResults.value[focusedGroupIndex.value];

            if (group && group.item.actions.length > focusedActionIndex.value) {
              action = group.item.actions[focusedActionIndex.value];
            }
          } else {
            // If there are no search results, trigger the action from the full list
            const group = props.actionGroups[focusedGroupIndex.value];

            if (group && group.actions.length > focusedActionIndex.value) {
              action = group.actions[focusedActionIndex.value];
            }
          }

          // Trigger the onSelect$ event if it exists
          action?.onSelect$?.();

          if (event) {
            event!.preventDefault(); // Prevent default to avoid triggering the action twice
          }
        });

        if (event.code === "Escape") {
          if (input.value.length > 0 && isOpen.value) {
            event.preventDefault();
            input.value = "";
          } else if (isOpen.value && input.value.length === 0) {
            event.preventDefault();
            // Close the quick actions if open
            isOpen.value = false;
          }
        }

        switch (event.code) {
          case "ArrowUp":
            event.preventDefault();
            handleArrowUp();
            break;
          case "ArrowDown":
            event.preventDefault();
            handleArrowDown();
            break;
          case "Enter":
            handleEnter();
            break;
          default:
            break;
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

      const fuse = new Fuse(props.actionGroups, {
        keys: [
          "title",
          "actions.label"
        ],
        threshold: 0.2
      });

      const results = fuse.search(input.value);

      searchResults.value = results;
      focusedGroupIndex.value = 0;
      focusedActionIndex.value = 0;
    });

    return (
      <TransitionIf
        class={[
          "quick-actions",
          animationType.value ? `quick-actions-animation-${animationType.value}` : ''
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
          {/* No results, and no input */}
          {searchResults.value.length === 0 && input.value.length === 0 && (
            <>
              {props.actionGroups.map((group: any, index: any) => (
                <ActionListGroup
                  items={group.actions.map((action: any) => ({
                    ...action,
                    focusedItemIndex:
                      focusedGroupIndex.value === index
                        ? focusedActionIndex.value
                        : undefined
                  }))}
                  key={group.title + index}
                  title={group.title}
                />
              ))}
            </>
          )}

          {searchResults.value.length === 0 && input.value.length > 0 && (
            <ActionListGroupNoResult />
          )}

          {searchResults.value.map((result, index) => {
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
          })}
        </div>
      </TransitionIf>
    );
  }
);
