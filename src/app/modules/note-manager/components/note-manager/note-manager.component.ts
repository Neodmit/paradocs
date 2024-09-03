import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { interval, Subscription, switchMap, tap } from 'rxjs';
import { RemindersService } from '../../services/reminders.service';
import { transformDate } from '../../utils/transform-date';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagsService } from '../../services/tags.service';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note-manager',
  templateUrl: './note-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteManagerComponent implements OnInit, OnDestroy {
  private snackBar = inject(MatSnackBar);

  constructor(
    private readonly notesService: NotesService,
    private readonly remindersService: RemindersService,
    private readonly tagsService: TagsService
  ) {}

  private subscription: Subscription;

  ngOnInit(): void {
    this.initReminderSubscription();

    this.tagsService.initTagConsistencySubscription();
    this.notesService.initNoteConsistencySubscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    this.tagsService.destroySubscription();
    this.notesService.destroySubscription();
  }

  private initReminderSubscription() {
    this.subscription = this.remindersService.reminders$
      .pipe(
        switchMap((reminders) =>
          interval(1000).pipe(
            tap(() => {
              const now = new Date();

              reminders.forEach((reminder) => {
                if (
                  now >= transformDate(reminder.time) &&
                  !reminder.isExecuted
                ) {
                  this.snackBar.open(reminder.title, 'Готово', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                  });

                  reminder.isExecuted = true;
                }
              });
            })
          )
        )
      )
      .subscribe();
  }
}
