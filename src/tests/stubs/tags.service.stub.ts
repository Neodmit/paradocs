import { BehaviorSubject } from 'rxjs';
import { Tag } from '../../app/modules/note-manager/types/tag';
import { tagsMock } from '../mocks/tags';

const createSpy = jasmine.createSpy;

export class TagsServiceStub {
  tags$: BehaviorSubject<Tag[]> = new BehaviorSubject(tagsMock);

  initTagConsistencySubscription = createSpy();
  destroySubscription = createSpy();

  get tags(): Tag[] {
    return this.tags$.getValue();
  }

  set tags(value: Tag[]) {
    this.tags$.next(value);
  }
}
