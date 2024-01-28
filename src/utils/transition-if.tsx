import {
  Signal,
  Slot,
  component$,
  useComputed$,
  useSignal,
  useTask$
} from "@builder.io/qwik";

interface Props {
  enter: string;
  exit: string;
  class?: any;
  if: boolean;
}

type AnimationState =
  | "enter"
  | "entering"
  | "enter-done"
  | "exit"
  | "exit-done";

export default component$<Props>((props) => {
  const wrapperRef = useSignal() as Signal<HTMLDivElement>;

  const animationState = useSignal<AnimationState>(
    props.if ? "enter-done" : "exit-done"
  );

  const render = useComputed$(() => animationState.value !== "exit-done");

  useTask$(({ track }) => {
    track(() => props.if);

    if (props.if && animationState.value.includes("enter")) return;
    if (!props.if && animationState.value.includes("exit")) return;

    if (props.if) {
      animationState.value = "enter";

      setTimeout(() => {
        animationState.value = "entering";
      }, 100);
    } else {
      animationState.value = "exit";
    }
  });

  return (
    <>
      {render.value && (
        <div
          class={[
            props.class,
            {
              [props.enter + " "]: animationState.value === "enter",
              [props.exit]: animationState.value.startsWith("exit")
            }
          ]}
          ref={wrapperRef}
          onTransitionEnd$={() => {
            animationState.value = props.if ? "enter-done" : "exit-done";
          }}
        >
          <Slot />
        </div>
      )}
    </>
  );
});
