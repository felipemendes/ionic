import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-events',
  templateUrl: 'next-events.page.html',
  styleUrls: ['next-events.page.scss']
})
export class NextEventsPage implements OnInit {
  events: any;
  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit() {
    this.eventsService
      .fetchFeed('12fzng')
      .subscribe(data => {
        this.events = data;
      })
  }

  showDetails(event) {
    this.eventsService.currentEvent = event;
    this.router.navigate(['/details']);
  }
}
