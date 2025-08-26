"use client";
import React, { useState } from "react";
import Table from "@/components/table/table";
import useCategories from "@/hooks/useCategories";
import { Category } from "@/types/category";
import Toggle from "@/components/toggle/toggle";
import {
  toggleCategoryStatus,
  createCategory,
  updateCategory as updateCategoryAPI,
  deleteCategory as deleteCategoryAPI,
} from "@/api/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import {
  updateCategory,
  addCategory,
  removeCategory,
} from "@/redux/feature/categorySlice";
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
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    category: Category | null;
  }>({ open: false, category: null });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Toggle category status
  const handleToggle = async (id: number, currentStatus: boolean) => {
    try {
      const response = await toggleCategoryStatus(id, currentStatus);
      dispatch(updateCategory(response.data));
    } catch (error) {
      console.error("Error toggling category status:", error);
    }
  };

  // Create category
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      const response = await createCategory({ name: categoryName });
      dispatch(addCategory(response.data));
      setCategoryName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Open edit modal
  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setModalType("edit");
    setIsModalOpen(true);
  };

  // Update category
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !categoryName.trim()) return;

    try {
      const response = await updateCategoryAPI(selectedCategory.id, {
        name: categoryName,
      });
      dispatch(updateCategory(response.data));
      setSelectedCategory(null);
      setCategoryName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Delete category
  const handleDeleteCategory = async () => {
    if (!deleteModal.category) return;
    try {
      await deleteCategoryAPI(deleteModal.category.id);
      dispatch(removeCategory(deleteModal.category.id));
      setDeleteModal({ open: false, category: null });
    } catch (error) {
      console.error("Error deleting category:", error);
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
          className="border"
        />
        <Button
          onClick={() => {
            setModalType("create");
            setCategoryName("");
            setIsModalOpen(true);
          }}
          className="px-6 py-2"
        >
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
              <div className="flex gap-2">
                <Toggle
                  title={`Toggle category status for ${row.name}`}
                  checked={row.isActive}
                  onChange={() => handleToggle(row.id, row.isActive)}
                />
                <button
                  onClick={() => handleEditClick(row)}
                  title="Edit Category"
                  className="cursor-pointer"
                >
                  <FiEdit className="text-xl" />
                </button>
                <button
                  onClick={() => setDeleteModal({ open: true, category: row })}
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

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>
            <h3>
              {modalType === "create" ? "Create Category" : "Edit Category"}
            </h3>
            <form
              onSubmit={
                modalType === "create"
                  ? handleCreateCategory
                  : handleUpdateCategory
              }
              className="flex flex-col gap-3"
            >
              <Input
                type="text"
                placeholder="Category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-4 border"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="px-3 py-1 flex items-center gap-1 w-fit"
                >
                  {modalType === "create" ? <FaPlus /> : <FiEdit />}
                  <span>{modalType === "create" ? "Create" : "Update"}</span>
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && deleteModal.category && (
        <Modal
          isOpen={deleteModal.open}
          onClose={() => setDeleteModal({ open: false, category: null })}
        >
          <div>
            <h3 className="text-red-500">Delete Category</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteModal.category.name}</strong>?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                onClick={() => setDeleteModal({ open: false, category: null })}
                className="px-3 py-1 border !text-white !bg-black"
              >
                No
              </Button>
              <Button
                onClick={handleDeleteCategory}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategoryPage;
