import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-events',
  templateUrl: 'next-events.page.html',
  styleUrls: ['next-events.page.scss']
})
export class NextEventsPage implements OnInit {

  sliderConfig = {
    slidesPerView: 1.2
  };

  todayEvents: any = [];
  nextEvents: any = [];

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit() {
    this.eventsService
      .fetchFeed('events?today')
      .subscribe(data => {
        this.todayEvents = data;
      })

    this.eventsService
      .fetchFeed('events')
      .subscribe(data => {
        this.nextEvents = data;
      })
  }

  showDetails(event) {
    this.eventsService.currentEvent = event;
    this.router.navigate(['/details']);
  }
}
