import { BookingItem } from "@/types/booking";

export function getBookingAvailability(
  booking?: BookingItem,
): { isAvailable: boolean; nextBookingDate: Date | null } {
  if (!booking?.createdAt || !booking?.property?.durationType) {
    return { isAvailable: true, nextBookingDate: null };
  }

  const startDate = new Date(booking.createdAt);
  const nextBookingDate = new Date(startDate);

  // Add duration based on property type
  if (booking?.property.durationType === "MONTH") {
    nextBookingDate.setDate(nextBookingDate.getDate() + (30 * booking?.property?.duration));
  } else if (booking?.property.durationType === "DAY") {
    nextBookingDate.setDate(nextBookingDate.getDate() + 1 * booking?.property?.duration);
  }

  const now = new Date();
  const isAvailable = now >= nextBookingDate;

  return { isAvailable, nextBookingDate };
}