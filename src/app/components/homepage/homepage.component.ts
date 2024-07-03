import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {

  activeLinkId: string = 'nav-home';
  roles: string[] = ["Developer", "Software Engineer", "Designer"];
  currentRoleIndex: number = 0;
  private intervalId: any;
  displayedRole: string = '';

  navItems = [
    { id: 'nav-home', section: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'nav-about', section: 'about', label: 'About', icon: 'fas fa-user' },
    { id: 'nav-resume', section: 'resume', label: 'Experiences', icon: 'fas fa-file-alt' },
    { id: 'nav-projects', section: 'projects', label: 'Projects', icon: 'fas fa-briefcase' },
    { id: 'nav-contact', section: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  private observer: IntersectionObserver | null = null;

  constructor() { }

  ngOnInit(): void {
    this.setActive('nav-home'); 
    this.startUpdatingRole(); 
  }

  ngAfterViewInit(): void {
    this.initIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.stopUpdatingRole(); 
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  setActive(id: string) {
    this.activeLinkId = id;
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

  initIntersectionObserver(): void {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.3 // Trigger when 50% of the section is visible
    };

    this.observer = new IntersectionObserver(this.handleIntersections.bind(this), options);

    this.navItems.forEach(item => {
      const section = document.getElementById(item.section);
      if (section) {
        this.observer!.observe(section); // Use non-null assertion operator here
      }
    });
  }

  handleIntersections(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const visibleSectionId = this.navItems.find(item => item.section === entry.target.id)?.id;
        if (visibleSectionId) {
          this.setActive(visibleSectionId);
        }
      }
    });
  }
}
