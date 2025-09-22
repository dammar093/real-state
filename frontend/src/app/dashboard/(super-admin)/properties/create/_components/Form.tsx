"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  Switch,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useCategories from "@/hooks/useCategories";
import { DurationType, Types } from "../_types/enum";
import useProperties from "@/hooks/useProperties";
import { PropertyItem } from "@/types/property";

const { TextArea } = Input;
const { Option } = Select;

interface PropertyFormProps {
  property?: PropertyItem | null; // Optional for edit
}

interface Service {
  id: number;
  name: string;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ property }) => {
  const [form] = Form.useForm();
  const [services, setServices] = useState<Service[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const { categories } = useCategories();
  const { createProperty, updatePropertyById, loading } = useProperties();

  // --- Set initial form values for edit ---
  useEffect(() => {
    if (property) {
      form.setFieldsValue({
        ...property,
        Services: property.Services || [], // match field name exactly
      });
    }
  }, [property, form]);

  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const handleFinish = async (values: any) => {
    const formData = new FormData();

    // Append all values except Services separately
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value as any);
      }
    });

    // Append Services as array
    if (values.Services) {
      values.Services.forEach((srv: string) =>
        formData.append("Services", srv)
      );
    }

    if (property) {
      // --- Update ---
      // Do not send images
      updatePropertyById(property.id, values);
    } else {
      // --- Create ---
      if (fileList.length === 0) {
        message.error("Please upload at least one image");
        return;
      }
      fileList.forEach((file) => {
        formData.append("image", file.originFileObj);
      });
      createProperty(formData);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{ isHotel: false }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter property title" }]}
      >
        <Input placeholder="Property Title" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter property price" }]}
      >
        <InputNumber placeholder="Price" style={{ width: "100%" }} min={0} />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Please enter property location" }]}
      >
        <Input placeholder="Location" />
      </Form.Item>

      <Form.Item
        label="Map URL"
        name="map"
        rules={[{ required: true, message: "Please enter map URL" }]}
      >
        <TextArea rows={4} placeholder="Embed google map" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <TextArea rows={4} placeholder="Property Description" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="categoryId"
        rules={[{ required: true, message: "Please select category" }]}
      >
        <Select placeholder="Select Category">
          {categories.map((cat) => (
            <Option key={cat.id} value={cat.id}>
              {cat.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please select type" }]}
      >
        <Select placeholder="Select Type">
          {Object.values(Types).map((type) => (
            <Option key={type} value={type}>
              {type.charAt(0) + type.slice(1).toLowerCase()}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Duration"
        name="duration"
        rules={[{ required: true, message: "Please enter duration" }]}
      >
        <InputNumber placeholder="Duration" style={{ width: "100%" }} min={1} />
      </Form.Item>

      <Form.Item
        label="Duration Type"
        name="durationType"
        rules={[{ required: true, message: "Please select duration type" }]}
      >
        <Select placeholder="Select Duration Type">
          {Object.values(DurationType).map((dur) => (
            <Option key={dur} value={dur}>
              {dur.charAt(0) + dur.slice(1).toLowerCase()}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* --- Services --- */}
      <Form.Item label="Services" name="Services">
        <Select
          mode="tags"
          placeholder="Enter services and press Enter"
          tokenSeparators={[","]}
          style={{ width: "100%" }}
        >
          {services.map((srv) => (
            <Option key={srv.id} value={srv.name}>
              {srv.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {!property && (
        <Form.Item label="Property Images" required>
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            multiple
          >
            <Button icon={<UploadOutlined />}>Upload Images</Button>
          </Upload>
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {property ? "Update Property" : "Create Property"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PropertyForm;
