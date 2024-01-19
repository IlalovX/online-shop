import { Button, DatePicker, DatePickerProps, Form, Input } from "antd";
import { useState } from "react";

import { FieldOrderType } from "../../../../types/FieldOrderType";

import styles from "./form-change-order.module.scss";
import { useMutation } from "@tanstack/react-query";
import { $authHost } from "../../../../services/requestService";

function FormChangeOrder({
  id,
  handleClose,
}: {
  id: string;
  handleClose: () => void;
}) {
  const [time, setTime] = useState<string>("");
  const orderChange: any = useMutation((data) => {
    return $authHost.put("/users/order", data);
  });

  const onFinish = (values: FieldOrderType) => {
    orderChange
      .mutateAsync({
        id: id,
        details: {
          name: values.name as string,
          address: values.address as string,
          phone: values.phone as string,
          timeToDeliver: time,
          comment: values.comment as string,
        },
      })
      .then(() => {
        handleClose();
      });
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setTime(dateString);
    date;
  };

  return (
    <Form onFinish={onFinish} className={styles.form}>
      <Form.Item<FieldOrderType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldOrderType>
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldOrderType>
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input your phone!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldOrderType>
        label="Time"
        name="timeToDelivery"
        rules={[{ required: true, message: "Please input your time!" }]}
      >
        <DatePicker onChange={onChange} className={styles.data} />
      </Form.Item>

      <Form.Item<FieldOrderType> label="Comment" name="comment">
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormChangeOrder;
