import { useState } from "react";
import DrawerForm from "../Ui/DrawerForm";
import { Button, Drawer, Tabs } from "antd";

const Drawers = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} className="mt-4">
        Detail
      </Button>
      <Drawer
        width={620}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: "Detail",
              key: "1",
              children: "Tab 1",
            },
            {
              label: "Images Gallery",
              key: "2",
              children: "Tab 2",
            },
            {
              label: "Settings",
              key: "3",
              children: <DrawerForm />,
            },
            {
              label: "Chat History",
              key: "4",
              children: "Coming soon",
            },
          ]}
        />
      </Drawer>
    </>
  );
};
export default Drawers;
