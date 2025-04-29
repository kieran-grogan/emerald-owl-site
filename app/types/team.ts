export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: {
    url: string;
    alt: string;
  };
  specialties: string[];
  contact: string;
}

export interface TeamPageContent {
  title: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  content: {
    main_text: string;
    sections: any[];
  };
  featured_image: {
    type: string;
    url: string;
    alt: string;
    width: string;
    height: string;
  };
  standardized_sections: {
    id: string;
    title: string;
    content: string;
    className: string;
    media: any[];
  }[];
  content_type: string;
  url: string;
  route: string;
  resources: {
    type: string;
    url: string;
    alt: string;
    width: string;
    height: string;
  }[];
}

export interface BehindTheScenesImage {
  url: string;
  alt: string;
  width: number;
  height: number;
} 