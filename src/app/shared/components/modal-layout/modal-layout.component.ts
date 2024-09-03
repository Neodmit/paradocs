import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
})
export class ModalLayoutComponent {
  @Input() modalTitle: string;

  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();

  save() {
    this.onSave.emit();
  }
}
