import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {
  darkMode = false; // Default dark mode is false (light mode)
  navVisible: boolean = false;
  activeLinkId: string = 'nav-home'; // Default active link id
  roles: string[] = ["Developer", "Software Engineer", "Designer"]; // Array of roles
  currentRoleIndex: number = 0; // Index for current role in roles array
  private intervalId: any; // Interval ID for role updating
  displayedRole: string = ''; // Currently displayed role
  navItems = [ // Navigation items array
    { id: 'nav-home', section: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'nav-about', section: 'about', label: 'About', icon: 'fas fa-user' },
    { id: 'nav-resume', section: 'resume', label: 'Experiences', icon: 'fas fa-file-alt' },
    { id: 'nav-projects', section: 'projects', label: 'Projects', icon: 'fas fa-briefcase' },
    { id: 'nav-contact', section: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];
  private observer: IntersectionObserver | null = null; // Intersection observer instance

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.setActive('nav-home'); // Initialize active link
    this.startUpdatingRole(); // Start updating role periodically
    this.themeService.darkMode$.subscribe(darkMode => {
      this.darkMode = darkMode; // Subscribe to dark mode changes
    });
  }

  ngAfterViewInit(): void {
    this.initIntersectionObserver(); // Initialize intersection observer after view initialized
  }

  ngOnDestroy(): void {
    this.stopUpdatingRole(); // Stop updating role on component destroy
    if (this.observer) {
      this.observer.disconnect(); // Disconnect intersection observer
    }
  }

  setActive(id: string) {
    this.activeLinkId = id; // Set active link by ID
  }

  toggleNav(){
    this.navVisible = !this.navVisible;
    console.log("clickeddd");
    
  }

  startUpdatingRole(): void {
    this.displayedRole = this.roles[this.currentRoleIndex]; // Initialize displayed role
    this.intervalId = setInterval(() => {
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length; // Update role index cyclically
      this.displayedRole = this.roles[this.currentRoleIndex]; // Update displayed role
    }, 3000); // Update role every 3 seconds
  }

  stopUpdatingRole(): void {
    clearInterval(this.intervalId); // Clear interval for role updating
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode; // Toggle dark mode
    this.themeService.setDarkMode(this.darkMode); // Set dark mode in theme service
  }

  setTheme(theme: 'dark' | 'light'): void {
    this.darkMode = theme === 'dark'; // Set dark mode based on theme parameter
    this.themeService.setDarkMode(this.darkMode); // Set dark mode in theme service
  }

  
  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId); // Get section element by ID
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Scroll to section smoothly
    }
  }

  initIntersectionObserver(): void {
    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.3 // Trigger when 30% of section is visible
    };

    this.observer = new IntersectionObserver(this.handleIntersections.bind(this), options); // Initialize intersection observer

    this.navItems.forEach(item => {
      const section = document.getElementById(item.section); // Get section element by section name
      if (section) {
        this.observer!.observe(section); // Observe section with non-null assertion
      }
    });
  }

  handleIntersections(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const visibleSectionId = this.navItems.find(item => item.section === entry.target.id)?.id; // Find visible section ID
        if (visibleSectionId) {
          this.setActive(visibleSectionId); // Set active link based on visible section
        }
      }
    });
 
  }

  
}
