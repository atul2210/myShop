import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-temp-route',
  templateUrl: './temp-route.component.html',
  styleUrls: ['./temp-route.component.css']
})
export class TempRouteComponent implements OnInit {
  search:string;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.search = this.route.snapshot.params.tempsearch;
    this.router.navigateByUrl('/search/'+this.search);
  }

}
