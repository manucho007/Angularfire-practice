import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { BoardListComponent } from './board-list/board-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BoardComponent } from './board/board.component';
import { FormsModule } from '@angular/forms';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaskDialogComponent } from './dialogs/task-dialog.component';

@NgModule({
  declarations: [
    BoardListComponent,
    BoardComponent,
    BoardDialogComponent,
    TaskDialogComponent,
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
    RouterModule,
  ],
  entryComponents: [BoardDialogComponent],
})
export class KanbanModule {}
