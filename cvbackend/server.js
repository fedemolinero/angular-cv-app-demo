const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

const cvs = [];

const personalData = {
  name: 'Federico',
  secondName: 'Martin',
  lastname: 'Molinero',
  city: 'Rosario, Argentina',
  position: 'Frontend Developer',
  aboutDescriptions: [
    {
      description: 'Experienced tech professional proficient in full-stack web development, application support, and user management platforms.',
      icon: 'bi bi-person-circle'
    },
    {
      description: 'Skilled in front end development building responsive, interactive designs adhering to web accessibility guidelines.',
      icon: 'bi bi-briefcase'
    },
    {
      description: 'Proficient in leading teams and deploying applications on cloud platforms like Azure and AWS.',
      icon: 'bi bi-award'
    }, {
      description: 'Passionate about leveraging technology to drive innovation and enhance user experiences.',
      icon: 'bi bi-journal-text'
    },
  ],
  jobs: [{
    companyName: 'Globant',
    companyLogo: '../assets/globant_logo.jpg',
    jobTitle: 'Web User Interface Developer',
    worktime: 'jun. 2019 - sept. 2023 · (4 yr 4 mo)',
    jobPlace: 'Rosario, Santa Fe, Argentina',
    jobType: 'Hybrid',
    jobRange: 'Full time',
    jobDescription1: 'Full-stack web development, application support, and user management platforms.',
    jobDescription2: 'UI design and development following custom models, with a focus on building responsive, interactive designs adhering to web accessibility guidelines.',
    jobDescription3: 'Implementing and maintaining scalable and performant Angular-based frontends, utilizing web technologies and agile methodologies with distributed teams globally.',
    jobDescription4: 'APIs interacting, conducting research for new development solutions, and contributing to collaborative software development.',
    jobDescription5: 'At Globant, I had the privilege of serving esteemed global enterprises, including leading firms such as EY and PwC. I crafted innovative, bespoke solutions tailored to meet their unique needs, contributing to their business success in a dynamic and competitive landscape',
    workAptitudes: [
      'Web Design',
      'Node.js',
      'Angular',
      'Javascript',
      'Typescript',
      'Cascading Style Sheets (CSS)',
      'Angular Material',
      'Bootstrap',
      'HTML5',
      'Cloud Computing',
      'NPM',
      'GIT',
      'Agile Methodologies',
      'Waterfall',
      'Databases',
      'Microsoft Azure',
      'Azure DevOps',
      'API',
      'JSON',
    ]
  },
  {
    companyName: 'Accenture',
    companyLogo: '../assets/accenture_logo.jpg',
    jobTitle: 'Data Engineering Analyst',
    worktime: 'Jun 2018 - Jun 2019 · 1 yr 1 mo',
    jobPlace: 'Rosario, Santa Fe, Argentina',
    jobType: 'Hybrid',
    jobRange: 'Full time',
    jobDescription1: 'I played a key role in the development, implementation, and maintenance of applications, employing agile methodologies and collaborating closely with globally distributed teams.',
    jobDescription2: 'My tasks included optimizing databases with large data volumes and tailoring stored procedures.',
    jobDescription3: 'I showcased strong analytical skills in dissecting project requirements, resulting in the creation of web applications with interactive interfaces and responsive designs, enhancing user experiences.',
    jobDescription4: 'Furthermore, I led initiatives to improve performance across various areas, including software architecture, APIs, and web services.',
    workAptitudes: [
      'Node.js',
      'AWS',
      'GIT',
      'Cloud Computing',
      'Databases',
      'NPM',
      'Angular',
      'Javascript',
      'HTML5',
      'Cascading Style Sheets (CSS)',
      'Web Design',
      'Typescript',
      'Agile & Waterfall Methodologies',
      'API',
    ]
  },
  {
    companyName: 'MundoIT',
    companyLogo: '../assets/mundoit_logo.jpg',
    jobTitle: 'Implementation Analyst',
    worktime: 'Jun 2016 - Nov 2017 · 1 yr 6 mo',
    jobPlace: 'Rosario, Santa Fe, Argentina',
    jobType: 'On-site',
    jobRange: 'Full time',
    jobDescription1: 'Specialized in programming, development, and technical support for applications utilizing web technologies.',
    jobDescription2: 'Conducted thorough functional analyses to understand requirements.',
    jobDescription3: 'Oversaw the normalization of complex data, managed database migrations, and handled modifications and maintenance.',
    jobDescription4: 'Ensured comprehensive documentation and monitored version control to track changes effectively.',
    workAptitudes: [
      'SysAdmin',
      'PHP',
      'Cascading Style Sheets (CSS)',
      'HTML5',
      'Application Support',
      'Javascript',
      'GIT',
      'MySQL',
      'Cloud Computing',
      'Databases',
      'NPM',
      'Web Design',
      'User Management',
      'API',
    ]
  }, {
    companyName: 'Superintendencia de Riesgos del Trabajo (MTESS)',
    companyLogo: '../assets/srtargentina_logo.jpg',
    jobTitle: 'Fullstack Developer',
    worktime: 'May 2014 - Apr 2016 · 2 yrs',
    jobPlace: 'Rosario, Santa Fe, Argentina',
    jobType: 'On-site',
    jobRange: 'Full time',
    jobDescription1: 'I played a central role in the entire lifecycle of project, from analysis and design to programming, modification, and testing of application, user interfaces, ABM, widgets, statistics and documentation.',
    jobDescription2: 'Additionally, I standardized complex information, managed databases, and developed calculation procedures. I handled platform administration, user permissions, and roles. ',
    jobDescription3: 'Notably, I showcased my capacity to initiate projects from inception, exemplified by leading the development of a nationwide software solution for statistical analysis and issue tracking in the workplace.',
    workAptitudes: [
      'PHP',
      'Ubuntu',
      'Web Design',
      'User Management',
      'Javascript',
      'MySQL',
      'GIT',
      'HTML5',
      'Cascading Style Sheets (CSS)',
      'Cloud Computing',
      'Application Support',
      'SysAdmin',
      'Databases',
      'NPM',
      'API',
      'WordPress'
    ]
  },
  {
    companyName: 'IRSA CORPORATION',
    companyLogo: '../assets/irsa_logo.jpg',
    jobTitle: 'SysAdmin',
    worktime: 'Aug 2011 - Sep 2013 · 2 yrs 2 mos',
    jobPlace: 'Rosario, Santa Fe, Argentina',
    jobType: 'On-site',
    jobRange: 'Full time',
    jobDescription1: 'I managed the installation, maintenance, configuration, and control of workstations and devices, including hardware enhancements.',
    jobDescription2: 'Additionally, I administered applications and user accounts for shopping centers, overseeing system implementations across various international locations.',
    jobDescription3: 'My responsibilities encompassed incident logging, inventory management, backups, and Data Center oversight. I provided telephone and remote support to customers, ensuring seamless assistance and resolution of technical issues.',
    workAptitudes: [
      'SysAdmin',
      'User Management',
      'Application Support',
      'Databases',
      'Cloud Computing',
      'API',
    ]
  }
  ],
  studies: [
    {
      studyName: 'Universidad Tecnológica Nacional',
      studyLogo: '../assets/utn_logo.jpg',
      studyTitle: 'Computer Systems Analyst',
      studyTime: 'Mar 2010 - Present',
      studyPlace: 'Rosario, Santa Fe, Argentina',
      studyType: 'On-site',
      studyDescription1: 'I dropped out of my previous degree program during my third year and proceeded to pursue a degree in Computer Systems Analyst.',
    },
    {
      studyName: 'Universidad Nacional de Rosario',
      studyLogo: '../assets/unr_logo.jpg',
      studyTitle: 'Bachelor of Computer Science',
      studyTime: 'Mar 2006 - Dic 2009',
      studyPlace: 'Rosario, Santa Fe, Argentina',
      studyType: 'On-site',
      studyDescription1: 'I dropped out during my third year and proceeded to pursue a degree in Computer Systems Analyst.',
    },
  ],
  languages: [
    {
      langName: 'Spanish',
      proficiency: 'Native or bilingual proficiency'
    },
    {
      langName: 'English',
      proficiency: 'Full professional proficiency'
    },
    {
      langName: 'Italian',
      proficiency: 'Professional working proficiency',
    }
  ],
  courses: [
    {
      courseName: 'Creativity, Design Thinking, and Innovation for Business',
      courseLogo: '../assets/udemy_logo.jpg',
      courseTitle: 'Udemy',
      courseTime: 'Jun 2021',
      courseType: 'Online'
    },
    {
      courseName: 'Power BI A-Z: Hands-On Power BI Training for Data Science',
      courseLogo: '../assets/udemy_logo.jpg',
      courseTitle: 'Udemy',
      courseTime: 'Jun 2021',
      courseType: 'Online'
    },
    {
      courseName: 'Node.js API Masterclass With Express & MongoDB',
      courseLogo: '../assets/udemy_logo.jpg',
      courseTitle: 'Udemy',
      courseTime: 'Mar 2021',
      courseType: 'Online'
    },
    {
      courseName: 'Angular: The Complete Guide',
      courseLogo: '../assets/udemy_logo.jpg',
      courseTitle: 'Udemy',
      courseTime: 'Dec 2020',
      courseType: 'Online'
    },
    {
      courseName: 'Front-end Angular/React',
      courseLogo: '../assets/full_solutions_logo.jpg',
      courseTitle: 'FullSolutions',
      courseTime: 'May 2019',
      courseType: 'OnSite'
    },
  ]
}

app.post('/create-cv', (req, res) => {
  const cvData = req.body;
  cvs.push(cvData);
  res.status(201).send(cvData);
});

app.get('/get-cv', (req, res) => {
  res.send(personalData);
});

app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
