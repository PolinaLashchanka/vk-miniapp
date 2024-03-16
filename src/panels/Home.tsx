import { FC } from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon24PawOutline } from "@vkontakte/icons";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  const buttonAfter = <Icon24PawOutline />;

  return (
    <Panel id={id}>
      <PanelHeader>Main</PanelHeader>
      {fetchedUser && (
        <Group
          header={
            <Header mode="secondary">User Data Fetched with VK Bridge</Header>
          }
        >
          <Cell
            before={photo_200 && <Avatar src={photo_200} />}
            subtitle={city?.title}
          >
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Form with facts</Header>}>
        <Div>
          <Button
          className="Button"
            stretched
            size="l"
            mode="secondary"
            onClick={() => routeNavigator.push("form-with-facts")}
            after={buttonAfter}
          >
            Interesting facts about cats!
          </Button>
        </Div>
      </Group>

      <Group header={<Header mode="secondary">form with age guess</Header>}>
        <Div>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={() => routeNavigator.push("form-with-age-guess")}
          >
            Find out your age!
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
