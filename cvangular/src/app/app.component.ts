import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cvangular';



  personalData: any = {
    name: 'Federico',
    secondName: 'Martin',
    lastname: 'Molinero',
    city: 'Rosario, Argentina',
    position: 'Frontend Developer',
    job: {
      companyName: 'Globant',
      jobTitle: 'Web User Interface Developer',
      worktime: 'jun. 2019 - sept. 2023 · (4 y - 4 m)',
      jobPlace: 'Rosario, Santa Fe, Argentina',
      jobType: 'Hybrid',
      jobRange: 'Full time',
      workAptitudes: [
        'Agile Methodologies',
        'Waterfall',
        'Cascading Style Sheets (CSS)',
        'HTML5',
        'Typescript',
        'Web Design',
        'Cloud Computing',
        'GIT',
        'Angular',
        'Javascript',
        'GitHub',
        'Database',
        'Microsoft Azure',
        'Azure DevOps'
      ]
    }

  }


}
