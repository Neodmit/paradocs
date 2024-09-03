import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemindersComponent } from './reminders.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { RemindersService } from '../../services/reminders.service';
import { RemindersServiceStub } from '../../../../../tests/stubs/reminders.service.stub';
import { ReminderModalComponent } from '../modals/reminder-modal/reminder-modal.component';
import { reminderMock } from '../../../../../tests/mocks/reminder';

describe('RemindersComponent', () => {
  let component: RemindersComponent;
  let fixture: ComponentFixture<RemindersComponent>;

  let remindersService: RemindersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemindersComponent],
      imports: [MatDialogModule, SharedModule],
      providers: [
        {
          provide: RemindersService,
          useClass: RemindersServiceStub,
        },
      ],
    });
    fixture = TestBed.createComponent(RemindersComponent);
    component = fixture.componentInstance;

    remindersService = TestBed.inject(RemindersService);
    fixture.detectChanges();
  });

  it('should call open for dialog window using addReminder', () => {
    spyOn(component.dialog, 'open');

    component.addReminder();

    expect(component.dialog.open).toHaveBeenCalledWith(ReminderModalComponent, {
      height: '500px',
      width: '600px',
    });
  });

  it('should call open for dialog window using editReminder', () => {
    spyOn(component.dialog, 'open');

    component.editReminder(reminderMock.id);

    expect(component.dialog.open).toHaveBeenCalledWith(ReminderModalComponent, {
      height: '500px',
      width: '600px',
      data: { reminder: reminderMock },
    });
  });

  it('should delete reminder element by id', () => {
    expect(remindersService.reminders.length).toEqual(2);

    component.deleteReminder(reminderMock.id);

    expect(remindersService.reminders.length).toEqual(1);
  });
});
