import React from "react";
import { AutoComplete, DataSourceType } from "./autoComplete";
import { Meta, StoryObj } from "@storybook/react";

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const meta = {
  title: "Component/AutoComplete/AutoComplete",
  // tags: ["autodocs"],
  component: AutoComplete,
} satisfies Meta<typeof AutoComplete>;

export default meta;

type Story = StoryObj<typeof meta>;

const lakers = ["bradley", "pope", "caruso", "gibson", "cook", "kuzma", "lillard"];
// const handleFetch = (query: string) => {
//   return lakers.filter((name) => name.includes(query)).map(name => ({ value: name }));
// }

const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`).then(response => response.json()).then(({ items }) => {
    return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
  })
}

// const renderOption = (item: DataSourceType<GithubUserProps>) => {
//   return <>
//     <h2>Name: {item.login}</h2>
//     <p>url: {item.url}</p>
//   </>
// }

export const Primary = {
  name: "I am primary autoComplete Component",
  args: {
    fetchSuggestions: handleFetch
  },
  render: (args) => <AutoComplete  {...args } />,
} satisfies Story;
