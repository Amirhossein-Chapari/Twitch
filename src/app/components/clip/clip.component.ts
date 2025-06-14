import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clip',
  imports: [],
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.scss'
})
export class ClipComponent implements OnInit {
  id = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"]
    })
  }
}
