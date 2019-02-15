import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  event;
  constructor(private eventService: EventsService) { }

  ngOnInit() {
    this.event = this.eventService.currentEvent;
  }

}
