"use client";
import React from "react";
import { PropertyItem } from "@/types/property";
import createSignature from "@/utils/create-signature";
import { uuid } from "uuidv4";
import useAuthUser from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const BookingForm = ({ property }: { property: PropertyItem }) => {
  const { user } = useAuthUser();
  const router = useRouter();
  if (!user) {
    router.push("/sign-in");
  }
  const id = uuid();

  const signature = createSignature(property.price, property.id + "=" + id);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{property.title}</h2>
      <p>Address: {property.location}</p>
      <p>Rs. {property.price}</p>
      <p>
        Duration: {property.duration} {property.durationType}
      </p>

      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="flex flex-col gap-3"
      >
        <input
          type="hidden"
          id="amount"
          name="amount"
          value={property.price}
          required
        />
        <input
          type="hidden"
          id="tax_amount"
          name="tax_amount"
          value="0"
          required
        />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          value={property.price}
          required
        />
        <input
          type="hidden"
          id="transaction_uuid"
          name="transaction_uuid"
          value={property.id + "=" + id}
          required
        />
        <input
          type="hidden"
          id="product_code"
          name="product_code"
          value="EPAYTEST"
          required
        />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="success_url"
          name="success_url"
          value={`${process.env.NEXT_PUBLIC_ESEWA_SUCCESS_URL}`}
          required
        />
        <input
          type="hidden"
          id="failure_url"
          name="failure_url"
          value={`${process.env.NEXT_PUBLIC_ESEWA_FAILURE_URL}`}
          required
        />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          required
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={signature}
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
        >
          Pay with eSewa
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
