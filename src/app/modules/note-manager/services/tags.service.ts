import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { Tag } from '../types/tag';
import { tagsMock } from '../../../../tests/mocks/tags';
import { NotesService } from './notes.service';

@Injectable()
export class TagsService {
  tags$: BehaviorSubject<Tag[]> = new BehaviorSubject(tagsMock);

  constructor(private notesService: NotesService) {}

  private subscribe: Subscription;

  initTagConsistencySubscription() {
    this.subscribe = this.tags$
      .pipe(
        tap((tags) => {
          const tagIds = tags.map((tag) => tag.id);

          this.notesService.notes = this.notesService.notes.map((note) => {
            note.tags = note.tags?.filter((tag) => tagIds.includes(tag.id));

            return note;
          });
        })
      )
      .subscribe();
  }

  destroySubscription() {
    this.subscribe.unsubscribe();
  }

  get tags(): Tag[] {
    return this.tags$.getValue();
  }

  set tags(value: Tag[]) {
    this.tags$.next(value);
  }
}
