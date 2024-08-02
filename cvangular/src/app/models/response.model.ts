// Define una interfaz para el objeto response
export interface ResponseModel {
  token: string;
}


// Define una interfaz para el objeto response
export interface ResumeModel {
  resumeId: number;
  cvName: string;
}

export interface cvIdsModel {
  cvIds: string[];
}


export interface createNewCVModel {
  message: string;
  newId: string;
}
