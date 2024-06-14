import { Col, Form, Input, Row, Select, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import useMapin from "../components/useMapin";
import { useSearchParams } from "react-router-dom";

// const { Option } = Select;

function DrawerForm() {
  const [form] = useForm();
  const { update, isUpdating } = useMapin();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const handleSubmit = (values) => {
    update(values);
  };

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please enter user name",
                },
              ]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="rating"
              label="Rating"
              rules={[
                {
                  required: true,
                  message: "Please choose the rating",
                },
              ]}
            >
              <Select placeholder="Please choose the rating">
                <Select.Option value="0">0</Select.Option>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter a description",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Please enter a description"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="id"
              label="id"
              hidden
              initialValue={id}
            ></Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" disabled={isUpdating}>
          Update
        </Button>
      </Form>
    </div>
  );
}

export default DrawerForm;
