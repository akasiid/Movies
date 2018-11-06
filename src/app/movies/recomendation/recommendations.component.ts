import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RecommendationsService } from "./recommendations.service";
import { Subscription } from "rxjs";
import { Movie } from "../movies";
import { div } from "../../utils";
import { ResizeService } from "../../decorators/resize.service";

@Component({
  selector: 'recommendations',
  templateUrl: './recommendations.component.html',
  providers: [RecommendationsService, ResizeService],
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit, OnChanges, OnDestroy {
  movies: Movie[];
  private page: number;
  private totalPages: number;
  private totalResults: number;
  private visible: number;
  private position: number = 0;
  offset = 0;
  max: boolean = false;
  private resizeSubscription: Subscription;

  @Input() movieId: string;
  @Input() isSimilar: boolean;
  @Input() title: string;
  @ViewChild('slideList') slideList: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('slide') slide: ElementRef;

  constructor (
    private recommendationsService: RecommendationsService,
    private resizeService: ResizeService
  ) { }

  ngOnInit() {
    this.getRecommendations();
    this.resizeSubscription = this.resizeService.onResize$
      .subscribe(() => this.changeOffset());
  }

  ngOnChanges () {
    this.getRecommendations();
    this.offset = 0;
    this.position = 0;
  }

  getRecommendations() {
    this.recommendationsService.setUrl(this.movieId, this.isSimilar);
    this.recommendationsService.getRecommendations()
      .subscribe(page => {
        this.movies = page.results;
        this.totalPages = page.total_pages;
        this.totalResults = page.total_results;
        this.page = page.page;
      })
  }

  next() {
    this.page++;
    this.recommendationsService.next(this.movies, this.page)
      .subscribe(movies => this.movies = movies);
  }

  directionHandler(event) {
    if (!this.visible && this.visible != div(this.container.nativeElement.offsetWidth, this.slide.nativeElement.offsetWidth)) {
      this.visible = div(this.container.nativeElement.offsetWidth, this.slide.nativeElement.offsetWidth);
    }

    if (event.target.className.indexOf('_right') > -1 && !this.max) {
      this.position++;

      if ((this.position + this.visible) % 20 == 0 && this.position + this.visible < this.totalResults) {
        this.next();
      }
    }

    if (event.target.className.indexOf('_left') > -1  && this.offset < 0) {
      this.position--;
    }

    this.offset =  -(this.slide.nativeElement.offsetWidth * this.position);
    this.slideList.nativeElement.style.left = `${this.offset}px`;

    this.max = this.position + this.visible === this.totalResults;
  }

  changeOffset() {
    if (this.position > 0) {
      this.offset =  -(this.slide.nativeElement.offsetWidth * this.position);
      this.slideList.nativeElement.style.left = `${this.offset}px`;
    }
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
