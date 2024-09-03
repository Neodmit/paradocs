import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TagsService } from '../../services/tags.service';
import { tagsTableFields } from '../../constants/tags-table-fields';
import { TagModalComponent } from '../modals/tag-modal/tag-modal.component';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  readonly dialog = inject(MatDialog);

  dataSource$ = this.tagsService.tags$.pipe(
    map((data) => new MatTableDataSource(data))
  );

  protected readonly tagsTableFields = tagsTableFields;

  constructor(
    readonly tagsService: TagsService,
    private notesService: NotesService
  ) {}

  addTag() {
    this.dialog.open(TagModalComponent, {
      height: '400px',
      width: '600px',
    });
  }

  editTag(editTagId: string) {
    this.dialog.open(TagModalComponent, {
      height: '400px',
      width: '600px',
      data: {
        tag: this.tagsService.tags.find((tag) => tag.id === editTagId),
      },
    });
  }

  deleteTag(deleteTagId: string) {
    this.tagsService.tags = this.tagsService.tags.filter(
      (tag) => tag.id !== deleteTagId
    );
  }
}
