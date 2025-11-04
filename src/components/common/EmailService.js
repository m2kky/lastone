import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  templateId: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  publicKey: 'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

export const sendEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'غير محدد',
      subject: formData.subject,
      message: formData.message,
      to_name: 'Muhammed Mekky'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    return {
      success: true,
      message: 'تم إرسال الرسالة بنجاح! سأتواصل معك قريباً.',
      data: response
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
      error: error
    };
  }
};

export const sendNewsletterSubscription = async (email) => {
  try {
    const templateParams = {
      subscriber_email: email,
      to_name: 'Muhammed Mekky'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'newsletter_template', // You'll need to create this template
      templateParams
    );

    return {
      success: true,
      message: 'تم الاشتراك في النشرة البريدية بنجاح!',
      data: response
    };
  } catch (error) {
    console.error('Newsletter Subscription Error:', error);
    return {
      success: false,
      message: 'حدث خطأ في الاشتراك. يرجى المحاولة مرة أخرى.',
      error: error
    };
  }
};