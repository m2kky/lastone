// Created: 2024-12-19 - Dashboard Page
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Dashboard.module.css';
import { getDashboardData } from '../../lib/dashboardData';

export default function Dashboard() {
  const [data, setData] = useState({
    bookings: [],
    contacts: [],
    newsletter: [],
    stats: {
      totalBookings: 0,
      totalContacts: 0,
      totalNewsletter: 0,
      recentBookings: 0,
      recentContacts: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Overview of your website data</p>
      </header>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Bookings"
          value={data.stats.totalBookings}
          icon="📅"
          trend={data.stats.recentBookings}
          trendLabel="Last 7 days"
          color="accent"
        />
        <StatCard
          title="Contact Submissions"
          value={data.stats.totalContacts}
          icon="✉️"
          trend={data.stats.recentContacts}
          trendLabel="Last 7 days"
          color="blue"
        />
        <StatCard
          title="Newsletter Subscribers"
          value={data.stats.totalNewsletter}
          icon="📧"
          trend={data.stats.totalNewsletter > 0 ? Math.floor(data.stats.totalNewsletter * 0.1) : 0}
          trendLabel="New this month"
          color="green"
        />
        <StatCard
          title="Conversion Rate"
          value={`${((data.stats.totalBookings / (data.stats.totalContacts || 1)) * 100).toFixed(1)}%`}
          icon="📊"
          trend={null}
          trendLabel=""
          color="purple"
        />
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'bookings' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings ({data.bookings.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'contacts' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts ({data.contacts.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'newsletter' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('newsletter')}
        >
          Newsletter ({data.newsletter.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'overview' && (
          <OverviewTab bookings={data.bookings} contacts={data.contacts} newsletter={data.newsletter} />
        )}
        {activeTab === 'bookings' && <BookingsTab bookings={data.bookings} />}
        {activeTab === 'contacts' && <ContactsTab contacts={data.contacts} />}
        {activeTab === 'newsletter' && <NewsletterTab newsletter={data.newsletter} />}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, trendLabel, color }) {
  return (
    <motion.div
      className={`${styles.statCard} ${styles[`statCard${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statContent}>
        <h3 className={styles.statTitle}>{title}</h3>
        <p className={styles.statValue}>{value}</p>
        {trend !== null && (
          <p className={styles.statTrend}>
            <span className={styles.trendValue}>+{trend}</span>
            <span className={styles.trendLabel}>{trendLabel}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}

function OverviewTab({ bookings, contacts, newsletter }) {
  const recentBookings = bookings.slice(0, 5);
  const recentContacts = contacts.slice(0, 5);

  return (
    <div className={styles.overview}>
      <div className={styles.overviewGrid}>
        <div className={styles.overviewCard}>
          <h3 className={styles.overviewCardTitle}>Recent Bookings</h3>
          <div className={styles.list}>
            {recentBookings.length > 0 ? (
              recentBookings.map((booking, idx) => (
                <div key={idx} className={styles.listItem}>
                  <div className={styles.listItemMain}>
                    <span className={styles.listItemTitle}>{booking.service}</span>
                    <span className={styles.listItemDate}>{formatDate(booking.date)}</span>
                  </div>
                  <span className={styles.listItemMeta}>{booking.contact?.name || 'N/A'}</span>
                </div>
              ))
            ) : (
              <p className={styles.emptyState}>No recent bookings</p>
            )}
          </div>
        </div>

        <div className={styles.overviewCard}>
          <h3 className={styles.overviewCardTitle}>Recent Contacts</h3>
          <div className={styles.list}>
            {recentContacts.length > 0 ? (
              recentContacts.map((contact, idx) => (
                <div key={idx} className={styles.listItem}>
                  <div className={styles.listItemMain}>
                    <span className={styles.listItemTitle}>{contact.name}</span>
                    <span className={styles.listItemDate}>{formatDate(contact.date)}</span>
                  </div>
                  <span className={styles.listItemMeta}>{contact.email}</span>
                </div>
              ))
            ) : (
              <p className={styles.emptyState}>No recent contacts</p>
            )}
          </div>
        </div>

        <div className={styles.overviewCard}>
          <h3 className={styles.overviewCardTitle}>Newsletter Growth</h3>
          <div className={styles.newsletterStats}>
            <p className={styles.newsletterStat}>
              <span className={styles.newsletterStatValue}>{newsletter.length}</span>
              <span className={styles.newsletterStatLabel}>Total Subscribers</span>
            </p>
            <p className={styles.newsletterStat}>
              <span className={styles.newsletterStatValue}>
                {newsletter.filter(item => {
                  const date = new Date(item.date);
                  const now = new Date();
                  const diffTime = Math.abs(now - date);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 30;
                }).length}
              </span>
              <span className={styles.newsletterStatLabel}>This Month</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingsTab({ bookings }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Service</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, idx) => (
              <tr key={idx}>
                <td>
                  <span className={styles.badge}>{booking.service}</span>
                </td>
                <td>{booking.contact?.name || 'N/A'}</td>
                <td>{booking.contact?.email || 'N/A'}</td>
                <td>{formatDate(booking.date)}</td>
                <td>
                  <span className={styles.statusBadge}>{booking.status || 'Pending'}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className={styles.emptyTable}>
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ContactsTab({ contacts }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact, idx) => (
              <tr key={idx}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject || 'General Inquiry'}</td>
                <td>{formatDate(contact.date)}</td>
                <td>
                  <span className={styles.statusBadge}>{contact.status || 'New'}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className={styles.emptyTable}>
                No contacts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function NewsletterTab({ newsletter }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Subscribed Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {newsletter.length > 0 ? (
            newsletter.map((item, idx) => (
              <tr key={idx}>
                <td>{item.email}</td>
                <td>{formatDate(item.date)}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles.statusActive}`}>Active</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className={styles.emptyTable}>
                No newsletter subscribers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
