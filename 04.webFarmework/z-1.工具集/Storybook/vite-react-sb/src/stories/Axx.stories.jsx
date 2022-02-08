import React from 'react';

import { Axx } from './Axx';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Axx',
  component: Axx,
  argTypes: {
    c1: {
      control: {
        type: "text"
      }
    },
    ar: {
      defaultValue: [1, 2, 3, 5],
      description: 'demo description',
      type: {
        name: "array",
        required: true
      },
      control: {
        type: 'object'
      }
    }
  },
};

const Template = (args) => <Axx {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: '444',
  c1: "red",
  // ar: [1, 2, 3, 4, 4]
};
