import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  featuredJobs = [
    {
      title: 'Frontend Developer',
      company: 'TechNova Solutions',
      location: 'Hà Nội',
      salary: '20 - 30 triệu VNĐ',
    },
    {
      title: 'Backend Engineer',
      company: 'NextSoft Ltd',
      location: 'TP. Hồ Chí Minh',
      salary: '25 - 35 triệu VNĐ',
    },
    {
      title: 'UI/UX Designer',
      company: 'Designify Studio',
      location: 'Đà Nẵng',
      salary: '15 - 25 triệu VNĐ',
    },
  ];
}
