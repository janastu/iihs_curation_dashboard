import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe';
import { CapitalizePipe } from './pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [FilterPipe,CapitalizePipe],
    exports:[FilterPipe,CapitalizePipe]
})
export class SharedPipesModule { }
