import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {
  
  sliderConfig = {
    slidesPerView: 1.2
  };

  categories: any = [];
  
  constructor(private categoriesService: CategoriesService, private router: Router) {}

  ngOnInit() {
    this.categoriesService
      .fetchFeed('categories')
      .subscribe(data => {
        this.categories = data;
      })
  }

  showDetails(category) {
    console.log(category);
    this.categoriesService.currentCategory = category;
    this.router.navigate(['/events-by-category']);
  }
}
