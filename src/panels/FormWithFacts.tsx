import { FC } from "react";
import {
  Button,
  FormItem,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Textarea,
  NavIdProps,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useState, useRef, useEffect } from "react";
import useFetchCatFact from "../hooks/useFetchCatFact";
import { useQueryClient } from "@tanstack/react-query";

export const FormWithFacts: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const client = useQueryClient();

  const ref = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { data, refetch, isLoading, isError, error } = useFetchCatFact();

  function clickButton() {
    client.cancelQueries({ queryKey: ["catFact"] });
    refetch();
  }

  const textAreaValue = data?.fact;

  useEffect(() => {
    let timeoutId: number | undefined;
    if (textAreaValue) {
      setValue(textAreaValue);
      setDisabled(false);
      timeoutId = setTimeout(() => {
        const firstSpaceIndex = textAreaValue.indexOf(" ");
        if (firstSpaceIndex !== -1) {
          ref.current?.focus();
          ref.current?.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
        }
      }, 0);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [textAreaValue]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Back
      </PanelHeader>
      <Group>
        <FormItem
          top="Click the button to get an interesting fact about cats"
          status={isError ? "error" : "default"}
          bottom={isError && error.message}
        >
          <Textarea
            getRef={ref}
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormItem>
        <Button
          style={{ maxWidth: "145px", margin: "0 16px 16px" }}
          align="center"
          appearance="accent"
          stretched={false}
          mode="primary"
          size="s"
          onClick={clickButton}
        >
          {isLoading ? "Loading..." : "Button"}
        </Button>
      </Group>
    </Panel>
  );
};
