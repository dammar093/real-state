"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  Row,
  Col,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useCategories from "@/hooks/useCategories";
import { DurationType, Types } from "../_types/enum";
import useProperties from "@/hooks/useProperties";
import { PropertyItem } from "@/types/property";
import MapSearch from "./Map";

const { TextArea } = Input;
const { Option } = Select;

interface PropertyFormProps {
  property?: PropertyItem | null;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ property }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const { categories } = useCategories();
  const { createProperty, updatePropertyById, loading } = useProperties();

  useEffect(() => {
    if (property) {
      form.setFieldsValue({
        ...property,
        Services: property.Services || [],
        latitude: property.latitude || 27.7172,
        longitude: property.longitude || 85.324,
      });
    }
  }, [property, form]);

  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const handleFinish = async (values: any) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value as any);
      }
    });

    if (values.Services) {
      values.Services.forEach((srv: string) =>
        formData.append("Services", srv)
      );
    }

    if (property) {
      updatePropertyById(property.id, values);
    } else {
      if (fileList.length === 0) {
        message.error("Please upload at least one image");
        return;
      }
      fileList.forEach((file) => formData.append("image", file.originFileObj));
      createProperty(formData);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
        {/* Title */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter property title" }]}
          >
            <Input placeholder="Property Title" />
          </Form.Item>
        </Col>

        {/* Price */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter property price" }]}
          >
            <InputNumber
              placeholder="Price"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>
        </Col>

        {/* Location */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Address"
            name="location"
            rules={[
              { required: true, message: "Please enter property location" },
            ]}
          >
            <Input placeholder="Location" />
          </Form.Item>
        </Col>

        {/* Category */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select Category" className="capitalize">
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.id} className="capitalize">
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Duration */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>
        </Col>

        {/* Duration Type */}
        <Col xs={24} md={12}>
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
        </Col>

        {/* Description */}
        <Col xs={24}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={4} placeholder="Property Description" />
          </Form.Item>
        </Col>

        {/* Services */}
        <Col xs={24}>
          <Form.Item label="Services" name="Services">
            <Select
              mode="tags"
              placeholder="Enter services and press Enter"
              tokenSeparators={[","]}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        {/* Property Images */}
        {!property && (
          <Col xs={24} md={8}>
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
          </Col>
        )}
        {/* Latitude */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Latitude"
            name="latitude"
            rules={[{ required: true, message: "Please select latitude" }]}
          >
            <InputNumber style={{ width: "100%" }} min={-90} max={90} />
          </Form.Item>
        </Col>

        {/* Longitude */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Longitude"
            name="longitude"
            rules={[{ required: true, message: "Please select longitude" }]}
          >
            <InputNumber style={{ width: "100%" }} min={-180} max={180} />
          </Form.Item>
        </Col>

        {/* Map */}
        <Col xs={24}>
          <MapSearch form={form} />
        </Col>

        {/* Submit */}
        <Col xs={24} className="mt-3">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {property ? "Update Property" : "Create Property"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PropertyForm;
