export interface Service {
  id: string;
  title: string;
  estimate: string;
  description: string;
  bullets: string[];
  image: string;
  icon: string;
  details: string;
  specs: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'Site Work' | 'Underground Pipe' | 'Material Sales';
  image: string;
  location: string;
  date: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  stars: number;
  avatar: string;
}

export interface BookingProposal {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  scale: string;
  notes: string;
}
