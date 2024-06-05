export interface Person {
    name: string;
    secondName: string;
    lastname: string;
    city: string;
    position: string;
    aboutDescriptions: PersonalDescriptions[];
    jobs: Job[];
    studies: Studies[];
    languages: Languages[];
    courses: Courses[];
}

export interface Job {
    id: string;
    companyName: string;
    companyLogo: string;
    jobTitle: string;
    worktime: string;
    jobPlace: string;
    jobType: string;
    jobRange: string;
    jobDescription1: string;
    jobDescription2: string;
    jobDescription3: string;
    jobDescription4: string;
    jobDescription5: string;
    workAptitudes: string[];
}

export interface Studies {
    studyName: string;
    studyLogo: string;
    studyTitle: string;
    studyTime: string;
    studyPlace: string;
    studyType: string;
    studyDescription1: string;
}

export interface Languages {
    langName: string;
    proficiency: string;
}

export interface Courses {
    courseName: string;
    courseLogo: string;
    courseTitle: string;
    courseTime: string;
    courseType: string;
}

export interface PersonalDescriptions {
    description: string;
    icon: string;
}

