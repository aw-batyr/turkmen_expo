export interface FaqDataType {
  data: Datum[];
}

export interface Datum {
  header: string;
  faq_items: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RadioDataType {
  data: Datum[];
}

export interface Datum {
  id: number;
  name: string;
}
