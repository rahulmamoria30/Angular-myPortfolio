import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent {
  @Input() item: { id: string, section: string, label: string, icon: string } = { id: '', section: '', label: '', icon: '' };
  @Input() activeLinkId: string = '';
  @Output() setActiveLink = new EventEmitter<string>();

  setActive() {
    this.setActiveLink.emit(this.item.id);
    this.scrollToSection(this.item.section);
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
}
