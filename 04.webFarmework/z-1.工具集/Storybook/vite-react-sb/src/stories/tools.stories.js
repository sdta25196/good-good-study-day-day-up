
export default {
  title: 'doc/tools',
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template = (args) => <div>
  {
    args.show ? "文案2" : "文案1"
  }
</div>;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  show: true,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
