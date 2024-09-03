import { TestBed } from '@angular/core/testing';
import { TagsService } from './tags.service';
import { NotesService } from './notes.service';
import { NotesServiceStub } from '../../../../tests/stubs/notes.service.stub';
import { tagsMock } from '../../../../tests/mocks/tags';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TagsService,
        {
          provide: NotesService,
          useClass: NotesServiceStub,
        },
      ],
    });
    service = TestBed.inject(TagsService);
  });

  it('should init subscription', () => {
    expect(!!service['subscribe']).toBeFalse();

    service.initTagConsistencySubscription();

    expect(!!service['subscribe']).toBeTrue();
  });

  it('should unsubscribe from tag consistency subscription', () => {
    service.initTagConsistencySubscription();

    spyOn(service['subscribe'], 'unsubscribe');

    service.destroySubscription();

    expect(service['subscribe'].unsubscribe).toHaveBeenCalled();
  });

  it('should get and set tags', () => {
    service.tags = tagsMock;

    expect(service.tags).toEqual(tagsMock);
  });
});
