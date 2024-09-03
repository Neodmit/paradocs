import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagsComponent } from './tags.component';
import { TagsService } from '../../services/tags.service';
import { TagsServiceStub } from '../../../../../tests/stubs/tags.service.stub';
import { NotesService } from '../../services/notes.service';
import { NotesServiceStub } from '../../../../../tests/stubs/notes.service.stub';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { TagModalComponent } from '../modals/tag-modal/tag-modal.component';
import { tagsMock } from '../../../../../tests/mocks/tags';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  let tagsService: TagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagsComponent],
      imports: [MatDialogModule, SharedModule],
      providers: [
        { provide: TagsService, useClass: TagsServiceStub },
        {
          provide: NotesService,
          useClass: NotesServiceStub,
        },
      ],
    });
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;

    tagsService = TestBed.inject(TagsService);

    fixture.detectChanges();
  });

  it('should call open for dialog window using addTag', () => {
    spyOn(component.dialog, 'open');

    component.addTag();

    expect(component.dialog.open).toHaveBeenCalledWith(TagModalComponent, {
      height: '400px',
      width: '600px',
    });
  });

  it('should call open for dialog window using editTag', () => {
    spyOn(component.dialog, 'open');

    component.editTag(tagsMock[0].id);

    expect(component.dialog.open).toHaveBeenCalledWith(TagModalComponent, {
      height: '400px',
      width: '600px',
      data: { tag: tagsMock[0] },
    });
  });

  it('should delete tag element by id', () => {
    expect(tagsService.tags.length).toEqual(4);

    component.deleteTag(tagsMock[0].id);

    expect(tagsService.tags.length).toEqual(3);
  });
});
