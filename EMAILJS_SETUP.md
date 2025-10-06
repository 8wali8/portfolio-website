# EmailJS Setup Instructions

To make the contact form work, you need to set up EmailJS and configure your environment variables.

## 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Set the template settings:
   - **To Email**: your-email@gmail.com (where you want to receive messages)
   - **From Name**: {{from_name}}
   - **Reply To**: {{from_email}}
5. Save and note down your **Template ID**

## 4. Get Public Key
1. Go to "Account" → "General" in your EmailJS dashboard
2. Find your **Public Key** (User ID)

## 5. Configure Environment Variables
1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id  
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## 6. Test the Form
1. Run your development server: `npm run dev`
2. Fill out the contact form and submit
3. Check your email for the message
4. Check the browser console for any errors

## Troubleshooting
- Make sure all environment variables are set correctly
- Check that your email service is properly configured in EmailJS
- Verify your template matches the form field names: `from_name`, `from_email`, `message`
- Check the browser console for error messages

## Security Notes
- Never commit your `.env` file to git
- Your public key is safe to expose (it's meant to be public)
- Consider setting up domain restrictions in EmailJS for production