import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  expandedSection: string = '';

  toggleDetails(sectionId: string): void {
    this.expandedSection = (this.expandedSection === sectionId) ? '' : sectionId;
  }
}
