import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Input() editMode: boolean;


  constructor(private userService: UserService, private route: ActivatedRoute, private location:Location) { }

  ngOnInit(): void{
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user)
  }
  rename(): void{
    this.editMode = true;
  };
  goBack(): void {
    this.location.back();
  }
  save(): void{
    this.userService.updateUser(this.user)
    .subscribe(() => this.goBack());;
  }

}
