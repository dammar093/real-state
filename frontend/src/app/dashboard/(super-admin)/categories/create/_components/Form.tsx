"use client";

import React, { useEffect } from "react";
import { Form as AntForm, Input, Button } from "antd";
import useCategories from "@/hooks/useCategories";
import { CategoryItem } from "@/types/category";

interface CategoryFormProps {
  category?: CategoryItem; // optional, exists for edit
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category }) => {
  const { loading, createCategory, updateCategory } = useCategories();
  const [form] = AntForm.useForm();

  // Set initial values when category changes
  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        isActive: category.isActive ?? true,
      });
    }
  }, [category, form]);

  const onFinish = async (values: { name: string }) => {
    if (category) {
      // edit mode
      updateCategory(category.id, values);
    } else {
      // create mode
      createCategory(values);
    }
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {category ? "Edit Category" : "Create Category"}
      </h2>
      <AntForm
        form={form} // bind form instance
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: category?.name || "",
          isActive: category?.isActive ?? true,
        }}
      >
        <AntForm.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter category name" },
            { min: 3, message: "Name must be at least 3 characters" },
          ]}
        >
          <Input placeholder="Enter category name" />
        </AntForm.Item>

        <AntForm.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {category ? "Update Category" : "Create Category"}
          </Button>
        </AntForm.Item>
      </AntForm>
    </div>
  );
};

export default CategoryForm;
