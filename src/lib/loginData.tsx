import {
  Stethoscope,
  Bot,
  Users,
  Microscope,
  Activity,
} from "lucide-react";

export const featuresData = {
  patient: [
    {
      icon: <Stethoscope className="h-6 w-6" />,
      title: "Book Appointments",
      description: "Easily set up and keep real-time track of your doctor appointments",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "Personalised Chatbot",
      description: "Get quick answers, tips, and friendly reminders",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Space",
      description: "Connect, share, and support each other's journey",
    },
  ],
  doctor: [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Patient Management",
      description: "Keep all your patient details and record in one easy place.",
    },
    {
      icon: <Microscope className="h-6 w-6" />,
      title: "Tumor Detection",
      description: "Smart scans to help spot tumors quickly and easily.",
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Analytics",
      description: "See clear trends in treatments and track real progress.",
    },
  ],
};

export const testimonialsData = {
  patient: {
    quote:
      "This Platform has completely transformed how I manage my health. The reminders and analytics have helped me stay on track with my medications and appointments.",
    name: "Sarah Johnson",
    title: "Patient • 2 years",
  },
  doctor: {
    quote:
      "This platform streamlines my practice workflow and improves patient communication. I can monitor patient adherence and provide timely interventions when needed.",
    name: "Dr. James Wilson",
    title: "Cardiologist • 3 years",
  },
};