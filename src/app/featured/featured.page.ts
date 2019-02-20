import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured',
  templateUrl: 'featured.page.html',
  styleUrls: ['featured.page.scss']
})
export class FeaturedPage implements OnInit {

  sliderConfig = {
    slidesPerView: 1.2
  };

  featuredEvents: any = [];
  trendingEvents: any = [];

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit() {
    this.eventsService
      .fetchFeed('events?featured=1')
      .subscribe(data => {
        this.featuredEvents = data;
      })

    this.eventsService
      .fetchFeed('events?trending=1')
      .subscribe(data => {
        this.trendingEvents = data;
      })
  }

    showDetails(event) {
        this.eventsService.currentEvent = event;
        this.router.navigate(['/details']);
    }
}
