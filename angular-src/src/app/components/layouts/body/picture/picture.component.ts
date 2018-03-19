import { BASE_IMAGE_PATH } from '../../../../constants/urls';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  @Input()
  public src: string;

  @Input()
  public width: any;

  @Input()
  public height: any;

  public path: string;

  constructor() { }

  ngOnInit() {
    this.path = BASE_IMAGE_PATH;
  }
}
