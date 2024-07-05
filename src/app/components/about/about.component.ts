import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/theme.service';
import skillsData from './skill-data';

@Component({
  selector: 'app-about',

  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  darkMode = false;
  skills =skillsData;

  @Input() skill:any;
  
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe(darkMode => {
      this.darkMode = darkMode;
    });
  }
}
