// Mock booking submission function
export const submitBooking = async (bookingData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock success response
  console.log('Booking submitted:', bookingData);
  
  // In a real app, this would make an actual API call
  // return fetch('/api/bookings', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(bookingData)
  // });
  
  return { success: true, id: `booking_${Date.now()}` };
};