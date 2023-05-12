import {Component, OnInit} from '@angular/core';
import {TripService} from '../services/trip.service';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.page.html',
  styleUrls: ['./logbook.page.scss'],
})
export class LogbookPage implements OnInit {
  public trips: any;

  constructor(private tripService: TripService,
              private loadingService: LoadingService) {
  }

  async ngOnInit() {
    await this.loadingService.startLoading();
    this.tripService.getTrips().subscribe(data => {
      this.loadingService.stopLoading();
      this.trips = data;
    }, error => this.loadingService.stopLoading());
  }
}
