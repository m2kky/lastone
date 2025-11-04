// Created: 2024-12-19 - Unified Booking Page (Vite, CSS Modules, Framer Motion)
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import BookingStepCard from '../../components/BookingStepCard';
import BookingSummary from '../../components/BookingSummary';
import FileUpload from '../../components/FileUpload';
import { submitBooking } from '../../lib/bookings';
import { serviceTypes, serviceSteps, serviceQuestions } from '../../data/bookingData';
import styles from './BookWorkshop.module.css';

export default function BookWorkshop() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [slideDirection, setSlideDirection] = useState(1);
  const cardRef = useRef(null);
  const liveRegionRef = useRef(null);

  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger, getValues } = useForm({
    defaultValues: {
      service: '',
      // Workshop fields
      focus: '',
      attendees: '',
      duration: '',
      // Speaking fields
      eventType: '',
      topic: '',
      audienceSize: '',
      audienceLevel: '',
      // Training fields
      subject: '',
      level: '',
      delivery: '',
      groupSize: '',
      // Collaboration fields
      projectType: '',
      industry: '',
      budget: '',
      deliverables: '',
      urgency: '',
      // Shared fields
      location: '',
      city: '',
      date: '',
      requirements: '',
      needsDeck: false,
      attachments: [],
      contact: {
        name: '',
        email: '',
        preferredContact: 'Email',
        preferredContactOther: ''
      },
      message: ''
    }
  });

  const watchedValues = watch();
  const selectedService = watchedValues.service || '';
  const STEPS = selectedService ? serviceSteps[selectedService] || [] : [];

  // Reset to step 0 when service changes
  useEffect(() => {
    if (selectedService && currentStep > 0) {
      setCurrentStep(0);
    }
  }, [selectedService]);

  useEffect(() => {
    if (liveRegionRef.current && STEPS.length > 0) {
      liveRegionRef.current.textContent = `Step ${currentStep + 1} of ${STEPS.length}: ${STEPS[currentStep]?.title || ''}`;
    }
  }, [currentStep, STEPS]);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, [currentStep]);

  const getStepFields = (stepIndex) => {
    if (!selectedService || !STEPS[stepIndex]) return [];
    
    const stepId = STEPS[stepIndex].id;
    const fields = [];

    if (stepId === 'service') {
      fields.push('service');
    } else if (stepId === 'basics' && selectedService === 'workshop') {
      fields.push('focus', 'attendees', 'duration');
    } else if (stepId === 'event' && selectedService === 'speaking') {
      fields.push('eventType', 'topic', 'duration');
    } else if (stepId === 'audience' && selectedService === 'speaking') {
      fields.push('audienceSize', 'audienceLevel');
    } else if (stepId === 'curriculum' && selectedService === 'course') {
      fields.push('subject', 'level', 'duration');
    } else if (stepId === 'format' && selectedService === 'course') {
      fields.push('delivery', 'groupSize');
    } else if (stepId === 'project' && selectedService === 'collaboration') {
      fields.push('projectType', 'industry');
    } else if (stepId === 'scope' && selectedService === 'collaboration') {
      fields.push('deliverables');
    } else if (stepId === 'timeline' && selectedService === 'collaboration') {
      fields.push('urgency');
    } else if (stepId === 'logistics') {
      fields.push('location', 'date');
      if (watchedValues.location === 'On-site') {
        fields.push('city');
      }
    } else if (stepId === 'contact') {
      fields.push('contact.name', 'contact.email');
    }

    return fields;
  };

  const validateCurrentStep = async () => {
    const fieldsToValidate = getStepFields(currentStep);
    if (fieldsToValidate.length === 0) return true;

    const result = await trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (currentStep < STEPS.length - 1) {
      setSlideDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setSlideDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex) => {
    setSlideDirection(stepIndex > currentStep ? 1 : -1);
    setCurrentStep(stepIndex);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Process attachments to base64
      const processedAttachments = await Promise.all(
        (data.attachments || []).map(async (file) => {
          if (file instanceof File) {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                resolve({
                  name: file.name,
                  size: file.size,
                  mimeType: file.type,
                  contentBase64: base64
                });
              };
              reader.readAsDataURL(file);
            });
          }
          return file; // Already processed
        })
      );

      const payload = {
        service: data.service,
        ...(selectedService === 'workshop' && {
          focus: data.focus,
          attendees: data.attendees,
          duration: data.duration
        }),
        ...(selectedService === 'speaking' && {
          eventType: data.eventType,
          topic: data.topic,
          duration: data.duration,
          audienceSize: data.audienceSize,
          audienceLevel: data.audienceLevel
        }),
        ...(selectedService === 'course' && {
          subject: data.subject,
          level: data.level,
          duration: data.duration,
          delivery: data.delivery,
          groupSize: data.groupSize
        }),
        ...(selectedService === 'collaboration' && {
          projectType: data.projectType,
          industry: data.industry,
          budget: data.budget,
          deliverables: data.deliverables,
          urgency: data.urgency
        }),
        location: data.location,
        city: data.city || '',
        date: data.date,
        requirements: data.requirements || '',
        needsDeck: data.needsDeck || false,
        attachments: processedAttachments,
        contact: data.contact,
        message: data.message || ''
      };

      await submitBooking(payload);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
      e.preventDefault();
      nextStep();
    }
    if (e.key === 'Escape' && submitError) {
      setSubmitError('');
    }
  };

  if (submitSuccess) {
    const serviceType = serviceTypes.find(s => s.id === selectedService);
    return (
      <div className={styles.container}>
        <motion.div 
          className={styles.successCard}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          role="alert"
          aria-live="polite"
        >
          <h2>Thanks! Your {serviceType?.title.toLowerCase() || 'booking'} request has been submitted</h2>
          <p>I'll get back to you soon.</p>
        </motion.div>
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
          <BookingStepCard
            ref={cardRef}
            title="What would you like to book?"
            subtitle="Choose the service you'd like to book."
            icon=""
          >
            <StepIntent register={register} errors={errors} setValue={setValue} />
          </BookingStepCard>
        </form>
      </div>
    );
  }

  const currentStepData = STEPS[currentStep];
  if (!currentStepData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }} />
        <span className={styles.progressText}>
          Step {currentStep + 1} of {STEPS.length}
        </span>
      </div>

      <div 
        ref={liveRegionRef}
        className={styles.srOnly}
        aria-live="polite"
        aria-atomic="true"
      />

      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ 
              opacity: 0, 
              x: slideDirection * 100,
              scale: 0.95,
              y: 20
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: 1,
              y: 0
            }}
            exit={{ 
              opacity: 0, 
              x: slideDirection * -100,
              scale: 0.95,
              y: -20
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <BookingStepCard
              ref={cardRef}
              title={currentStepData.title}
              subtitle={getStepSubtitle(currentStepData.id, selectedService)}
              icon={currentStepData.icon}
            >
              {renderStepContent(currentStepData.id, selectedService, register, errors, watch, setValue, watchedValues, goToStep, STEPS)}
            </BookingStepCard>
          </motion.div>
        </AnimatePresence>

        <div className={styles.navigation}>
          {currentStep > 0 && (
            <button type="button" onClick={prevStep} className={styles.btnSecondary}>
              ← Previous
            </button>
          )}
          
          {currentStep < STEPS.length - 1 ? (
            <button type="button" onClick={nextStep} className={styles.btnPrimary}>
              Next →
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={styles.btnPrimary}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          )}
        </div>

        {submitError && (
          <div className={styles.error} role="alert">
            {submitError}
            <button type="button" onClick={() => setSubmitError('')} className={styles.errorClose}>
              ×
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

// Helper function to get step subtitle
function getStepSubtitle(stepId, serviceType) {
  const subtitles = {
    service: "Choose the service you'd like to book.",
    basics: "Tell us about your workshop needs.",
    event: "Tell us about your speaking event.",
    audience: "Help us understand your audience.",
    curriculum: "Define your training curriculum.",
    format: "Choose your preferred format.",
    project: "Tell us about your project.",
    scope: "Define the project scope.",
    timeline: "When do you need this?",
    logistics: "Where and when should this take place?",
    requirements: "Any additional requirements or materials?",
    contact: "How can we reach you?",
    review: "Please review your booking details before submitting."
  };
  return subtitles[stepId] || "Please fill in the required information.";
}

// Render step content based on step ID and service type
function renderStepContent(stepId, serviceType, register, errors, watch, setValue, watchedValues, goToStep, steps) {
  if (stepId === 'service') {
    return <StepIntent register={register} errors={errors} setValue={setValue} />;
  }
  
  if (stepId === 'basics' && serviceType === 'workshop') {
    return <StepBasics register={register} errors={errors} questions={serviceQuestions.workshop.basics} />;
  }
  
  if (stepId === 'event' && serviceType === 'speaking') {
    return <StepEvent register={register} errors={errors} questions={serviceQuestions.speaking.event} />;
  }
  
  if (stepId === 'audience' && serviceType === 'speaking') {
    return <StepAudience register={register} errors={errors} questions={serviceQuestions.speaking.audience} />;
  }
  
  if (stepId === 'curriculum' && serviceType === 'course') {
    return <StepCurriculum register={register} errors={errors} questions={serviceQuestions.course.curriculum} />;
  }
  
  if (stepId === 'format' && serviceType === 'course') {
    return <StepFormat register={register} errors={errors} questions={serviceQuestions.course.format} />;
  }
  
  if (stepId === 'project' && serviceType === 'collaboration') {
    return <StepProject register={register} errors={errors} questions={serviceQuestions.collaboration.project} />;
  }
  
  if (stepId === 'scope' && serviceType === 'collaboration') {
    return <StepScope register={register} errors={errors} questions={serviceQuestions.collaboration.scope} />;
  }
  
  if (stepId === 'timeline' && serviceType === 'collaboration') {
    return <StepTimeline register={register} errors={errors} questions={serviceQuestions.collaboration.timeline} />;
  }
  
  if (stepId === 'logistics') {
    return <StepLogistics register={register} errors={errors} watch={watch} />;
  }
  
  if (stepId === 'requirements') {
    return <StepRequirements register={register} errors={errors} setValue={setValue} watchedValues={watchedValues} />;
  }
  
  if (stepId === 'contact') {
    return <StepContact register={register} errors={errors} watch={watch} />;
  }
  
  if (stepId === 'review') {
    return <BookingSummary data={watchedValues} onEdit={goToStep} />;
  }
  
  return null;
}

// Step Components
function StepIntent({ register, errors, setValue }) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>What would you like to book?</legend>
      <div className={styles.radioGroup} role="group">
        {serviceTypes.map(service => (
          <label 
            key={service.id} 
            className={styles.radioTile}
          >
            <input
              type="radio"
              value={service.id}
              {...register('service', { required: 'Please select a service' })}
              onChange={(e) => {
                register('service').onChange(e);
                setValue('service', e.target.value);
              }}
            />
            <div>
              <span className={styles.radioTitle}>{service.title}</span>
              <span className={styles.radioDescription}>{service.description}</span>
            </div>
          </label>
        ))}
      </div>
      {errors.service && <span className={styles.errorText}>{errors.service.message}</span>}
    </fieldset>
  );
}

function StepBasics({ register, errors, questions }) {
  return (
    <div className={styles.stepContent}>
      {questions.map((question, idx) => (
        <fieldset key={idx} className={styles.fieldset}>
          <legend className={styles.legend}>{question.label}</legend>
          <div className={styles.radioGroup} role="group">
            {question.options.map(option => (
              <label key={option} className={styles.radioTile}>
                <input
                  type="radio"
                  value={option}
                  {...register(question.name, { 
                    required: question.required ? `${question.label} is required` : false 
                  })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors[question.name] && (
            <span className={styles.errorText}>{errors[question.name].message}</span>
          )}
        </fieldset>
      ))}
    </div>
  );
}

function StepEvent({ register, errors, questions }) {
  return (
    <div className={styles.stepContent}>
      {questions.map((question, idx) => {
        if (question.type === 'radio') {
          return (
            <fieldset key={idx} className={styles.fieldset}>
              <legend className={styles.legend}>{question.label}</legend>
              <div className={styles.radioGroup} role="group">
                {question.options.map(option => (
                  <label key={option} className={styles.radioTile}>
                    <input
                      type="radio"
                      value={option}
                      {...register(question.name, { 
                        required: question.required ? `${question.label} is required` : false 
                      })}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {errors[question.name] && (
                <span className={styles.errorText}>{errors[question.name].message}</span>
              )}
            </fieldset>
          );
        }
        if (question.type === 'text') {
          return (
            <div key={idx} className={styles.inputGroup}>
              <label htmlFor={question.name} className={styles.label}>{question.label} *</label>
              <input
                id={question.name}
                type="text"
                className={styles.input}
                placeholder={question.placeholder}
                {...register(question.name, { 
                  required: question.required ? `${question.label} is required` : false 
                })}
              />
              {errors[question.name] && (
                <span className={styles.errorText}>{errors[question.name].message}</span>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function StepAudience({ register, errors, questions }) {
  return (
    <div className={styles.stepContent}>
      {questions.map((question, idx) => (
        <fieldset key={idx} className={styles.fieldset}>
          <legend className={styles.legend}>{question.label}</legend>
          <div className={styles.radioGroup} role="group">
            {question.options.map(option => (
              <label key={option} className={styles.radioTile}>
                <input
                  type="radio"
                  value={option}
                  {...register(question.name, { 
                    required: question.required ? `${question.label} is required` : false 
                  })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors[question.name] && (
            <span className={styles.errorText}>{errors[question.name].message}</span>
          )}
        </fieldset>
      ))}
    </div>
  );
}

function StepCurriculum({ register, errors, questions }) {
  return (
    <div className={styles.stepContent}>
      {questions.map((question, idx) => (
        <fieldset key={idx} className={styles.fieldset}>
          <legend className={styles.legend}>{question.label}</legend>
          <div className={styles.radioGroup} role="group">
            {question.options.map(option => (
              <label key={option} className={styles.radioTile}>
                <input
                  type="radio"
                  value={option}
                  {...register(question.name, { 
                    required: question.required ? `${question.label} is required` : false 
                  })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors[question.name] && (
            <span className={styles.errorText}>{errors[question.name].message}</span>
          )}
        </fieldset>
      ))}
    </div>
  );
}

function StepFormat({ register, errors, questions }) {
  return (
    <div className={styles.stepContent}>
      {questions.map((question, idx) => (
        <fieldset key={idx} className={styles.fieldset}>
          <legend className={styles.legend}>{question.label}</legend>
          <div className={styles.radioGroup} role="group">
            {question.options.map(option => (
              <label key={option} className={styles.radioTile}>
                <input
                  type="radio"
                  value={option}
                  {...register(question.name, { 
                    required: question.required ? `${question.label} is required` : false 
                  })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors[question.name] && (
            <span className={styles.errorText}>{errors[question.name].message}</span>
          )}
        </fieldset>
      ))}
    </div>
  );
}

function StepProject({ register, errors, questions }) {
  return (
    <div className={styles.stepContent}>
      {questions.map((question, idx) => {
        if (question.type === 'radio') {
          return (
            <fieldset key={idx} className={styles.fieldset}>
              <legend className={styles.legend}>{question.label}</legend>
              <div className={styles.radioGroup} role="group">
                {question.options.map(option => (
                  <label key={option} className={styles.radioTile}>
                    <input
                      type="radio"
                      value={option}
                      {...register(question.name, { 
                        required: question.required ? `${question.label} is required` : false 
                      })}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {errors[question.name] && (
                <span className={styles.errorText}>{errors[question.name].message}</span>
              )}
            </fieldset>
          );
        }
        if (question.type === 'text') {
          return (
            <div key={idx} className={styles.inputGroup}>
              <label htmlFor={question.name} className={styles.label}>{question.label} *</label>
              <input
                id={question.name}
                type="text"
                className={styles.input}
                placeholder={question.placeholder}
                {...register(question.name, { 
                  required: question.required ? `${question.label} is required` : false 
                })}
              />
              {errors[question.name] && (
                <span className={styles.errorText}>{errors[question.name].message}</span>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function StepScope({ register, errors, questions }) {
  return (
    <div className={styles.stepContent}>
      {questions.map((question, idx) => {
        if (question.type === 'radio') {
          return (
            <fieldset key={idx} className={styles.fieldset}>
              <legend className={styles.legend}>{question.label}</legend>
              <div className={styles.radioGroup} role="group">
                {question.options.map(option => (
                  <label key={option} className={styles.radioTile}>
                    <input
                      type="radio"
                      value={option}
                      {...register(question.name, { 
                        required: question.required ? `${question.label} is required` : false 
                      })}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {errors[question.name] && (
                <span className={styles.errorText}>{errors[question.name].message}</span>
              )}
            </fieldset>
          );
        }
        if (question.type === 'textarea') {
          return (
            <div key={idx} className={styles.inputGroup}>
              <label htmlFor={question.name} className={styles.label}>{question.label} *</label>
              <textarea
                id={question.name}
                className={styles.textarea}
                rows="4"
                placeholder={question.placeholder}
                {...register(question.name, { 
                  required: question.required ? `${question.label} is required` : false 
                })}
              />
              {errors[question.name] && (
                <span className={styles.errorText}>{errors[question.name].message}</span>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function StepTimeline({ register, errors, questions }) {
  return (
    <div className={styles.stepContent}>
      {questions.map((question, idx) => (
        <fieldset key={idx} className={styles.fieldset}>
          <legend className={styles.legend}>{question.label}</legend>
          <div className={styles.radioGroup} role="group">
            {question.options.map(option => (
              <label key={option} className={styles.radioTile}>
                <input
                  type="radio"
                  value={option}
                  {...register(question.name, { 
                    required: question.required ? `${question.label} is required` : false 
                  })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors[question.name] && (
            <span className={styles.errorText}>{errors[question.name].message}</span>
          )}
        </fieldset>
      ))}
    </div>
  );
}

function StepLogistics({ register, errors, watch }) {
  const location = watch('location');
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.stepContent}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Location</legend>
        <div className={styles.radioGroup} role="group">
          {['Online', 'On-site'].map(option => (
            <label key={option} className={styles.radioTile}>
              <input
                type="radio"
                value={option}
                {...register('location', { required: 'Please select location type' })}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.location && <span className={styles.errorText}>{errors.location.message}</span>}
      </fieldset>

      {location === 'On-site' && (
        <div className={styles.inputGroup}>
          <label htmlFor="city" className={styles.label}>City</label>
          <input
            id="city"
            type="text"
            className={styles.input}
            {...register('city', { required: location === 'On-site' ? 'City is required for on-site events' : false })}
          />
          {errors.city && <span className={styles.errorText}>{errors.city.message}</span>}
        </div>
      )}

      <div className={styles.inputGroup}>
        <label htmlFor="date" className={styles.label}>Preferred date</label>
        <input
          id="date"
          type="date"
          min={today}
          className={styles.input}
          {...register('date', { 
            required: 'Please select a date',
            validate: value => value >= today || 'Date cannot be in the past'
          })}
        />
        <small className={styles.helpText}>Please include timezone if outside your country.</small>
        {errors.date && <span className={styles.errorText}>{errors.date.message}</span>}
      </div>
    </div>
  );
}

function StepRequirements({ register, errors, setValue, watchedValues }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.inputGroup}>
        <label htmlFor="requirements" className={styles.label}>Any special requirements or tools?</label>
        <textarea
          id="requirements"
          className={styles.textarea}
          rows="4"
          placeholder="Optional: describe any specific tools, setup, or requirements..."
          {...register('requirements')}
        />
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Do you need a presentation deck or materials prepared?</legend>
        <div className={styles.radioGroup} role="group">
          {[{ value: true, label: 'Yes' }, { value: false, label: 'No' }].map(option => (
            <label key={option.value} className={styles.radioTile}>
              <input
                type="radio"
                value={option.value}
                {...register('needsDeck')}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <FileUpload
        onFilesChange={(files) => setValue('attachments', files)}
        files={watchedValues.attachments}
      />
    </div>
  );
}

function StepContact({ register, errors, watch }) {
  const preferredContact = watch('contact.preferredContact');

  return (
    <div className={styles.stepContent}>
      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>Full Name *</label>
        <input
          id="name"
          type="text"
          className={styles.input}
          {...register('contact.name', { required: 'Full name is required' })}
        />
        {errors.contact?.name && <span className={styles.errorText}>{errors.contact.name.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Email Address *</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          {...register('contact.email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.contact?.email && <span className={styles.errorText}>{errors.contact.email.message}</span>}
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Preferred contact method</legend>
        <div className={styles.radioGroup} role="group">
          {['Email', 'WhatsApp', 'Other'].map(option => (
            <label key={option} className={styles.radioTile}>
              <input
                type="radio"
                value={option}
                {...register('contact.preferredContact')}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {preferredContact === 'Other' && (
        <div className={styles.inputGroup}>
          <label htmlFor="preferredContactOther" className={styles.label}>Please specify</label>
          <input
            id="preferredContactOther"
            type="text"
            className={styles.input}
            {...register('contact.preferredContactOther')}
          />
        </div>
      )}

      <div className={styles.inputGroup}>
        <label htmlFor="message" className={styles.label}>Additional message</label>
        <textarea
          id="message"
          className={styles.textarea}
          rows="4"
          placeholder="Optional: any additional information or questions..."
          {...register('message')}
        />
      </div>
    </div>
  );
}