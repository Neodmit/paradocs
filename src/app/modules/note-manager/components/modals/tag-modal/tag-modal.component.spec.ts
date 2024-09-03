import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagModalComponent } from './tag-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TagsService } from '../../../services/tags.service';
import { TagsServiceStub } from '../../../../../../tests/stubs/tags.service.stub';
import { SharedModule } from '../../../../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { tagsMock } from '../../../../../../tests/mocks/tags';
import { Tag } from '../../../types/tag';

describe('TagModalComponent', () => {
  let component: TagModalComponent;
  let fixture: ComponentFixture<TagModalComponent>;

  let dialogRef: MatDialogRef<unknown>;
  let tagService: TagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagModalComponent],
      imports: [
        SharedModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: TagsService, useClass: TagsServiceStub },
      ],
    });
    fixture = TestBed.createComponent(TagModalComponent);
    component = fixture.componentInstance;

    dialogRef = TestBed.inject(MatDialogRef);
    tagService = TestBed.inject(TagsService);

    fixture.detectChanges();
  });

  describe('save', () => {
    it('should edit tag in tags service', () => {
      component.tagGroupForm.controls['title'].setValue('test');
      component['matDialogData'].tag = tagsMock[0];

      component.save();

      expect(tagService.tags[0].title).toEqual('test');
    });

    it('should add new tag in tags service', () => {
      component.tagGroupForm.controls['title'].setValue('test');
      (component['matDialogData'] as { tag: Tag } | null) = null;

      component.save();

      expect(tagService.tags[4].title).toEqual('test');
    });

    it('should return if form invalid', () => {
      component.save();

      spyOn(dialogRef, 'close');

      expect(dialogRef.close).not.toHaveBeenCalled();
    });
  });
});
