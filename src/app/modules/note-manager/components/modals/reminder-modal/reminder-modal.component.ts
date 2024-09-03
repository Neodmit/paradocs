import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RemindersService } from '../../../services/reminders.service';
import { Reminder } from '../../../types/reminder';
import { formatDate } from '@angular/common';
import { NotesService } from '../../../services/notes.service';
import { createUUID } from '../../../../../shared/utils/create-uuid';
import { transformDate } from '../../../utils/transform-date';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderModalComponent implements OnInit {
  reminderGroupForm: FormGroup;

  actualDate$ = new BehaviorSubject<Date>(new Date());

  constructor(
    private readonly fb: FormBuilder,
    private readonly remindersService: RemindersService,
    readonly notesService: NotesService,
    private dialogRef: MatDialogRef<ReminderModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    private matDialogData: { reminder: Reminder }
  ) {}

  ngOnInit() {
    this.reminderGroupForm = this.fb.group({
      title: [null, [Validators.required]],
      notes: [null],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
    });

    if (this.isEdit()) {
      const dateForForm = transformDate(this.matDialogData.reminder.time);

      const editReminder = {
        title: this.matDialogData.reminder.title,
        notes: this.matDialogData.reminder.notes,
        date: dateForForm,
        time: formatDate(new Date(dateForForm), 'hh:mm', 'en-GB'),
      };

      this.reminderGroupForm.patchValue(editReminder);
    }
  }

  save() {
    if (this.reminderGroupForm.invalid) {
      return;
    }

    const date = formatDate(
      this.reminderGroupForm.controls['date'].value,
      'dd/MM/YYYY',
      'en-GB'
    );

    const newReminder = {
      id: createUUID(),
      title: this.reminderGroupForm.controls['title'].value,
      notes: this.reminderGroupForm.controls['notes'].value,
      time: `${date} ${this.reminderGroupForm.controls['time'].value}`,
      isExecuted: false,
    };

    this.remindersService.reminders = this.isEdit()
      ? this.remindersService.reminders.map((reminder) =>
          reminder.id !== this.matDialogData.reminder.id
            ? reminder
            : newReminder
        )
      : [...this.remindersService.reminders, newReminder];

    this.dialogRef.close();
  }

  getMinDateTime(actualDate: Date): string {
    const dateWithoutTime = new Date(
      actualDate.getFullYear(),
      actualDate.getMonth(),
      actualDate.getDate()
    );

    if (!!this.reminderGroupForm.controls['date'].value) {
      if (
        this.reminderGroupForm.controls['date'].value.getTime() ===
        dateWithoutTime.getTime()
      ) {
        return actualDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      } else if (
        this.reminderGroupForm.controls['date'].value.getTime() <
        actualDate.getTime()
      ) {
        return '';
      }
    }

    return '00:00';
  }

  isEdit(): boolean {
    return !!this.matDialogData;
  }
}
