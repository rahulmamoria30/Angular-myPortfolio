import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  activeLinkId: string = 'nav-home';
  roles: string[] = ["Developer", "Software Engineer", "Designer"];
  currentRoleIndex: number = 0;
  private intervalId: any;
  displayedRole: string = '';

  navItems = [
    { id: 'nav-home', section: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'nav-about', section: 'about', label: 'About', icon: 'fas fa-user' },
    { id: 'nav-resume', section: 'resume', label: 'Resume', icon: 'fas fa-file-alt' },
    { id: 'nav-projects', section: 'projects', label: 'Projects', icon: 'fas fa-briefcase' },
    { id: 'nav-contact', section: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.setActive('nav-home'); 
    this.startUpdatingRole(); 
  }

  ngOnDestroy(): void {
    this.stopUpdatingRole(); 
  }

  setActive(id: string) {
    this.activeLinkId = id;
    const section = this.navItems.find(item => item.id === id)?.section;
    if (section) {
      this.scrollToSection(section);
    }
  }

  startUpdatingRole(): void {
    this.displayedRole = this.roles[this.currentRoleIndex];
    this.intervalId = setInterval(() => {
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      this.displayedRole = this.roles[this.currentRoleIndex];
    }, 3000);
  }

  stopUpdatingRole(): void {
    clearInterval(this.intervalId);
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
}
