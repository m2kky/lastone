export const serviceTypes = [
  {
    id: 'workshop',
    title: 'Workshop',
    icon: '',
    description: 'Interactive learning sessions'
  },
  {
    id: 'speaking',
    title: 'Speaking Event',
    icon: '',
    description: 'Keynotes and presentations'
  },
  {
    id: 'course',
    title: 'Training',
    icon: '',
    description: 'Structured learning programs'
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    icon: '',
    description: 'Partnership opportunities'
  }
];

export const serviceSteps = {
  workshop: [
    { id: 'service', title: 'Service Type', icon: '' },
    { id: 'basics', title: 'Workshop Basics', icon: '' },
    { id: 'logistics', title: 'Logistics', icon: '' },
    { id: 'requirements', title: 'Requirements', icon: '' },
    { id: 'contact', title: 'Contact Info', icon: '' },
    { id: 'review', title: 'Review', icon: '' }
  ],
  speaking: [
    { id: 'service', title: 'Service Type', icon: '' },
    { id: 'event', title: 'Event Details', icon: '' },
    { id: 'audience', title: 'Audience', icon: '' },
    { id: 'logistics', title: 'Logistics', icon: '' },
    { id: 'contact', title: 'Contact Info', icon: '' },
    { id: 'review', title: 'Review', icon: '' }
  ],
  course: [
    { id: 'service', title: 'Service Type', icon: '' },
    { id: 'curriculum', title: 'Curriculum', icon: '' },
    { id: 'format', title: 'Format', icon: '' },
    { id: 'logistics', title: 'Logistics', icon: '' },
    { id: 'contact', title: 'Contact Info', icon: '' },
    { id: 'review', title: 'Review', icon: '' }
  ],
  collaboration: [
    { id: 'service', title: 'Service Type', icon: '' },
    { id: 'project', title: 'Project Details', icon: '' },
    { id: 'scope', title: 'Scope', icon: '' },
    { id: 'timeline', title: 'Timeline', icon: '' },
    { id: 'contact', title: 'Contact Info', icon: '' },
    { id: 'review', title: 'Review', icon: '' }
  ]
};

export const serviceQuestions = {
  workshop: {
    basics: [
      {
        name: 'focus',
        type: 'radio',
        label: 'What\'s the main focus?',
        options: ['Digital Marketing', 'Automation & AI', 'UX Design', 'Personal Productivity'],
        required: true
      },
      {
        name: 'attendees',
        type: 'radio',
        label: 'Number of attendees',
        options: ['Fewer than 10', '10–30', 'More than 30'],
        required: true
      },
      {
        name: 'duration',
        type: 'radio',
        label: 'Duration',
        options: ['Half-day', 'Full day', 'Multiple days'],
        required: true
      }
    ]
  },
  speaking: {
    event: [
      {
        name: 'eventType',
        type: 'radio',
        label: 'Event type',
        options: ['Conference', 'Corporate Event', 'Webinar', 'Panel Discussion'],
        required: true
      },
      {
        name: 'topic',
        type: 'text',
        label: 'Preferred topic or theme',
        placeholder: 'e.g., Digital Transformation, AI in Business...',
        required: true
      },
      {
        name: 'duration',
        type: 'radio',
        label: 'Speaking duration',
        options: ['15-30 minutes', '30-60 minutes', '60+ minutes'],
        required: true
      }
    ],
    audience: [
      {
        name: 'audienceSize',
        type: 'radio',
        label: 'Expected audience size',
        options: ['Under 50', '50-200', '200-500', '500+'],
        required: true
      },
      {
        name: 'audienceLevel',
        type: 'radio',
        label: 'Audience level',
        options: ['Beginner', 'Intermediate', 'Advanced', 'Mixed'],
        required: true
      }
    ]
  },
  course: {
    curriculum: [
      {
        name: 'subject',
        type: 'radio',
        label: 'Training subject',
        options: ['Digital Marketing', 'UX/UI Design', 'Business Strategy', 'Technology & AI'],
        required: true
      },
      {
        name: 'level',
        type: 'radio',
        label: 'Training level',
        options: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
      },
      {
        name: 'duration',
        type: 'radio',
        label: 'Training duration',
        options: ['1-2 weeks', '1 month', '2-3 months', '6+ months'],
        required: true
      }
    ],
    format: [
      {
        name: 'delivery',
        type: 'radio',
        label: 'Delivery format',
        options: ['Online live', 'Self-paced online', 'In-person', 'Hybrid'],
        required: true
      },
      {
        name: 'groupSize',
        type: 'radio',
        label: 'Group size',
        options: ['1-on-1', 'Small group (2-10)', 'Large group (10+)'],
        required: true
      }
    ]
  },
  collaboration: {
    project: [
      {
        name: 'projectType',
        type: 'radio',
        label: 'Project type',
        options: ['Consulting', 'Content Creation', 'Product Development', 'Strategic Partnership'],
        required: true
      },
      {
        name: 'industry',
        type: 'text',
        label: 'Industry or field',
        placeholder: 'e.g., Healthcare, Finance, Education...',
        required: true
      }
    ],
    scope: [
      {
        name: 'budget',
        type: 'radio',
        label: 'Budget range',
        options: ['Under $5K', '$5K-$15K', '$15K-$50K', '$50K+'],
        required: false
      },
      {
        name: 'deliverables',
        type: 'textarea',
        label: 'Expected deliverables',
        placeholder: 'Describe what you expect as outcomes...',
        required: true
      }
    ],
    timeline: [
      {
        name: 'urgency',
        type: 'radio',
        label: 'Timeline',
        options: ['ASAP', '1-2 months', '3-6 months', 'Flexible'],
        required: true
      }
    ]
  }
};