import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
import {LeaveService} from '../services/leave.service';
import {LoadingService} from '../services/loading.service';

@Component({
  selector: 'app-myleaves',
  templateUrl: './myleaves.page.html',
  styleUrls: ['./myleaves.page.scss'],
})
export class MyleavesPage implements OnInit {
  tabList = 'approved';
  public leaves: any;
  public approved = [];
  public pending = [];
  public decline = [];
  suggested: any = [];
  
  constructor(public router: Router,
              private leaveService: LeaveService,
              private loadingService: LoadingService,
              public toastController: ToastController,
              private actRoute: ActivatedRoute,
              ) {
                let tabsName = this.actRoute.snapshot.paramMap.get("tab");
                if(tabsName == 'suggested' && tabsName != null){
                    this.tabList = 'suggested';
                }
  }

  async ngOnInit() {
    await this.leaveDataList();
  }

  async refresh(e) {
    this.suggested = [];
    this.pending = [];
    this.decline = [];
    this.approved = [];
    await this.leaveDataList();
    e.target.complete();
  }
  async leaveDataList(){
    const token = localStorage.getItem('access');
    await this.loadingService.startLoading();
    this.leaveService.getLeave().subscribe(data => {
      this.loadingService.stopLoading();
      this.leaves = data;
      this.leaves.forEach(leave => {
        if(leave.leave_status === "Suggested"){
          this.suggested.push(leave);
        }
        if (leave.leave_status === 'Approved') {
          this.approved.push(leave);
        }
        if (leave.leave_status === 'Pending') {
          this.pending.push(leave);
        }
        if (leave.leave_status === 'Decline') {
          this.decline.push(leave);
        }
      });
    }, error => this.loadingService.stopLoading());
  }
  async acceptButton(id: any){
    await this.loadingService.startLoading();
    this.leaveService.acceptSuggestedLeave(id).subscribe(async res => {
      await this.leaveDataList();
      const toast = await this.toastController.create({
        message: 'You have Accepted',
        position: 'top',
        duration: 3000
      });
      await toast.present();
      this.loadingService.stopLoading();
    },async err => {
      this.loadingService.stopLoading();
    });
  }

  async declineButton(id: any){
    await this.loadingService.startLoading();
    this.leaveService.declineSuggestedLeave(id).subscribe(async res => {
      await this.leaveDataList();
      const toast = await this.toastController.create({
        message: 'You have Declined',
        position: 'top',
        duration: 3000
      });
      await toast.present();
      this.loadingService.stopLoading();
    },async err => {
      this.loadingService.stopLoading();
    });
  }

}

