import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events-by-category',
  templateUrl: './events-by-category.page.html',
  styleUrls: ['./events-by-category.page.scss'],
})
export class EventsByCategoryPage implements OnInit {
  events: any = [];
  category: any;

  constructor(private categoriesService: CategoriesService, private eventsService: EventsService) { }

  ngOnInit() {
    this.category = this.categoriesService.currentCategory;

    this.eventsService
      .fetchFeed(`events?category=${this.category}`)
      .subscribe(data => {
        this.events = data;
      })
  }
}
