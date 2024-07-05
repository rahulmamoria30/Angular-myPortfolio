import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/theme.service';
import skillsData from '../skill-data';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  darkMode = false;
  skills = skillsData;
  
  @Input() skill:any;
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe(darkMode => {
      this.darkMode = darkMode;
    });
  }
  
}
