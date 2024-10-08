import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recovery-acc',
  templateUrl: './recovery-acc.component.html',
  styleUrls: ['./recovery-acc.component.css']
})
export class RecoveryAccComponent {
  @Input() showModal = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
