import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_KEY!);

const emailConfig = {
  from: "flexxitedev@gmail.com",
  name: "trackmycare",
};

const TEMPLATES = {
  otpCode: "",
};

async function sendEmail(email: string, templateId: string, data: any) {
  const msg: sgMail.MailDataRequired = {
    ...emailConfig,
    to: email,
    templateId: templateId,
    dynamicTemplateData: { ...data },
  };
  await sgMail.send(msg).catch((error) => {
    console.error(error);
  });
}

const otpCode = async (email: string, data: { otp: number }) => {
  return await sendEmail(email, TEMPLATES.otpCode, data);
};

export const emails = {
  otpCode,
};
