export interface Lab {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  sec: string;
  subject: string;
  labcode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Question {
  _id: string;
  title: string;
  description: string;
  labId: string;
  exInput: string;
  exOutput: string;
}
