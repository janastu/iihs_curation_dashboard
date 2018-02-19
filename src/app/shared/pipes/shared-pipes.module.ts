import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [FilterPipe],
    exports:[FilterPipe]
})
export class SharedPipesModule { }
