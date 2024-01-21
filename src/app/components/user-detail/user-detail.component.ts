import { Component, Inject, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import IDisplayUserDetail from '@/app/domain/ports/i-display-user-detail';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  @Input() id = '';

  constructor(
    @Inject('IDisplayUserDetail')
    public userDetailDisplayer: IDisplayUserDetail,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userDetailDisplayer.askUserDetail(this.id as any).subscribe();
  }

  changeName(newName: string): void {
    this.userDetailDisplayer
      .askUserNameChange(newName)
      .pipe(finalize(() => this.goBack()))
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }
}
