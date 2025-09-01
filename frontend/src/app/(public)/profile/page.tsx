"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getLoggedInUser, updateUserDetails } from "@/api/api";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import useAuthUser from "@/hooks/useAuth";

type FormData = {
  fullName: string;
  phoneNumber?: string;
  address?: string;
  about?: string;
  profileImage?: FileList;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
};

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const authUser = useAuthUser();

  const watchProfileImage = watch("profileImage");

  // Preview selected image
  useEffect(() => {
    if (watchProfileImage && watchProfileImage.length > 0) {
      const file = watchProfileImage[0];
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      return () => URL.revokeObjectURL(url);
    } else if (user?.userDetail?.profile?.image) {
      setPreviewImage(user.userDetail.profile.image);
    } else {
      setPreviewImage(null);
    }
  }, [watchProfileImage, user]);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      if (!authUser.user) return;
      try {
        const data = await getLoggedInUser(authUser.user.id);
        setUser(data);

        reset({
          fullName: data.fullName,
          phoneNumber: data.userDetail?.phoneNumber || "",
          address: data.userDetail?.address || "",
          about: data.userDetail?.about || "",
          facebook: data.userDetail?.facebook || "",
          instagram: data.userDetail?.instagram || "",
          twitter: data.userDetail?.twitter || "",
          linkedin: data.userDetail?.linkedin || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authUser.user, reset]);

  const onSubmit = async (formData: FormData) => {
    setUpdating(true);
    setError("");
    setSuccess("");

    try {
      const payload = new FormData();

      payload.append("fullName", formData.fullName);
      if (formData.phoneNumber)
        payload.append("phoneNumber", formData.phoneNumber);
      if (formData.address) payload.append("address", formData.address);
      if (formData.about) payload.append("about", formData.about);
      if (formData.facebook) payload.append("facebook", formData.facebook);
      if (formData.instagram) payload.append("instagram", formData.instagram);
      if (formData.twitter) payload.append("twitter", formData.twitter);
      if (formData.linkedin) payload.append("linkedin", formData.linkedin);

      if (formData.profileImage && formData.profileImage.length > 0) {
        payload.append("profileImage", formData.profileImage[0]);
      }

      // Call your API function
      const updatedUser = await updateUserDetails(
        payload,
        authUser?.user?.id as number
      );
      setUser(updatedUser);
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Full Name" {...register("fullName")} className="border" />
        <Input
          label="Phone Number"
          {...register("phoneNumber")}
          className="border"
        />
        <Input label="Address" {...register("address")} className="border" />
        <Input label="About" {...register("about")} className="border" />

        <div>
          <label className="block mb-1 font-medium">Profile Image</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            {...register("profileImage")}
            className="w-full border border-gray-400 rounded p-2"
          />
        </div>

        <Input
          label="Facebook"
          placeholder="Facebook URL"
          {...register("facebook")}
          className="border"
        />
        <Input
          label="Instagram"
          placeholder="Instagram URL"
          {...register("instagram")}
          className="border"
        />
        <Input
          label="Twitter"
          placeholder="Twitter URL"
          {...register("twitter")}
          className="border"
        />
        <Input
          label="LinkedIn"
          placeholder="LinkedIn URL"
          {...register("linkedin")}
          className="border"
        />

        <Button type="submit" loading={updating} className="px-2 py-1">
          Update Profile
        </Button>
      </form>

      {previewImage && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Profile Image Preview:</h3>
          <img
            src={previewImage}
            alt="Profile Preview"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
