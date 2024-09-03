import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoteManagerComponent } from './components/note-manager/note-manager.component';

const routes = [
  {
    path: '',
    component: NoteManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class NoteManagerRoutingModule {}
