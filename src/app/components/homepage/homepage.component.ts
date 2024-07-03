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
  }

  startUpdatingRole(): void {
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
