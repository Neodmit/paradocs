import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { RemindersService } from '../../services/reminders.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderModalComponent } from '../modals/reminder-modal/reminder-modal.component';
import { remindersTableFields } from '../../constants/reminders-table-fields';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindersComponent {
  readonly dialog = inject(MatDialog);

  dataSource$ = this.remindersService.reminders$.pipe(
    map((data) => new MatTableDataSource(data))
  );

  protected readonly remindersTableFields = remindersTableFields;

  constructor(private readonly remindersService: RemindersService) {}

  addReminder() {
    this.dialog.open(ReminderModalComponent, {
      height: '500px',
      width: '600px',
    });
  }

  editReminder(editReminderId: string) {
    this.dialog.open(ReminderModalComponent, {
      height: '500px',
      width: '600px',
      data: {
        reminder: this.remindersService.reminders.find(
          (reminder) => reminder.id === editReminderId
        ),
      },
    });
  }

  deleteReminder(deletedReminderId: string) {
    this.remindersService.reminders = this.remindersService.reminders.filter(
      (reminder) => reminder.id !== deletedReminderId
    );
  }
}
