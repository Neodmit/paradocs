import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReminderModalComponent } from './reminder-modal.component';
import { SharedModule } from '../../../../../shared/shared.module';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesService } from '../../../services/notes.service';
import { NotesServiceStub } from '../../../../../../tests/stubs/notes.service.stub';
import { RemindersService } from '../../../services/reminders.service';
import { RemindersServiceStub } from '../../../../../../tests/stubs/reminders.service.stub';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { reminderMock } from '../../../../../../tests/mocks/reminder';
import { MatSelectModule } from '@angular/material/select';
import { Reminder } from '../../../types/reminder';

describe('AddReminderModalComponent', () => {
  let component: ReminderModalComponent;
  let fixture: ComponentFixture<ReminderModalComponent>;

  let dialogRef: MatDialogRef<unknown>;
  let remindersService: RemindersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderModalComponent],
      imports: [
        SharedModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMatTimepickerModule,
        MatSelectModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: NotesService,
          useClass: NotesServiceStub,
        },
        {
          provide: RemindersService,
          useClass: RemindersServiceStub,
        },
      ],
    });
    fixture = TestBed.createComponent(ReminderModalComponent);
    component = fixture.componentInstance;

    dialogRef = TestBed.inject(MatDialogRef);
    remindersService = TestBed.inject(RemindersService);

    component['matDialogData'].reminder = reminderMock;

    fixture.detectChanges();
  });

  describe('getMinDateTime', () => {
    it('should return actual time by same date', () => {
      const actualDate = new Date();

      const dateWithoutTime = new Date(
        actualDate.getFullYear(),
        actualDate.getMonth(),
        actualDate.getDate()
      );

      component.reminderGroupForm.controls['date'].setValue(dateWithoutTime);
      const actualTime = component.getMinDateTime(dateWithoutTime);

      expect(actualTime).toEqual('12:00 AM');
    });

    it('should return default time', () => {
      component.reminderGroupForm.controls['date'].setValue('');
      const actualTime = component.getMinDateTime(new Date());

      expect(actualTime).toEqual('00:00');
    });
  });

  describe('save', () => {
    it('should edit reminder in reminders service', () => {
      component.reminderGroupForm.controls['title'].setValue('test');
      component.reminderGroupForm.controls['date'].setValue(new Date());
      component.reminderGroupForm.controls['time'].setValue('12:00');
      component['matDialogData'].reminder = reminderMock;

      component.save();

      expect(remindersService.reminders[0].title).toEqual('test');
    });

    it('should add new reminder in reminders service', () => {
      component.reminderGroupForm.controls['title'].setValue('test');
      component.reminderGroupForm.controls['date'].setValue(new Date());
      component.reminderGroupForm.controls['time'].setValue('12:00');
      (component['matDialogData'] as { reminder: Reminder } | null) = null;

      component.save();

      expect(remindersService.reminders[2].title).toEqual('test');
    });

    it('should return if form invalid', () => {
      component.save();

      spyOn(dialogRef, 'close');

      expect(dialogRef.close).not.toHaveBeenCalled();
    });
  });
});
