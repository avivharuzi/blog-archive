import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.css']
})
export class CategoriesTableComponent implements OnInit {
  public modalRef: BsModalRef;
  public selectedCategory: any;

  @Input()
  public categories: any[];

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.selectedCategory = null;
  }

  openModal(template: TemplateRef<any>, category) {
    this.selectedCategory = category;
    this.modalRef = this.modalService.show(
      template
    );
  }
}
