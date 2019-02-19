import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { CitiesService } from '../cities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: 'city.page.html',
  styleUrls: ['city.page.scss']
})
export class CityPage implements OnInit {
  
  sliderConfig = {
    slidesPerView: 1.2
  };

  cities: any = [];
  events: any = [];
  
  constructor(private citiesService: CitiesService, private eventsService: EventsService, private router: Router) {}

  ngOnInit() {
    this.citiesService
      .fetchFeed('cities')
      .subscribe(data => {
        this.cities = data;
      })

    this.eventsService
      .fetchFeed('events')
      .subscribe(data => {
        this.events = data;
      })
  }

  showDetails(event) {
    this.eventsService.currentEvent = event;
    this.router.navigate(['/details']);
  }
}
