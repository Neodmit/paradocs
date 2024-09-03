import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag } from '../../../types/tag';
import { TagsService } from '../../../services/tags.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { createUUID } from '../../../../../shared/utils/create-uuid';

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagModalComponent implements OnInit {
  tagGroupForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private dialogRef: MatDialogRef<TagModalComponent>,
    readonly tagsService: TagsService,
    @Inject(MAT_DIALOG_DATA)
    private matDialogData: { tag: Tag }
  ) {}

  ngOnInit() {
    this.tagGroupForm = this.fb.group({
      title: [null, [Validators.required]],
    });

    if (this.matDialogData) {
      this.tagGroupForm.patchValue(this.matDialogData.tag);
    }
  }

  save() {
    if (this.tagGroupForm.invalid) {
      return;
    }

    const newTag = {
      id: createUUID(),
      title: this.tagGroupForm.controls['title'].value,
    };

    this.tagsService.tags = this.matDialogData
      ? this.tagsService.tags.map((tag) =>
          tag.id !== this.matDialogData.tag.id ? tag : newTag
        )
      : [...this.tagsService.tags, newTag];

    this.dialogRef.close();
  }
}
