import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../slide-in-out.animation';

@Component({
  selector: 'app-on-feed',
  templateUrl: './on-feed.component.html',
  styleUrls: ['./on-feed.component.scss'],
  animations: [slideInOutAnimation]
})
export class OnFeedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
