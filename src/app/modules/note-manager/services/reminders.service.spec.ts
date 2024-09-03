import { TestBed } from '@angular/core/testing';
import { RemindersService } from './reminders.service';
import { reminderMock } from '../../../../tests/mocks/reminder';

describe('RemindersService', () => {
  let service: RemindersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemindersService],
    });

    service = TestBed.inject(RemindersService);
  });

  it('should get and set reminders', () => {
    service.reminders = [reminderMock];

    expect(service.reminders).toEqual([reminderMock]);
  });
});
