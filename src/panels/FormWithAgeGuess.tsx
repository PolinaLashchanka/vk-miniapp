import { FC, useState, useEffect, ChangeEvent } from "react";
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FormItem,
  Group,
  Text,
  Button,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import useFetchAge from "../hooks/UseFetchAge";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../components/InputField";

import { useForm, Controller } from "react-hook-form";
import { inputResolver } from "../features/validations/InputValidation";

export const FormWithAgeGuess: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const [userName, setUserName] = useState<string>("");
  const [age, setAge] = useState<number | null>(0);
  const [timerId, setTimerId] = useState<number | undefined>();
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: inputResolver });

  const { data, refetch, isLoading, isError, error } = useFetchAge(userName);

  const client = useQueryClient();

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setUserName(newValue);

    if (timerId) {
      clearTimeout(timerId);
    }

    const cachedData = client.getQueryData(["age", newValue]);

    if (cachedData) {
      setDisabledButton(true);
    }
    if (!cachedData) {
      setDisabledButton(false);
      const newTimerId = setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 3000);
      setTimerId(newTimerId);
    }
  }

  function onSubmit() {
    clearTimeout(timerId);
    refetch();
    setDisabledButton(true);
  }

  useEffect(() => {
    if (data) {
      if (data.error) {
        setServerError(data.error);
      } else {
        setServerError("");
        setAge(data.age);
      }
    }
  }, [data]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Back
      </PanelHeader>
      <Group>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem
            htmlFor="username"
            status={errors.username || isError ? "error" : "default"}
            top="Type your name to get the age guess"
            bottom={
              errors.username
                ? errors.username.message
                : isError
                ? error.message
                : ""
            }
          >
            <Controller
              name="username"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <InputField
                  {...field}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                    field.onChange(e);
                    handleNameChange(e);
                  }}
                />
              )}
            />
          </FormItem>
          <Text weight="1" style={{ padding: "0 16px 16px" }}>
            Your name age is:{" "}
            <strong>
              {serverError
                ? serverError
                : typeof age === "number"
                ? age
                : "your name isn't correct"}
            </strong>
          </Text>
            <Button
              style={{ maxWidth: "145px", margin: "0 16px 16px" }}
              type="submit"
              align="center"
              appearance="accent"
              stretched={true}
              mode="primary"
              size="m"
              disabled={errors.username ? true : disabledButton}
            >
              {isLoading ? "Loading..." : "Guess age"}
            </Button>
        </form>
      </Group>
    </Panel>
  );
};
