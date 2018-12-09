import { Component, OnInit } from '@angular/core';
import {ShoppingApiService} from '../../service/shopping-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  
  constructor(private router:Router,private ShoppingApiService:ShoppingApiService) { }

  ngOnInit() {
  }

public getSearchResult(itemName:string)
  {

    alert(itemName);
    this.router.navigateByUrl('/search/'+itemName);
  }
}
