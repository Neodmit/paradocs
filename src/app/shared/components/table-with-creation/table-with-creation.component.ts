import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BaseRowItem, TableFields } from '../../types/table';

@Component({
  selector: 'app-table-with-creation',
  templateUrl: './table-with-creation.component.html',
  styleUrls: ['./table-with-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWithCreationComponent implements OnInit {
  @Input() tableFields: TableFields;
  @Input() dataSource: BaseRowItem;
  @Input() addButtonTitle: string;

  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>();
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();

  displayedColumns: string[];

  ngOnInit(): void {
    this.displayedColumns = [...this.getTableHeaderKeys(), 'edit', 'delete'];
  }

  delete(id: string): void {
    this.onDelete.emit(id);
  }

  edit(id: string): void {
    this.onEdit.emit(id);
  }

  add(): void {
    this.onAdd.emit();
  }

  getRowItem(element: BaseRowItem, headerKey: string) {
    const objKey = this.tableFields[headerKey].key;

    if (this.tableFields[headerKey].isCellMultipleMode) {
      return objKey ? element[objKey] : element;
    } else {
      return objKey ? element[headerKey][objKey] : element[headerKey];
    }
  }

  getTableHeaderKeys(): string[] {
    return Object.keys(this.tableFields);
  }
}
