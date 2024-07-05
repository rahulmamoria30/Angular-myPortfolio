import { Component } from '@angular/core';
import { ThemeService } from 'src/app/theme.service';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  expandedSection: string = '';
  darkMode=false;
  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.themeService.darkMode$.subscribe(darkMode => {
      this.darkMode = darkMode;
    });
  }

  toggleDetails(sectionId: string): void {
    this.expandedSection = (this.expandedSection === sectionId) ? '' : sectionId;
  }
}
