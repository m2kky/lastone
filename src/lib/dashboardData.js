// Mock data service for dashboard
// In production, this would fetch from your API

// Generate mock bookings
function generateMockBookings() {
  const services = ['workshop', 'speaking', 'training', 'collaboration'];
  const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
  const names = ['Ahmed Ali', 'Sarah Mohamed', 'Omar Hassan', 'Layla Ibrahim', 'Mohamed Salah', 'Nour Ahmed'];
  
  const bookings = [];
  const now = new Date();
  
  for (let i = 0; i < 25; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 60));
    
    bookings.push({
      id: `booking_${i + 1}`,
      service: services[Math.floor(Math.random() * services.length)],
      date: date.toISOString(),
      contact: {
        name: names[Math.floor(Math.random() * names.length)],
        email: `user${i + 1}@example.com`
      },
      status: statuses[Math.floor(Math.random() * statuses.length)],
      location: Math.random() > 0.5 ? 'Online' : 'On-site',
      attendees: ['Fewer than 10', '10–30', 'More than 30'][Math.floor(Math.random() * 3)]
    });
  }
  
  return bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Generate mock contacts
function generateMockContacts() {
  const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Davis', 'David Wilson', 'Lisa Anderson'];
  const subjects = ['General Inquiry', 'Partnership Opportunity', 'Speaking Request', 'Training Inquiry', 'Collaboration'];
  const statuses = ['New', 'In Progress', 'Resolved', 'Archived'];
  
  const contacts = [];
  const now = new Date();
  
  for (let i = 0; i < 20; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 45));
    
    contacts.push({
      id: `contact_${i + 1}`,
      name: names[Math.floor(Math.random() * names.length)],
      email: `contact${i + 1}@example.com`,
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      message: 'Sample contact message',
      date: date.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return contacts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Generate mock newsletter subscriptions
function generateMockNewsletter() {
  const subscriptions = [];
  const now = new Date();
  
  for (let i = 0; i < 45; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    
    subscriptions.push({
      id: `newsletter_${i + 1}`,
      email: `subscriber${i + 1}@example.com`,
      date: date.toISOString(),
      source: ['Website', 'Social Media', 'Referral'][Math.floor(Math.random() * 3)]
    });
  }
  
  return subscriptions.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Calculate statistics
function calculateStats(bookings, contacts, newsletter) {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const recentBookings = bookings.filter(b => new Date(b.date) >= sevenDaysAgo).length;
  const recentContacts = contacts.filter(c => new Date(c.date) >= sevenDaysAgo).length;
  const recentNewsletter = newsletter.filter(n => new Date(n.date) >= thirtyDaysAgo).length;
  
  return {
    totalBookings: bookings.length,
    totalContacts: contacts.length,
    totalNewsletter: newsletter.length,
    recentBookings,
    recentContacts,
    recentNewsletter
  };
}

// Main function to get dashboard data
export async function getDashboardData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const bookings = generateMockBookings();
  const contacts = generateMockContacts();
  const newsletter = generateMockNewsletter();
  const stats = calculateStats(bookings, contacts, newsletter);
  
  return {
    bookings,
    contacts,
    newsletter,
    stats
  };
}

// In production, replace with actual API calls:
/*
export async function getDashboardData() {
  try {
    const [bookings, contacts, newsletter] = await Promise.all([
      fetch('/api/bookings').then(r => r.json()),
      fetch('/api/contacts').then(r => r.json()),
      fetch('/api/newsletter').then(r => r.json())
    ]);
    
    return {
      bookings: bookings.data || [],
      contacts: contacts.data || [],
      newsletter: newsletter.data || [],
      stats: calculateStats(bookings.data, contacts.data, newsletter.data)
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}
*/
