import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export enum AppRoutes {
  NoteManager = 'note-manager',
}

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.NoteManager,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.NoteManager,
    loadChildren: () =>
      import('./modules/note-manager/note-manager.module').then(
        (module) => module.NoteManagerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
