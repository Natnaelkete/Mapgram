import { useState } from "react";
import DrawerForm from "../Ui/DrawerForm";
import { Button, Drawer, Tabs } from "antd";
import SearchUsers from "./SearchUsers";
import { useSearchParams } from "react-router-dom";
import useMapin from "./useMapin";
import ImageGallery from "./ImageGallery";
import Detail from "./Detail";

const Drawers = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");

  const { pins: Pin } = useMapin();
  const owner = Pin._id === user;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} className="">
        Detail
      </Button>
      <Drawer width={620} onClose={onClose} open={open}>
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: "Detail",
              key: "1",
              children: <Detail />,
            },
            {
              label: "Images Gallery",
              key: "2",
              children: <ImageGallery />,
            },
            owner && {
              label: "Settings",
              key: "3",
              children: <DrawerForm />,
            },
            owner && {
              label: "Chat History",
              key: "4",
              children: <SearchUsers />,
            },
          ]}
        />
      </Drawer>
    </>
  );
};
export default Drawers;
