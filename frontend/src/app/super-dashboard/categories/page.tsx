"use client";
import React, { useState } from "react";
import Table from "@/components/table/table";
import useCategories from "@/hooks/useCategories";
import { Category } from "@/types/category";
import Toggle from "@/components/toggle/toggle";
import { toggleCategoryStatus, createCategory } from "@/api/api"; // import API
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { updateCategory, addCategory } from "@/redux/feature/categorySlice"; // import addCategory
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Modal from "@/components/modal/modal";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handleToggle = async (id: number, currentStatus: boolean) => {
    try {
      const response = await toggleCategoryStatus(id, currentStatus);
      dispatch(updateCategory(response.data));
    } catch (error) {
      console.error("Error toggling category status:", error);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return; // Don't allow empty

    try {
      const response = await createCategory({ name: newCategoryName });
      dispatch(addCategory(response.data));
      setNewCategoryName(""); // reset input
      setIsModalOpen(false); // close modal
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Filter categories by search term
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-10">
      {/* Top controls */}
      <div className="flex justify-between gap-2 mb-2">
        <Input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setIsModalOpen(true)} className="px-6 py-2">
          Create Category
        </Button>
      </div>

      {/* Table */}
      <Table<Category>
        data={filteredCategories}
        columns={[
          {
            title: "Category Name",
            selector: (row) => <span className="capitalize">{row.name}</span>,
          },

          {
            title: "Actions",
            selector: (row) => (
              <div className="flex gap-2 ">
                <Toggle
                  title={`Toggle category status for ${row.name}`}
                  checked={row.isActive}
                  onChange={() => handleToggle(row.id, row.isActive)}
                />

                <button
                  onClick={() => {}}
                  title="Edit Category"
                  className="cursor-pointer"
                >
                  <FiEdit className="text-xl" />
                </button>

                <button
                  onClick={() => row.id}
                  title="Delete Category"
                  className="cursor-pointer"
                >
                  <FiTrash2 className="text-xl" />
                </button>
              </div>
            ),
          },
        ]}
      />

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>
            <h3>Create Category</h3>
            <form
              onSubmit={handleCreateCategory}
              className="flex flex-col gap-3"
            >
              <Input
                type="text"
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-4 border"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="px-3 py-1 flex items-center gap-1 w-fit"
                >
                  <FaPlus />
                  <span>Create</span>
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategoryPage;
