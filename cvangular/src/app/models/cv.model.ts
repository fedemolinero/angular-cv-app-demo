export interface resumeDataModel {
    userFirstName: string;
    userLastName: string;
    userHeading: string;
    userEmail: string;
    userAddress: string;
    userPhoneNumber: string;
    id: number;
    resumeId: number;
    uuid: string;
    templateId: number;
    cvName: string;
    inReview: boolean;
    isShared: boolean;
    updatedAfterReview: boolean;
    createdAt: string;
    updatedAt: string;
    templateUrl: string;
    activeReviewId: number;
    inAiReview: boolean;
    reviewDone: boolean;
    userReviewFeedbackDone: boolean;
    awards: [],
    certifications: Certifications[],
    education: Education[],
    work: Work[],
    projects: [],
    skills: Skills[],
    links: Links[],
    user: UserCV
    userId: number;
    review: null
}


export interface Certifications {
    id: number
    description: string;
    issuedBy: string;
    url: string;
    sortOrderId: number;
    resumeId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Education {
    id: number;
    degree: string;
    startDate: string;
    completionDate: string;
    institution: string;
    location: string;
    score: number;
    scoreType: number;
    studyType: string;
    sortOrderId: number;
    resumeId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Work {
    id: number;
    description: string;
    endDate: string;
    currentJob: boolean;
    role: string;
    location: string;
    company: string;
    startDate: string;
    sortOrderId: number;
    resumeId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Skills {
    id: number;
    skillType: string;
    skillValues: string[],
    resumeId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Links {
    id: number;
    network: string;
    username: string;
    url: string;
    resumeId: number;
    createdAt: string;
    updatedAt: string;
}


export interface UserCV {
    id: number;
    uid: number;
    name: string;
    role: string;
    companyName: string;
    lastActiveToken: string;
    createdAt: string;
    updatedAt: string;
    lastNotificationCheck: string;
    incompleteResumeEmailCount: number;
    reviewer: boolean;
    reviewCredits: number;
    uploadCredits: number;
    reviewOnboardingDone: boolean;
    hacker_id: number;
    username: string;
    email: string;
    secondary_emails: [],
    banners: {},
    credits: {
        uploadCredits: number;
        reviewCredits: number;
    },
    existingResume: {}
}