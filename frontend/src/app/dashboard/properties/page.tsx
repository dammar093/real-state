"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/table/table";
import Input from "@/components/ui/input";
import Loader from "@/components/loader/loader";
import Button from "@/components/ui/button";
import { FaEye, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";
import {
  deleteProperty,
  getPropertiesByUserId,
  createProperty as apiCreateProperty,
  updateProperty as apiUpdateProperty,
} from "@/api/property/property";
import { decodeToken } from "@/utils/utils";
import Modal from "@/components/modal/modal";
import useCategories from "@/hooks/useCategories";

const durationTypes = ["NIGHT", "DAY", "MONTH", "YEAR", "LIFE_TIME"];

const Properties = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [term, setTerm] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const { categories } = useCategories();
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    property: Property | null;
  }>({ open: false, property: null });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    map: "",
    categoryId: "",
    type: "",
    duration: "",
    durationType: "",
    isHotel: false,
    services: [] as string[],
    images: [] as File[],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [serviceInput, setServiceInput] = useState("");

  // Fetch properties
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = decodeToken(token as string);
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await getPropertiesByUserId(decoded?.id as number);
        setProperties(response.data);
      } catch (error) {
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [term]);

  // Delete property
  const handleDeleteProperty = async () => {
    if (!deleteModal.property) return;
    try {
      await deleteProperty(deleteModal.property.id);
      setProperties((prev) =>
        prev.filter((p) => p.id !== deleteModal.property?.id)
      );
      setDeleteModal({ open: false, property: null });
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  // Open create modal
  const handleCreateClick = () => {
    setModalType("create");
    setFormData({
      title: "",
      price: "",
      location: "",
      description: "",
      map: "",
      categoryId: "",
      type: "",
      duration: "",
      durationType: "",
      isHotel: false,
      services: [],
      images: [],
    });
    setPreviewImages([]);
    setServiceInput("");
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleEditClick = (property: Property) => {
    setSelectedProperty(property);
    setFormData({
      title: property.title,
      price: property.price.toString(),
      location: property.location,
      description: property.description || "",
      map: property.map || "",
      categoryId: property.categoryId?.toString() || "",
      type: property.type,
      duration: property.duration?.toString() || "",
      durationType: property.durationType || "",
      isHotel: property.isHotel || false,
      services: property.services?.map((s: any) => s) || [],
      images: [],
    });
    setPreviewImages(property.images?.map((img) => img.image) || []);
    setServiceInput("");
    setModalType("edit");
    setIsModalOpen(true);
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, images: files }));
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  // Add service
  const handleAddService = () => {
    if (
      serviceInput.trim() &&
      !formData.services.includes(serviceInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()],
      }));
      setServiceInput("");
    }
  };

  // Remove service
  const handleRemoveService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (modalType === "create") {
        // If you want to handle images, use FormData
        const data = new FormData();
        for (const key in formData) {
          if (key === "images") {
            formData.images.forEach((file) => data.append("image", file));
          } else if (key === "services") {
            formData.services.forEach((service) =>
              data.append("services[]", service)
            );
          } else {
            data.append(key, (formData as any)[key]);
          }
        }
        const response = await apiCreateProperty(data);
        setProperties((prev) => [...prev, response.data]);
      } else if (modalType === "edit" && selectedProperty) {
        // Plain JSON for edit
        const data = {
          title: formData.title,
          price: Number(formData.price),
          location: formData.location,
          description: formData.description,
          map: formData.map,
          categoryId: Number(formData.categoryId),
          type: formData.type,
          isHotel: Boolean(formData.isHotel),
          duration: Number(formData.duration),
          durationType: formData.durationType,
          services: formData.services, // array of strings
        };
        const response = await apiUpdateProperty(selectedProperty.id, data);
        setProperties((prev) =>
          prev.map((p) => (p.id === selectedProperty.id ? response.data : p))
        );
      }

      // Reset
      setIsModalOpen(false);
      setSelectedProperty(null);
      setFormData({
        title: "",
        price: "",
        location: "",
        description: "",
        map: "",
        categoryId: "",
        type: "",
        duration: "",
        durationType: "",
        isHotel: false,
        services: [],
        images: [],
      });
      setPreviewImages([]);
      setServiceInput("");
    } catch (error) {
      console.error("Error saving property:", error);
    } finally {
      setLoading(false);
    }
  };

  // Table columns
  const columns = [
    {
      title: "Image",
      selector: (row: Property) =>
        row.images?.[0]?.image ? (
          <Image
            src={row.images[0].image}
            alt={row.title}
            width={1080}
            height={720}
            className="w-full h-full object-contain"
          />
        ) : null,
    },
    { title: "Title", selector: (row: Property) => row.title },
    { title: "Price", selector: (row: Property) => `Rs.${row.price}` },
    { title: "Location", selector: (row: Property) => row.location },
    { title: "Type", selector: (row: Property) => row.type },
    {
      title: "Duration",
      selector: (row: Property) =>
        `${row.duration || "-"} ${row.durationType || ""}`,
    },
    {
      title: "Category",
      selector: (row: Property) => row.category?.name || "-",
    },
    { title: "User", selector: (row: Property) => row.user?.fullName || "-" },
    {
      title: "Actions",
      selector: (row: Property) => (
        <div className="flex gap-2">
          <Link
            href={`/dashboard/properties/${row.id}`}
            className="text-2xl hover:text-blue-500"
          >
            <FaEye />
          </Link>
          <Button
            onClick={() => handleEditClick(row)}
            className="text-2xl hover:text-green-500"
          >
            <FaEdit />
          </Button>
          <Button
            onClick={() => setDeleteModal({ open: true, property: row })}
            className="text-2xl hover:text-red-500"
          >
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-10">
      {/* Search + Add */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="text"
            placeholder="Search properties..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="border rounded p-2"
          />
          <Button
            type="submit"
            className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Search
          </Button>
        </form>
        <Button
          onClick={handleCreateClick}
          className="flex items-center gap-1 px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          <FaPlus /> Add Property
        </Button>
      </div>

      <Table columns={columns} data={properties} />

      {/* Delete Modal */}
      {deleteModal.open && deleteModal.property && (
        <Modal
          isOpen={deleteModal.open}
          onClose={() => setDeleteModal({ open: false, property: null })}
        >
          <div>
            <h3 className="text-red-500">Delete Property</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteModal.property.title}</strong>?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                onClick={() => setDeleteModal({ open: false, property: null })}
                className="px-3 py-1 border bg-black text-white"
              >
                No
              </Button>
              <Button
                onClick={handleDeleteProperty}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-bold mb-4 capitalize">
            {modalType} Property
          </h3>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col gap-3"
          >
            {/* Title, Price, Location, Description, Map */}
            <Input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border p-2 rounded"
            />
            <Input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="border p-2 rounded"
            />
            <Input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="border p-2 rounded"
            />
            <Input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border p-2 rounded"
            />
            <Input
              type="text"
              placeholder="Map"
              value={formData.map}
              onChange={(e) =>
                setFormData({ ...formData, map: e.target.value })
              }
              className="border p-2 rounded"
            />

            {/* Category and Type */}
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="">Select Type</option>
              <option value="RENT">RENT</option>
              <option value="SALE">SALE</option>
            </select>

            {/* Duration and Duration Type */}
            <Input
              type="number"
              placeholder="Duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="border p-2 rounded"
            />
            <select
              value={formData.durationType}
              onChange={(e) =>
                setFormData({ ...formData, durationType: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="">Select Duration Type</option>
              {durationTypes.map((dt) => (
                <option key={dt} value={dt}>
                  {dt}
                </option>
              ))}
            </select>

            {/* Services */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add service"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                className="border p-2 rounded flex-1"
              />
              <Button
                type="button"
                onClick={handleAddService}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.services.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(s)}
                    className="text-red-500 font-bold"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            {/* Images */}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="border p-2 rounded"
            />
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {previewImages.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-video border rounded overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`Preview ${idx}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 border bg-black text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white"
              >
                Save
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Properties;
