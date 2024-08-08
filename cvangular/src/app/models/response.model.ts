// Defines interface to object Response

export interface ResponseModel {
  token: string;
}

export interface ResumeModel {
  resumeId: number;
  cvName: string;
}

export interface cvIdsModel {
  cvIds: number[];
}


export interface createNewCVModel {
  message: string;
  newId: string;
}

export interface Menu {
  id: number;
  name: string;
  link: string;
}