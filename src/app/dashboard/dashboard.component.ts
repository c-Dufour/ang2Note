import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[];

  constructor(private UserService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void{
    this.UserService.getUsers().subscribe(users => this.users = users);
  }

}
