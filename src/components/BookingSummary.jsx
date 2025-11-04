import { serviceSteps } from '../data/bookingData';
import styles from '../pages/BookWorkshop/BookWorkshop.module.css';

export default function BookingSummary({ data, onEdit }) {
  const formatValue = (value) => {
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object' && value !== null) {
      if (value.name && value.email) {
        return `${value.name} (${value.email})`;
      }
      return Object.entries(value)
        .filter(([_, v]) => v && v !== '')
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
    }
    return value || 'Not specified';
  };

  const serviceType = data.service || '';
  const steps = serviceType ? serviceSteps[serviceType] || [] : [];
  
  // Find step indices for each step type
  const getStepIndex = (stepId) => {
    return steps.findIndex(s => s.id === stepId);
  };

  const buildSummaryItems = () => {
    const items = [];
    
    // Service type
    items.push({ 
      label: 'Service', 
      value: serviceType, 
      step: getStepIndex('service'),
      show: true 
    });

    // Service-specific fields
    if (serviceType === 'workshop') {
      items.push(
        { label: 'Focus Area', value: data.focus, step: getStepIndex('basics'), show: !!data.focus },
        { label: 'Attendees', value: data.attendees, step: getStepIndex('basics'), show: !!data.attendees },
        { label: 'Duration', value: data.duration, step: getStepIndex('basics'), show: !!data.duration }
      );
    } else if (serviceType === 'speaking') {
      items.push(
        { label: 'Event Type', value: data.eventType, step: getStepIndex('event'), show: !!data.eventType },
        { label: 'Topic', value: data.topic, step: getStepIndex('event'), show: !!data.topic },
        { label: 'Duration', value: data.duration, step: getStepIndex('event'), show: !!data.duration },
        { label: 'Audience Size', value: data.audienceSize, step: getStepIndex('audience'), show: !!data.audienceSize },
        { label: 'Audience Level', value: data.audienceLevel, step: getStepIndex('audience'), show: !!data.audienceLevel }
      );
    } else if (serviceType === 'course') {
      items.push(
        { label: 'Subject', value: data.subject, step: getStepIndex('curriculum'), show: !!data.subject },
        { label: 'Level', value: data.level, step: getStepIndex('curriculum'), show: !!data.level },
        { label: 'Duration', value: data.duration, step: getStepIndex('curriculum'), show: !!data.duration },
        { label: 'Delivery Format', value: data.delivery, step: getStepIndex('format'), show: !!data.delivery },
        { label: 'Group Size', value: data.groupSize, step: getStepIndex('format'), show: !!data.groupSize }
      );
    } else if (serviceType === 'collaboration') {
      items.push(
        { label: 'Project Type', value: data.projectType, step: getStepIndex('project'), show: !!data.projectType },
        { label: 'Industry', value: data.industry, step: getStepIndex('project'), show: !!data.industry },
        { label: 'Budget Range', value: data.budget, step: getStepIndex('scope'), show: !!data.budget },
        { label: 'Deliverables', value: data.deliverables, step: getStepIndex('scope'), show: !!data.deliverables },
        { label: 'Timeline', value: data.urgency, step: getStepIndex('timeline'), show: !!data.urgency }
      );
    }

    // Shared logistics fields
    const logisticsIndex = getStepIndex('logistics');
    if (logisticsIndex >= 0) {
      items.push(
        { label: 'Location', value: data.location, step: logisticsIndex, show: !!data.location },
        { label: 'City', value: data.city, step: logisticsIndex, show: data.location === 'On-site' && !!data.city },
        { label: 'Date', value: data.date, step: logisticsIndex, show: !!data.date }
      );
    }

    // Requirements (if exists for this service)
    const requirementsIndex = getStepIndex('requirements');
    if (requirementsIndex >= 0) {
      items.push(
        { label: 'Requirements', value: data.requirements, step: requirementsIndex, show: !!data.requirements },
        { label: 'Needs Deck', value: data.needsDeck, step: requirementsIndex, show: data.needsDeck !== undefined },
        { label: 'Attachments', value: data.attachments?.length || 0, step: requirementsIndex, show: data.attachments?.length > 0 }
      );
    }

    // Contact info
    const contactIndex = getStepIndex('contact');
    if (contactIndex >= 0 && data.contact) {
      items.push(
        { label: 'Contact Name', value: data.contact.name, step: contactIndex, show: !!data.contact.name },
        { label: 'Email', value: data.contact.email, step: contactIndex, show: !!data.contact.email },
        { label: 'Preferred Contact', value: data.contact.preferredContact, step: contactIndex, show: !!data.contact.preferredContact },
        { label: 'Contact Other', value: data.contact.preferredContactOther, step: contactIndex, show: data.contact.preferredContact === 'Other' && !!data.contact.preferredContactOther },
        { label: 'Message', value: data.message, step: contactIndex, show: !!data.message }
      );
    }

    return items.filter(item => item.show !== false);
  };

  const summaryItems = buildSummaryItems();

  return (
    <div className={styles.summaryContent}>
      <h3>Please review your booking details:</h3>
      <div className={styles.summaryList}>
        {summaryItems.map((item, index) => {
          return (
            <div key={index} className={styles.summaryItem}>
              <div className={styles.summaryLabel}>
                {item.label}
                {item.step >= 0 && (
                  <button 
                    type="button"
                    onClick={() => onEdit(item.step)}
                    className={styles.editBtn}
                    aria-label={`Edit ${item.label}`}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className={styles.summaryValue}>
                {formatValue(item.value)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}